import React, { useState, useEffect } from "react";
import _ from "lodash";
import Heap from "heap-js";
import Node from "./node";
import { ButtonGroup, Button, Grid } from "semantic-ui-react";

import MenuToggle from "./menuToggle";

const STARTCOLOR = "#2F9599";
const ENDCOLOR = "#A7226E";
const WALLCOLOR = "#EC2049";
const VISTEDCOLOR = "#d0e1f9";
const CURRENTVISCOLOR = "#4d648d";
const PATHCOLOR = "#F7DB4F";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const PathFinding = (props) => {
  const [cleaner, setCleaner] = useState([]);
  const [multisearchPoints, setmultisearchPoints] = useState([]);
  const [graphi, setGraphi] = useState(new Map());
  const [phase, setPhase] = useState(0);
  const [selectphase, setselectPhase] = useState(0);

  const [startPoint, setstartPoint] = useState("");
  const [endPoint, setendPoint] = useState("");
  const [searchOn, setsearchOn] = useState(false);
  var ssSearch = [1];
  const [numberOfPoint, setNumberofPoint] = useState(1);
  const NUMROWS = 40;
  const NUMCOLUMNS = 60;
  const setNumberOfPoints = (number) => {
    if (number < numberOfPoint) {
      let m = multisearchPoints.pop();
      graphi.get(m).istopPoint = false;
      graphi.get(m).isSelected = false;
      setselectPhase(selectphase - 1);
    }
    setNumberofPoint(number);
  };
  const djimultiSearchPoints = async () => {
    if (cleaner.length >= 1) cleanpath();
    let m = [...multisearchPoints];
    setsearchOn(true);
    m.unshift(startPoint);
    m.push(endPoint);
    for (var i = 0; i < m.length; i++) {
      await startDj(graphi, m[i], m[i + 1]);
    }
  };

  const cleanpath = () => {
    for (var i = 0; i < cleaner.length; i++) {
      graphi.get(cleaner[i]).isSelected = false;
      sleep(1);
    }
    setCleaner([...[]]);
    setGraphi(graphi);
  };
  const handleOncLick = (index) => {
    if (graphi.get(index).isSelected) {
      let m = graphi.get(index);
      if (graphi.get(index).isWall) {
        deleteWall(index);
        return;
      } else if (m.firstNode) {
        m.firstNode = false;
        m.isSelected = false;
        setstartPoint("");
      } else if (m.endNode) {
        m.endNode = false;
        m.isSelected = false;

        setendPoint("");
      }

      return;
    }
    if (startPoint == "") {
      graphi.get(index).firstNode = true;
      setstartPoint(index);

      setselectPhase(selectphase + 1);
    } else if (endPoint == "") {
      graphi.get(index).endNode = true;
      setendPoint(index);
      setselectPhase(selectphase + 1);
    } else if (
      parseInt(numberOfPoint) > 1 &&
      selectphase < parseInt(numberOfPoint) + 2
    ) {
      console.log(selectphase, numberOfPoint);
      graphi.get(index).istopPoint = true;
      setmultisearchPoints([...multisearchPoints, index]);
      setselectPhase(selectphase + 1);
    } else {
      createWall(index);
    }
    graphi.get(index).isSelected = true;
  };
  const deleteWall = (ind) => {
    graphi.get(ind).isWall = false;
    graphi.get(ind).isSelected = false;
    let m = graphi.get(ind).jirani;

    m.map((i) => {
      let x = graphi.get(i).jirani.push(ind);

      graphi.get(i).adj[ind] = 1;
    });
    setPhase(phase - 1);
  };

  const createWall = (ind) => {
    if (graphi.get(ind).isSelected) return;
    graphi.get(ind).isWall = true;
    graphi.get(ind).isSelected = true;

    let m = graphi.get(ind).jirani;

    m.map((i) => {
      let x = graphi.get(i).jirani.indexOf(ind);
      graphi.get(i).jirani.splice(x, 1);
      delete graphi.get(i).adj[ind];
    });
    setPhase(phase + 1);
  };
  const cleanBord = () => {
    if (cleaner.length >= 1) cleanpath();
    setsearchOn(false);
    setPhase(0);
    setselectPhase(0);
    setstartPoint("");
    setendPoint("");
    setNumberofPoint(1);
    setmultisearchPoints([...[]]);
    graphi.forEach((val, key) => {
      let m = val;
      if (m.isWall) {
        deleteWall(key);
        return;
      }
      m.firstNode = false;
      m.endNode = false;
      m.isWall = false;
      m.isSelected = false;
      m.istopPoint = false;
    });
  };
  const dj = async (graph, ss, endd) => {
    if (!ss || !endd || !graph) return;
    const comp = (a, b) => {
      return a.distance - b.distance;
    };
    const prioq = new Heap(comp);
    prioq.init([]);
    let notfound = true;
    let current = new Node(ss, null, 0);
    prioq.push(current);

    let nodesinque = new Map();
    let theway = [];
    nodesinque.set(ss, 0);

    //
    let currentNode;
    while (notfound) {
      currentNode = prioq.pop();
      if (!currentNode) {
        return [];
      }
      theway.push(currentNode);
      nodesinque.delete(currentNode.name);
      if (currentNode.name == endd) break;
      let adj = graph.get(currentNode.name).adj;
      for (const [key, val] of Object.entries(adj)) {
        let m = new Node(key, currentNode.name, val + currentNode.distance);
        if (
          theway.findIndex((vall) => {
            return vall.name == key;
          }) != -1
        )
          continue;
        if (nodesinque.has(key)) {
          if (nodesinque.get(key) > val + currentNode.distance) {
            theway = [
              ...theway.filter((heapnodes) => heapnodes.name != m.name),
            ];
            prioq.init([
              ...prioq.heapArray.filter(
                (heapnodes) => heapnodes.name != m.name
              ),
            ]);
          }
        }

        prioq.push(m);
        if (!graph.get(m.name).isSelected && cleaner.indexOf(m.name) == -1) {
          graph.get(m.name).ref.style.backgroundColor = CURRENTVISCOLOR;
          graph.get(m.name).ref.style.border = "1px outset #283655";

          setTimeout(() => {
            graph.get(m.name).ref.style.backgroundColor = VISTEDCOLOR;
            graph.get(m.name).ref.style.border = "1px outset ivory";
          }, 200);
          await sleep(1);
        }

        nodesinque.set(m.name, m.distance);
        theway.push(m);
      }
    }

    let shortestpath = [];
    findparent(theway, currentNode, shortestpath);
    return shortestpath;
  };
  const startDj = async (graph, starpt, endpoint) => {
    let m = await dj(graph, starpt, endpoint);
    if (!m) return;
    let randomColorVariation = Math.random() * (50 - 355) + 50;
    for (var i = m.length - 2; i >= 0; i--) {
      let randomColor = `hsl(${randomColorVariation + i * 3}, 95%, 64%)`;

      graphi.get(m[i]).ref.style.backgroundColor = randomColor;
      graphi.get(m[i]).ref.style.boxShadow = "1px 0px 10px 0px black";
      cleaner.push(m[i]);

      await sleep(5);
    }
  };
  const findparent = (theway, nodei, root) => {
    if (nodei.parent == null) return;
    else {
      let m = nodei.parent;
      root.push(m);
      let x = theway.findIndex((val) => {
        return val.name === m;
      });
      findparent(theway, theway[x], root);
    }
  };

  const generateRandomWalls = () => {

    if (ssSearch[0]=0) return;
    if (cleaner.length >= 1) cleanpath();
    let leng = Math.floor(
      Math.random() * (NUMCOLUMNS - NUMROWS / 2) + NUMROWS / 4
    );
    for (var i = 0; i < leng; i++) {
      let raw = Math.floor(Math.floor(Math.random() * NUMROWS));
      let column = Math.floor(Math.floor(Math.random() * NUMCOLUMNS));
      let cor = raw + "+" + column;
      if (!graphi.get(cor).isSelected) createWall(cor);
    }
    setsearchOn(false);
    ssSearch=false
  };
  const handleDjiClick = async () => {
    setsearchOn(true);
    ssSearch[0]=0;
    console.log(ssSearch)
    if (cleaner.length >= 1) cleanpath();
    if (numberOfPoint == 1) {
      await startDj(graphi, startPoint, endPoint);

    } else await djimultiSearchPoints();
    ssSearch[0]=1
  };
  return (
    <div>
      <Grid>
        <Grid.Row>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button disabled={searchOn} onClick={() => {}}>
              {" "}
              bfs
            </Button>
            <Button disabled={searchOn} onClick={handleDjiClick}>
              {" "}
              djikstra
            </Button>
          </ButtonGroup>
        </Grid.Row>
        <Grid.Row>
          <ButtonGroup
            ButtonGroup
            variant="contained"
            color="green"
            aria-label="contained primary button group"
          >
            <Button
              disabled={searchOn}
              onClick={() => {
                if (cleaner.length >= 1) cleanpath();
                startDj();
              }}
            >
              Add traffic points
            </Button>
            <MenuToggle
              searchOn={searchOn}
              numberSearch={numberOfPoint}
              setNumberOfPoints={setNumberOfPoints}
            ></MenuToggle>

            <Button onClick={cleanBord}> Clean Bord</Button>

            <Button onClick={generateRandomWalls}>generate Random Walls</Button>
          </ButtonGroup>
        </Grid.Row>
      </Grid>
      <div className="containermap">
        <Grid relaxed="very" textAlign="center">
          <Grid.Row>
            {_.times(NUMCOLUMNS, (j) => {
              return (
                <Grid.Row
                  style={{
                    margin: "1px",
                  }}
                  key={j + "row"}
                >
                  {_.times(NUMROWS, (i) => {
                    if (!graphi.has(`${i}+${j}`)) {
                      let mapprop = {
                        firstNode: false,
                        endNode: false,
                        isWall: false,
                        isSelected: false,
                        istopPoint: false,
                        jirani: [],
                        adj: {},
                        ref: null,
                      };
                      const indexx = `${i}+${j}`;
                      let adjweghit = {};
                      graphi.set(indexx, mapprop);
                      if (j - 1 >= 0) {
                        graphi.get(indexx).jirani.push(`${i}+${j - 1}`);
                        adjweghit[`${i}+${j - 1}`] = 1;
                      }
                      if (i + 1 < NUMROWS) {
                        graphi.get(indexx).jirani.push(`${i + 1}+${j}`);
                        adjweghit[`${i + 1}+${j}`] = 1;
                      }

                      if (j + 1 < NUMCOLUMNS) {
                        graphi.get(indexx).jirani.push(`${i}+${j + 1}`);
                        adjweghit[`${i}+${j + 1}`] = 1;
                      }
                      if (i - 1 >= 0) {
                        graphi.get(indexx).jirani.push(`${i - 1}+${j}`);
                        adjweghit[`${i - 1}+${j}`] = 1;
                      }
                      graphi.get(indexx).adj = adjweghit;
                    }
                    const indexxx = `${i}+${j}`;

                    return (
                      <Grid.Column
                        stretched
                        width={1}
                        key={j + Math.random() * 3}
                      >
                        <div
                          className={`
                          ${
                            graphi.get(indexxx).istopPoint ? " stop-node " : " "
                          }
                          ${graphi.get(indexxx).isSelected ? "selected " : " "}
                          ${
                            graphi.get(indexxx).firstNode ? "first-node " : " "
                          }${graphi.get(indexxx).endNode ? "end-node " : " "}${
                            graphi.get(indexxx).isWall ? "wall-node " : " "
                          }
                          grid-container-div`}
                          ref={(ref) => (graphi.get(indexxx).ref = ref)}
                          onClick={() => handleOncLick(indexxx)}
                        >
                          {graphi.get(indexxx).istopPoint
                            ? multisearchPoints.indexOf(indexxx) + 1
                            : ""}
                          {graphi.get(indexxx).firstNode ? (
                            <i
                              aria-hidden="true"
                              className="blue male icon"
                            ></i>
                          ) : (
                            ""
                          )}
                          {graphi.get(indexxx).endNode ? (
                            <i
                              aria-hidden="true"
                              className=" dot circle outline icon"
                            ></i>
                          ) : (
                            ""
                          )}
                        </div>
                      </Grid.Column>
                    );
                  })}
                </Grid.Row>
              );
            })}
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
};

export default PathFinding;
