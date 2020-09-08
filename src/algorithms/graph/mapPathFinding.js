import React, { useState, useEffect } from "react";
import MapNode from "./mapNode";
import { Grid, Button, DropdownSearchInput, Input } from "semantic-ui-react";
import _ from "lodash";
import { dfs, bfs, dj, Astar } from "./alghorithms";
import './grid.css'
import GraphModal from "./graphModel";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const MapPathFinding = (props) => {
  const [openModel  , setopenModel]= useState(true)
  const [finishedFindinf, setfinishedFindinf] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [NUMROWS, setNUMROWS] = useState(25);
  const [NUMCOLUMNS, setNUMCOLUMNS] = useState(40);
  const [refresh, setrefresh] = useState(0);
  const [valueSlider, setvalueslider] = useState(2);

  const [gridGenerated, setgridGenerated] = useState(false);
  const [startPoint, setstartPoint] = useState("");
  const [endPoint, setendPoint] = useState("");
  const [hold, sethold] = useState("");
  const [gridGraph, setGridGraph] = useState(new Map());
  const [mouseDownEffect, setmouseDownEffect] = useState(false);
  const [lackOfWater, setlackOfWater] = useState(false);
  const [generateLack, setGenerateLack] = useState(false);
  const [pickPoints, setPickPoinst] = useState([]);
  const [choosePickPoint, setChoosePickPoint] = useState(false);
  const [pathnodes, setpathNodes] = useState([]);
  const AddPickPoint = () => {
    setChoosePickPoint(true);
  };
  const createLack = (index) => {
    let m = index.split("+");
    let rowj = parseInt(m[0]);
    let columni = parseInt(m[1]);
    let lackNode = new MapNode(
      rowj,
      columni,
      NUMCOLUMNS,
      NUMROWS,
      false,
      false,
      false,
      false,
      true
    );
    gridGraph.set(index, lackNode);
    setGridGraph(gridGraph);
    setrefresh(refresh + 1);
  };
  const handleMouseDown = (index) => {
    if (choosePickPoint) {
      if (!gridGraph.get(index).isPickPoint) {
        gridGraph.get(index).isPickPoint = true;
        setGridGraph(gridGraph);
        setPickPoinst([...pickPoints, index]);
        setChoosePickPoint(false);
      }
    } else {
      if (lackOfWater) {
        setGenerateLack(true);
        createLack(index);
      } else {
        setmouseDownEffect(true);
        if (gridGraph.get(index).firstNode) {
          setstartPoint("");
          gridGraph.get(index).firstNode = false;

          sethold(index);
        } else if (gridGraph.get(index).endNode) {
          setendPoint("");
          sethold(index);

          gridGraph.get(index).endNode = false;
        } else {
          if (gridGraph.get(index).endNode == false) {
            if (
              gridGraph.get(index).firstNode == false &&
              !gridGraph.get(index).isPickPoint
            )
              gridGraph.get(index).isWall = true;
          }
        }
      }
      setGridGraph(gridGraph);
    }
  };

  const handleMouseEnter = (index) => {
    if (lackOfWater) {
      if (generateLack) createLack(index);
    } else {
      if (mouseDownEffect) {
        if (startPoint == "") return;
        else if (endPoint == "") return;
        else {
          if (gridGraph.get(index).endNode == false) {
            if (
              gridGraph.get(index).firstNode == false &&
              !gridGraph.get(index).isPickPoint
            )
              gridGraph.get(index).isWall = true;
          }
        }
        setGridGraph(gridGraph);
        setrefresh(refresh + 1);
      }
    }
  };
  const handleMouseUp = (index) => {
    if (lackOfWater) {
      if (generateLack) createLack(index);
      setGenerateLack(false);
      setlackOfWater(false);
    } else {
      if (mouseDownEffect) {
        if (startPoint == "") {
          if (gridGraph.get(index).isWall) {
            gridGraph.get(index).isWall = false;

            setstartPoint(index);
            gridGraph.get(index).firstNode = true;
          } else if (gridGraph.get(index).endNode) {
            gridGraph.get(hold).firstNode = true;
            setstartPoint(hold);
          } else {
            gridGraph.get(index).firstNode = true;
            setstartPoint(index);
          }
        } else if (endPoint == "") {
          if (gridGraph.get(index).isWall) {
            gridGraph.get(index).isWall = false;

            setendPoint(index);
            gridGraph.get(index).endNode = true;
          } else if (gridGraph.get(index).firstNode) {
            gridGraph.get(hold).endNode = true;
            setendPoint(hold);
          } else {
            gridGraph.get(index).endNode = true;
            setendPoint(index);
          }
        } else {
          if (gridGraph.get(index).endNode == false) {
            if (
              gridGraph.get(index).firstNode == false &&
              !gridGraph.get(index).isPickPoint
            )
              gridGraph.get(index).isWall = true;
          }
        }
        setGridGraph(gridGraph);
        setrefresh(refresh);
        setmouseDownEffect(false);
      }
    }
  };
  const createMapGrid = () => {
    for (var columni = 0; columni < NUMCOLUMNS; columni++) {
      for (var rowj = 0; rowj < NUMROWS; rowj++) {
        gridGraph.set(
          rowj + "+" + columni,
          new MapNode(
            rowj,
            columni,
            NUMCOLUMNS,
            NUMROWS,
            false,
            false,
            false,
            false
          )
        );
      }
    }

    setstartPoint("1+5");

    gridGraph.get("1+5").firstNode = true;

    gridGraph.get("2+2").endNode = true;

    setendPoint("2+2");
    setGridGraph(gridGraph);
    setgridGenerated(true);
  };
  const generateRandomWalls = () => {
    let leng = Math.floor(
      Math.random() * (NUMCOLUMNS - NUMROWS / 2) + NUMROWS / 4
    );
    for (var i = 0; i < leng; i++) {
      let raw = Math.floor(Math.floor(Math.random() * NUMROWS));
      let column = Math.floor(Math.floor(Math.random() * NUMCOLUMNS));
      let cor = raw + "+" + column;
      if (
        cor != startPoint &&
        cor != endPoint &&
        !gridGraph.get(cor).isPickPoint &&
        !gridGraph.get(cor).islack
      )
        gridGraph.get(cor).isWall = true;
    }
    setGridGraph(gridGraph);
    setrefresh(refresh + 1);
  };
  const djikstra = async (startPointt, endPointt, colornumb = 1) => {
    const [thePath, vistedNodes] = dj(gridGraph, startPointt, endPointt);
    if (thePath.length == 0) return;
    const colorspath = ["#177e89", "#323031"];
    for (var i = 0; i < vistedNodes.length; i++) {
      if (pathnodes.includes(vistedNodes[i])) continue;

      gridGraph.get(vistedNodes[i]).ref.style.boxShadow =
        "1px 0px 10px 0px black";

      gridGraph.get(vistedNodes[i]).ref.style.borderRadius = "5px";
      await sleep(10);
      gridGraph.get(vistedNodes[i]).ref.style.backgroundColor = "#ffc857";
    }
    if (thePath) {
      for (var i = thePath.length - 1; i >= 0; i--) {
        if (pathnodes.indexOf(thePath[i]) != -1) {
          gridGraph.get(thePath[i]).ref.style.backgroundColor = "green";

          gridGraph.get(thePath[i]).ref.style.borderRadius = "5px";

          gridGraph.get(thePath[i]).ref.style.boxShadow =
            " 5px 0px 10px 0px black";
        } else {
          gridGraph.get(thePath[i]).ref.style.backgroundColor =
            colorspath[colornumb];
          gridGraph.get(thePath[i]).ref.style.borderRadius = "5px";

          gridGraph.get(thePath[i]).ref.style.boxShadow =
            " 5px 0px 10px 0px black";
          pathnodes.push(thePath[i]);
          await sleep(1);
        }
      }
    }
  };
  const astarSearch = async (startPointt, endPointt, colorsnum = 0) => {
    const [thePath, vistedNodes] = Astar(gridGraph, startPointt, endPointt);
    if (thePath.length == 0) return;
    const colorspath = ["black", "#177e89"];

    for (var i = 0; i < vistedNodes.length; i++) {
      if (pathnodes.includes(vistedNodes[i].name)) continue;
      gridGraph.get(vistedNodes[i].name).ref.style.backgroundColor = "yellow";

      gridGraph.get(vistedNodes[i].name).ref.style.boxShadow =
        "1px 0px 10px 0px black";

      gridGraph.get(vistedNodes[i].name).ref.style.borderRadius = "5px";
      await sleep(1);
    }
    if (thePath) {
      for (var i = thePath.length - 1; i >= 0; i--) {
        if (pathnodes.includes(thePath[i])) {
          gridGraph.get(thePath[i]).ref.style.backgroundColor = "blue";

          gridGraph.get(thePath[i]).ref.style.borderRadius = "5px";

          gridGraph.get(thePath[i]).ref.style.boxShadow =
            " 5px 0px 10px 0px black";
        }
        gridGraph.get(thePath[i]).ref.style.backgroundColor =
          colorspath[colorsnum];
        gridGraph.get(thePath[i]).ref.style.borderRadius = "10px";
        pathnodes.push(thePath[i]);
      }
    }
  };
  const addLackOfWater = () => {
    setlackOfWater(true);
  };
  const cleanBoard = () => {
    setpathNodes([...[]]);
    setChoosePickPoint(false);
    setPickPoinst([...[]]);
    setgridGenerated(false);
    setstartPoint("");
    setendPoint("");
    sethold("");
    setmouseDownEffect(false);
    setlackOfWater(false);
    setGenerateLack(false);
    setrefresh(0);
    createMapGrid();
  };
  const handleDjk = async () => {
    if (pickPoints.length > 0) {
      pickPoints.unshift(startPoint);
      pickPoints.push(endPoint);
      for (var i = 0; i < pickPoints.length - 1; i++) {
        await djikstra(pickPoints[i], pickPoints[i + 1], i % 2);
        await sleep(10);
      }
      pickPoints.pop();
      pickPoints.shift();
    } else {
      await djikstra(startPoint, endPoint);
    }
    pathnodes.splice(0, pathnodes.length);
  };
  const handleAstar = async () => {
    if (pickPoints.length > 0) {
      pickPoints.unshift(startPoint);
      pickPoints.push(endPoint);
      for (var i = 0; i < pickPoints.length - 1; i++) {
        await astarSearch(pickPoints[i], pickPoints[i + 1], i % 2);
        await sleep(100);
      }
      pickPoints.pop();
      pickPoints.shift();
    } else {
      await astarSearch(startPoint, endPoint);
    }
    pathnodes.splice(0, pathnodes.length);
  };
  const handleBfs = async () => {
    for (var i = 0; i < pickPoints.length; i++) {
      gridGraph.get(pickPoints[i]).isPickPoint = false;
    }
    setGridGraph(gridGraph);
    setPickPoinst([...[]]);
    let m = bfs(gridGraph, startPoint, endPoint);
    for (var i = m.length - 2; i >= 0; i--) {
      if (m[i] === "0+0") continue;
      gridGraph.get(m[i]).ref.style.backgroundColor = "yellow";
      gridGraph.get(m[i]).ref.style.boxShadow = "1px 0px 10px 0px black";
      gridGraph.get(m[i]).ref.innerHTML = m.length - i;

      gridGraph.get(m[i]).ref.style.borderRadius = "5px";
      await sleep(1);
    }
  };
  const handleDFS = async () => {
    for (var i = 0; i < pickPoints.length; i++) {
      gridGraph.get(pickPoints[i]).isPickPoint = false;
    }
    setGridGraph(gridGraph);
    setPickPoinst([...[]]);

    let m = dfs(gridGraph, startPoint, endPoint);
    for (var i = 0; i < m.length - 1; i++) {
      if (m[i] === "0+0") continue;
      gridGraph.get(m[i]).ref.style.backgroundColor = "yellow";
      gridGraph.get(m[i]).ref.style.boxShadow = "1px 0px 10px 0px black";
      gridGraph.get(m[i]).ref.innerHTML = i;

      await sleep(1);
    }
  };

  const changeRangeMa = (e) => {
    let rangevalue = parseInt(e.target.value);
  };

  useEffect(() => {
    createMapGrid();
  }, []);
  return openModel?  <GraphModal
    onclose ={()=>{
      setopenModel(false)
    }}
    open = {openModel}
  />: (
    <div className="containermap">
      <Grid>
        <Grid.Row>
          <Button.Group color="black">
            <Button
              disabled={disabled}
              onClick={async () => {
                setdisabled(true);
                await handleAstar();
              }}
            >
              A*
            </Button>
            <Button
              disabled={disabled}
              onClick={async () => {
                setdisabled(true);
                await handleDjk();
              }}
            >
              dijkstra{" "}
            </Button>
          </Button.Group>
          <Button.Group color="green">
            <Button
              disabled={disabled}
              onClick={async () => {
                setdisabled(true);
                await handleBfs();
              }}
            >
              Breadth First Search
            </Button>
            <Button
              disabled={disabled}
              onClick={async () => {
                setdisabled(true);
                await handleDFS();
              }}
            >
              Depth First Search
            </Button>
          </Button.Group>
        </Grid.Row>
        <Grid.Row>
          <Button
            disabled={disabled}
            color="red"
            onClick={() => {
              generateRandomWalls();
            }}
          >
            Generate Random Walls
          </Button>
          <Button
            disabled={disabled}
            color="blue"
            onClick={() => {
              addLackOfWater();
            }}
          >
            Add lack of water{" "}
          </Button>
          <Button
            disabled={disabled}
            onClick={() => {
              AddPickPoint();
            }}
          >
            Add Pick Point{" "}
          </Button>

        
          <Button
            disabled={finishedFindinf}
            color="teal"
            onClick={() => {
              setdisabled(false);

              cleanBoard();
            }}
          >
            Clean Board{" "}
          </Button>
          { disabled? <Button
            color="yellow"
            onClick={() => {
              setdisabled(false);
              setrefresh(refresh - 1);
            }}
          >
            Clean path{" "}
          </Button> :''}
        </Grid.Row>
      </Grid>

      <Grid relaxed="very" textAlign="center">
        <Grid.Row>
          {!gridGenerated
            ? ""
            : _.times(NUMCOLUMNS, (columnIndex) => {
                return (
                  <Grid.Row 
                  
                  key={columnIndex * Math.random() * 10}>
                    {_.times(NUMROWS, (rowIndex) => {
                      let index = rowIndex + "+" + columnIndex;
                      return (
                        <Grid.Column key={rowIndex * Math.random() * 10}>
                          <div
                                            disabled={true}

                            ref={(ref) => (gridGraph.get(index).ref = ref)}
                            onMouseLeave={() => {
                              handleMouseEnter(index);
                            }}
                            onMouseUp={() => {
                              handleMouseUp(index);
                            }}
                            onMouseEnter={() => {
                              handleMouseEnter(index);
                            }}
                            onMouseDown={() => {
                              handleMouseDown(index);
                            }}
                            className={`
                            ${
                              gridGraph.get(index).isPickPoint
                                ? "pick-node "
                                : ""
                            }


                            ${gridGraph.get(index).islack ? "lack-node " : ""}
                            ${
                              gridGraph.get(index).firstNode
                                ? "first-node "
                                : ""
                            }
                        ${gridGraph.get(index).endNode ? "end-node " : ""}
                          ${gridGraph.get(index).isWall ? "wall-node " : ""}
                        grid-container-div`}
                          >
                            {gridGraph.get(index).firstNode ? (
                              <i className="yellow male icon"></i>
                            ) : (
                              ""
                            )}
                            {gridGraph.get(index).endNode ? (
                              <i className=" dot circle outline icon"></i>
                            ) : (
                              ""
                            )}
                            {gridGraph.get(index).isPickPoint ? (
                              <i>{pickPoints.indexOf(index) + 1}</i>
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
  );
};

export default MapPathFinding;
