import Heap from "heap-js";

import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Form,
  Label,
  Input,
  Button,
  Icon,
  Table,
  Divider,
} from "semantic-ui-react";
import _ from "lodash";
import HeapBar from "./heapBar";
import Expe from "./expe";

const MyHeap = () => {
  const customPriorityComparatorlower = (a, b) => a["valuee"] - b["valuee"];

  const customPriorityComparator = (a, b) => b["valuee"] - a["valuee"];

  let heappLower = new Heap(customPriorityComparator);
  let heappUpper = new Heap(customPriorityComparatorlower);

  heappLower.init([]);
  heappUpper.init([]);

  const [endSearch, setEndSearch] = useState(false);

  const [notif, setNotif] = useState([]);
  const [daysNotif, setDaysNotif] = useState([]);

  const [expe, setExpe] = useState([]);
  const [numberDay, setNumberDays] = useState(1);
  const [dayTrigger, setdayTrigger] = useState(false);
  const [followDays, setFollowDays] = useState(0);

  const handleDayNumber = (e) => {
    if (e.target.value.indexOf("-") === -1) {
      if (e.target.name == "numdays") {
        setNumberDays(e.target.value);
        setExpe([...expe, Math.floor(Math.random() * 101)+1]);
      } else {
        setFollowDays(e.target.value);
      }
    }
  };
  const confirmDays = () => {
    setdayTrigger(true);
    activityNotifications();
  };

  const addToHeap = (dot) => {
    if (heappLower.size() == 0 || dot.value <= heappLower.peek().valuee)
      heappLower.add(dot);
    else heappUpper.add(dot);
  };
  const rebalence = () => {
    if (Math.abs(heappUpper.size() - heappLower.size()) >= 2) {
      if (heappUpper.size() > heappLower.size()) {
        heappLower.add(heappUpper.pop());
      } else heappUpper.add(heappLower.poll());
    }
  };

  const getMedian = () => {
    let uph = heappUpper.size();
    let lowh = heappLower.size();
    if (uph == lowh) {
      return (heappLower.peek().valuee + heappUpper.peek().valuee) / 2;
    } else {
      return uph > lowh ? heappUpper.peek().valuee : heappLower.peek().valuee;
    }
  };

  const removeFromHeap = (idx, val) => {
    let index;
    if (val <= heappLower.peek().valuee) {
      index = heappLower.heapArray.findIndex((h) => h.row == idx);
      heappLower.heapArray.splice(index, 1);
    } else {
      index = heappUpper.heapArray.findIndex((h) => h.row == idx);
      heappUpper.heapArray.splice(index, 1);
    }
    rebalence();
  };

  const activityNotifications = () => {
    let vi = [];
    let d = 5;
    let notifi = 0;
    let notifArray = [];
    let testHeap = _.times(followDays, (i) => {
      let dot = {
        row: i,

        valuee: expe[i],
      };
      addToHeap(dot);
      rebalence();
    });
    let j = Math.floor(d / 2);

    for (var i = followDays; i < expe.length; i++) {
      var med = getMedian();

      if (expe[i] >= med * 2) {
        notifi++;

        let note = {
          alerteDay: i + 1,
          money: expe[i],
          median: med,
        };
        vi.unshift(i);
        notifArray.unshift(note);
      }

      removeFromHeap(i - followDays, expe[i - followDays]);
      let no = {
        row: i,
        valuee: expe[i],
      };

      addToHeap(no);
      rebalence();
    }
    setDaysNotif([...vi]);

    setNotif([...notifArray]);
  };

  return (
    <Container
      style={{
        width: "90%",
        marginTop: "100px",
        marginLeft: "100px",
        marginRight: "50px",
      }}
    >
      <Table
        style={{
          width: "50vw",
        }}
        celled
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>day of alert </Table.HeaderCell>
            <Table.HeaderCell>moeny spent</Table.HeaderCell>
            <Table.HeaderCell>Median</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {notif.map((not, idx) => (
            <Table.Row key={not + "/" + idx}>
              <Table.Cell>{not.alerteDay}</Table.Cell>

              <Table.Cell>{not.money}</Table.Cell>
              <Table.Cell>{not.median}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Form>
        <Form.Group inline>
          <Form.Field disabled={dayTrigger}>
            <Label basic color="teal" pointing="right">
              choose follow days {`${typeof expenditures}`}
            </Label>
            <Input
              name="numdays"
              width={4}
              placeholder="0"
              type="number"
              value={numberDay}
              onChange={handleDayNumber}
            />
          </Form.Field>

          <Form.Field disabled={dayTrigger}>
            <Input
              name="followdays"
              width={4}
              value={followDays}
              placeholder="0"
              type="number"
              onChange={handleDayNumber}
            />
            {followDays < numberDay ? (
              <Label basic color="teal" pointing="left">
                choose follow days
              </Label>
            ) : (
              <Label color="red" pointing="left">
                follow days must be > number of days {followDays}
              </Label>
            )}
          </Form.Field>
        </Form.Group>
        <Form.Button positive animated="vertical" onClick={confirmDays}>
          <Button.Content hidden>ready ???</Button.Content>
          <Button.Content visible>
            <Icon name="play" />
          </Button.Content>
        </Form.Button>
      </Form>

      <Grid
        style={{
          margin: "10px",
        }}
      >
        <Grid.Row>
          {expe.map((exp, idx) => (
            <Expe
              color={daysNotif.indexOf(idx) == -1 ? "#FFFFFF" : "red"}
              key={idx + "g" + exp}
              exp={exp}
              idx={idx}
            ></Expe>
          ))}
        </Grid.Row>
      </Grid>
      <Divider>
        <h4>
          value in heap ... {daysNotif.map((dta, idx) => `${dta.value}|`)}
        </h4>
      </Divider>

      <div
        style={{
          margin: "auto",
          width: "50%",
          border: "1px solid green",
          padding: "10px",
          height: "500px",
        }}
      ></div>
    </Container>
  );
};

export default MyHeap;
