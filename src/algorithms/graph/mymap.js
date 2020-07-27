import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Button,
  Icon,
  Label,
  Message,
} from "semantic-ui-react";
import _ from "lodash";
import GraphBtn from "./graphBtn";
import { MessageNotif } from "../shared/message";

import MyGraph from "./graph";

const FIRSTPHASECOLOR = "blue"; //'#f50057'
const THIRDPHASECOLOR = "green"; //'#ff5983'
const SECONDPHASECOLOR = "yellow"; // '#bb002f'

const MyMap = () => {
  const NUMROWS = 5;
  const NUMCOLUMNS = 5;
  var graphi = new Map();
  const deletedvertex = new Array() 
  //const [graphi, setGraphi] = useState(new Map());

  const [startpoint, setStartPoint] = useState("");

  const [endPoint, setEndPoint] = useState("");

  const [messageBudy, setMessageBudy] = useState(
    "by clicking on the map , you are choosing your start point"
  );
  const [messageHeader, setMessageHeader] = useState(
    "first phase : choose the start point  "
  );
  const [phaseColor, setPhasecolor] = useState("blue");
  const [phase, setPhase] = useState(0);

  const [theWay, setTheWay] = useState([]);

  const makeAroad = (point) => {
    return theWay.indexOf(point) != -1;
  };

  const thirdPhasePhaseInit = () => {
    setPhasecolor(THIRDPHASECOLOR);

    setMessageHeader("third phase : choose your end point  ");

    setMessageBudy("where do you want to go  ? ");
  };

  const secondPhaseInit = () => {
    setPhasecolor(SECONDPHASECOLOR);

    setMessageHeader("second phase : build a wall ");
    setMessageBudy("walls here are off limits , we can't go throw them");
  };

  const setMyStartPoint = (index) => {
    console.log("uindex from map ", index);

    setStartPoint(index);
  };
  const setMyEndPoint = (index) => {
    setEndPoint(index);
  };

  const updateStage = () => {
    if (phase == 0) {
      secondPhaseInit();
    }
    if (phase == 1) {
      thirdPhasePhaseInit();
    }

    setPhase(phase + 1);
  };

  const initPhases = () => {
    setPhasecolor(FIRSTPHASECOLOR);
    setPhase(0);
  };

  const getPhase = () => {
    return phase;
  };

  const setWall = (indexe) => {
    MyGraph.deleteVertex(indexe);
  };

  const deletvertex = (index) => {
    console.log(index, graphi.has(index));

    if (graphi.has(index)) {
      graphi.delete(index);
      deletedvertex.push(index)
    }
  };
  const rows = _.times(NUMROWS, (i) => {
    return (
      <Grid.Row
        style={{
          margin: "5px 10px 5px 10px",
        }}
        key={i + "row"}
      >
        {_.times(NUMCOLUMNS, (j) => {
          graphi.set(`${i}+${j}`, []);

          if (j - 1 >= 0) {
            graphi.get(`${i}+${j}`).push(`${i}+${j - 1}`);
          }

          if (i + 1 < 16) {
            graphi.get(`${i}+${j}`).push(`${i + 1}+${j}`);
          }
          if (j + 1 < 10) {
            graphi.get(`${i}+${j}`).push(`${i}+${j + 1}`);
          }

          if (i - 1 >= 0) {
            graphi.get(`${i}+${j}`).push(`${i - 1}+${j}`);
          }

          return (
            <Grid.Column stretched width={1} key={j}>
              <GraphBtn
                deletvertex={deletvertex}
                makeAroad={makeAroad}
                setWall={setWall}
                setMyEndPoint={setMyEndPoint}
                setStartPoint={setMyStartPoint}
                index={`${j}+${i}`}
                updateStage={updateStage}
                getPhase={getPhase}
              />
            </Grid.Column>
          );
        })}
      </Grid.Row>
    );
  });

  const bfs = (startpoint, endpoint) => {
    console.log(startpoint, endpoint);

    const visited = new Array();
    const mystack = Array();
    const parentMap = new Map();

    mystack.push(startpoint);
    visited.push(startpoint);

    //console.log(mystack);

    while (mystack.length != 0) {
      var current = mystack.pop();
      if ( deletedvertex.indexOf(current) !=-1 ){
      console.log(deletedvertex.indexOf(current) !=-1 )
      current = mystack.pop()
      }
      if (current == endpoint) return parentMap;
     
        var currentNeighbors = graphi.get(current);

      if (currentNeighbors  ) {
        for (var i = 0; i < currentNeighbors.length; i++) {
          let node = currentNeighbors[i];
          if (visited.indexOf(node) == -1) {
            // console.log(node);
            visited.push(node);
            parentMap.set(current, node);
            mystack.push(node);
          }
        }
      
    }
    }
  };

  const startSearching = () => {
    console.log("start searchng ");
    const myWay = bfs(startpoint, endPoint);
    // console.log(bfs(startpoint , endPoint))

    if (myWay) {
      let arrr = myWay.keys();
      console.log("array of ", arrr);
      setTheWay([...arrr]);
      // console.log(theWay);
    }
  };

  useEffect(() => {
    //MyGraph.setnoOfVertices(16 * 10);
    // MyGraph.constructMap(16, 10);

    initPhases();
  }, []);

  return (
    <Container
      style={{
        width: "90%",
        margin: "1%",
      }}
      textAlign="center"
      fluid
    >
      <MessageNotif
        messageHeader={messageHeader}
        messageBudy={messageBudy}
        color={phaseColor}
      ></MessageNotif>
      <Grid relaxed="very" textAlign="center" fluid>
        <Grid.Row fluid columns={16} padded>
          {rows}
        </Grid.Row>
        <Grid.Row>
          <Button.Group
            style={{
              padding: "0px 10px 0px 10px",
            }}
          >
            {phase == 1 ? (
              <Button as="div" labelPosition="right">
                <Button onClick={updateStage} color={SECONDPHASECOLOR}>
                  <Icon name="expand arrows alternate" />
                </Button>
                <Label as="a" basic color={SECONDPHASECOLOR} pointing="left">
                  choose your end point
                </Label>
              </Button>
            ) : (
              ""
            )}
            <div
              style={{
                margin: "0px 10px 0px 10px",
              }}
            ></div>
            <Button as="div" labelPosition="right">
              <Button color="red">
                <Icon name="redo" />
              </Button>
              <Label as="a" basic color="red" pointing="left">
                reply
              </Label>
            </Button>
            <div
              style={{
                margin: "0px 10px 0px 10px",
              }}
            ></div>

            <Button as="div" labelPosition="right">
              <Button basic color="blue" onClick={startSearching}>
                <Icon name="window maximize" />
              </Button>
              <Label as="a" basic color={FIRSTPHASECOLOR} pointing="left">
                start searching
              </Label>
            </Button>
          </Button.Group>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default MyMap;
