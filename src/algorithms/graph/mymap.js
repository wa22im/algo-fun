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
  const [startpoint, setStartPoint] = useState('');

  const [endPoint, setEndPoint] = useState('');

  const [messageBudy, setMessageBudy] = useState(
    "by clicking on the map , you are choosing your start point"
  );
  const [messageHeader, setMessageHeader] = useState(
    "first phase : choose the start point  "
  );
  const [phaseColor, setPhasecolor] = useState("blue");
  const [phase, setPhase] = useState(0);

  const [theWay, setTheWay] = useState([]);

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

  const rows = _.times(10, (i) => {
    return (
      <Grid.Row
        style={{
          margin: "5px 10px 5px 10px",
        }}
        key={i + "row"}
      >
        {_.times(16, (j) => {
          return (
            <Grid.Column stretched width={1} key={j}>
              <GraphBtn
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

  const startSearching = () => {
 console.log(   MyGraph.bfs(startpoint , endPoint) )


  };

  useEffect(() => {
    MyGraph.setnoOfVertices(16 * 10);
    MyGraph.constructMap(16, 10);

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
              <Button
                basic
                color="blue"
                onClick={startSearching}
              >
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
