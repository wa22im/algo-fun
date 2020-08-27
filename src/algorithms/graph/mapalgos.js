import React, { useState } from "react";
import _ from "lodash";
import "./grid.css";
import { Grid, Button, Container } from "semantic-ui-react";
import Heap from "heap-js";
import Node from "./node";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const NUMROWS = 40;
const NUMCOLUMNS = 40;
const STARTCOLOR = "yellow";
const ENDCOLOR = "blue";
const WALLCOLOR = "#EC2049";
const PATHCOLOR = "#F7DB4F";
const VISTEDCOLOR = "#d0e1f9";
const CURRENTVISCOLOR = "#4d648d";

const Mapalgos = () => {
  let refobj = {};
  const addHeavynode = false ;

  const [graphi, setGraphi] = useState(new Map());
  const [phase, setPhase] = useState(0);
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setendPoint] = useState("");
  const [vis, setvis] = useState([]);
  const [dfsPath, setDfsPath] = useState([]);
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
        if ( !graph.get(m.name).isWall){
        setTimeout(() => {
          graph.get(m.name).ref.style.backgroundColor = CURRENTVISCOLOR;
          graphi.get(m.name).ref.style.border = "1px outset #283655";
        }, 5);
        setTimeout(() => {
          graph.get(m.name).ref.style.backgroundColor = VISTEDCOLOR;
          graphi.get(m.name).ref.style.border = "1px outset ivory";
        }, 100);
        await sleep(1);}

        nodesinque.set(m.name, m.distance);
        theway.push(m);
      }
    }

    let shortestpath = [];
    findparent(theway, currentNode, shortestpath);
    return shortestpath;
  };

  const bfs = async (startpoint, endpoint, graphii) => {
    const visited = new Array();
    const mystack = new Array();
    const parentMap = new Map();
    mystack.push(startpoint);
    console.log(mystack);
    visited.push(startpoint);
    while (mystack.length != 0) {
      var current = mystack.pop();
      if (current === endpoint) return parentMap;
      var currentNeighbors = graphii.get(current).jirani;
      visited.push(current);

      if (currentNeighbors) {
        for (var i = 0; i < currentNeighbors.length; i++) {
          let node = currentNeighbors[i];

          if (visited.indexOf(node) == -1) {
            let m = mystack.indexOf(node);
            if (m != -1) mystack.splice(m, 1);
            mystack.push(node);

            setvis([...mystack]);
            await sleep(5);
            parentMap.set(current, node);
            setDfsPath([...parentMap.keys()]);
          }
        }
      }
    }
  };

  const handleOnClick = (graphi,i, j) => {
    let ind = i+'+'+j;

    if (phase == 0) {
      console.log(ind)
      setStartPoint(ind);
      graphi.get(ind).ref.style.backgroundColor = "#3b4d61"

    } else if (phase == 1) {
      graphi.get(ind).ref.style.backgroundColor = ENDCOLOR;
      graphi.get(ind).endNode = true;

      let ob = graphi.get(ind);
      ob.endNode = true;
      graphi.set(ind, ob);
      setendPoint(ind);
    } else if (phase >= 2) {

      createWall(ind);
    }
    setPhase(phase + 1);

    graphi.get(ind).isSelected = true;
  };
  const createStartPoin=(ind)=>{


  }
  const createWall = (ind) => {
    graphi.get(ind).ref.style.backgroundColor = WALLCOLOR;

    graphi.get(ind).isWall = true;
    let m = graphi.get(ind).jirani;
    m.map((i) => {
      let x = graphi.get(i).jirani.indexOf(ind);
      graphi.get(i).jirani.splice(x, 1);
    });
    m.map((i) => {
      delete graphi.get(i).adj[ind];
    });
  };
  const startDj = async () => {
    let m = await dj(graphi, startPoint, endPoint);
    for (var i = m.length-2; i >= 0; i--) {
        graphi.get(m[i]).isPath = true;
        graphi.get(m[i]).ref.style.backgroundColor = PATHCOLOR;
        graphi.get(m[i]).ref.style.boxShadow = "1px 0px 10px 0px black";

      await sleep(10);
    }
    setTimeout(() => {
      graphi.get(endPoint).ref.style.backgroundColor = "#3b4d61";
    }, 100);
  };
  return (
    <div>
      <Button
        onClick={() => {
          bfs(startPoint, endPoint, graphi);
        }}
      >
        {" "}
        bfs
      </Button>
      <Button
        onClick={() => {
          startDj();
          //let m = djikstra(graphi, startPoint, endPoint);
          // setDfsPath([...m])
        }}
      >
        {" "}
        djikstra
      </Button>
      <Button>
        add   heavy node
      </Button>
      <Button
      onClick={()=>{
        let leng = Math.floor(Math.random()*NUMROWS)
        for ( var i=0 ; i<leng ; i++){
          
          let raw = Math.floor( Math.floor(Math.random()*NUMROWS))
          let column = Math.floor( Math.floor(Math.random()*NUMCOLUMNS))
          let cor = raw+'+'+column
          if ( !graphi.get(cor).isSelected)
          createWall(cor)

        }
      }}
      >
        generate Random Walls
      </Button>
      <div className="containermap">
        <Grid relaxed="very" textAlign="center">
          <Grid.Row columns={16}>
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
                        isPath: false,
                        firstNode: false,
                        endNode: false,
                        isWall: false,
                        isSelected: false,
                        jirani: [],
                        adj: {},
                        ref: null,
                      };
                      const indexx = `${i}+${j}`;

                      let adjweghit = {};

                      graphi.set(`${i}+${j}`, mapprop);
                      if (j - 1 >= 0) {
                        graphi.get(`${i}+${j}`).jirani.push(`${i}+${j - 1}`);
                        adjweghit[`${i}+${j - 1}`] = 1;
                      }
                      if (i + 1 < NUMROWS) {
                        graphi.get(`${i}+${j}`).jirani.push(`${i + 1}+${j}`);
                        adjweghit[`${i + 1}+${j}`] = 1;
                      }

                      if (j + 1 < NUMCOLUMNS) {
                        graphi.get(`${i}+${j}`).jirani.push(`${i}+${j + 1}`);
                        adjweghit[`${i}+${j + 1}`] = 1;
                      }
                      if (i - 1 >= 0) {
                        graphi.get(`${i}+${j}`).jirani.push(`${i - 1}+${j}`);
                        adjweghit[`${i - 1}+${j}`] = 1;
                      }
                      graphi.get(indexx).adj = adjweghit;
                    }
                    const indexx = `${i}+${j}`;

                    return (
                      <Grid.Column
                        stretched
                        width={1}
                        key={j + Math.random() * 3}
                      >
                        <div
                          className={`
                          ${
                            graphi.get(indexx).firstNode ? "star " : " "
                          }
                          grid-container-div`}
                        
                          ref={(ref) => (graphi.get(indexx).ref = ref)}
                          onClick={() => handleOnClick(graphi,i, j)}
                        >
                    
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

export default Mapalgos;
