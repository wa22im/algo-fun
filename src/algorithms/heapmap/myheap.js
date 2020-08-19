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
  Header,
} from "semantic-ui-react";
import _ from "lodash";
import HeapBar from "./heapBar";
import Expe from "./expe";
import Tree from "./tree";

const MyHeap = () => {
  const [serfHeap, setSerfHeap] = useState(0);
  const customPriorityComparatorlower = (a, b) => a["valuee"] - b["valuee"];

  const customPriorityComparator = (a, b) => b["valuee"] - a["valuee"];

  let heappLower = new Heap(customPriorityComparator);
  let heappUpper = new Heap(customPriorityComparatorlower);

  const [endSearch, setEndSearch] = useState(false);

  const [notif, setNotif] = useState([]);
  const [daysNotif, setDaysNotif] = useState([]);
  const [lowHeaps, setLowHeaps] = useState([]);
  const [upperHeaps, setUpperHeaps] = useState([]);

  const [expe, setExpe] = useState([]);
  const [numberDay, setNumberDays] = useState(1);
  const [dayTrigger, setdayTrigger] = useState(false);
  const [followDays, setFollowDays] = useState(0);

  const HandleRedo = () => {
    setdayTrigger(false);
    setNumberDays(1);

    setSerfHeap(0);
    setNotif(notif.splice());
    setDaysNotif(daysNotif.splice());
    setLowHeaps(lowHeaps.splice());
    setUpperHeaps(upperHeaps.splice());
    setExpe(expe.slice());
    setFollowDays(0);
  };

  const handleDayNumber = (e) => {
    if (e.target.value.indexOf("-") === -1) {
      if (e.target.name == "numdays") {
        if (e.target.value < numberDay) {
          let m = expe;
          m.shift();
          setExpe([...m]);
        } else setExpe([...expe, Math.floor(Math.random() * 101) + 1]);

        setNumberDays(e.target.value);
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
    heappLower.init([]);
    heappUpper.init([]);
    console.log("start algo");
    let vi = [];
    let lowh = [];
    let uph = [];
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
        lowh.push(heappLower.toArray());
        uph.push(heappUpper.toArray());
      }

      removeFromHeap(i - followDays, expe[i - followDays]);
      let no = {
        row: i,
        valuee: expe[i],
      };

      addToHeap(no);
      rebalence();
    }

    setNotif([...notifArray]);

    setDaysNotif([...vi]);
    setLowHeaps([...lowh]);
    setUpperHeaps([...uph]);
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
      <Header>Fraudulent Activity Notifications</Header>
      <Container>
        in ordre to solve this , we used Heap data structre in ordre to keep
        finding the median .
      </Container>

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
          <Form.Field>
            <Label basic color="teal" pointing="right">
              choose follow days ...
            </Label>
            <Input
              name="numdays"
              width={4}
              placeholder="0"
              type="number"
              max={50}
              value={numberDay}
              onChange={handleDayNumber}
              min={1}
            />
          </Form.Field>

          <Form.Field>
            <Input
              name="followdays"
              width={4}
              value={followDays}
              placeholder="0"
              type="number"
              max={numberDay - 1}
              min={1}
              onChange={handleDayNumber}
            />

            <Label basic color="teal" pointing="left">
              choose follow days
            </Label>
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
              color={daysNotif.indexOf(idx) == -1 ? null : "red"}
              key={idx + "g" + exp}
              exp={exp}
              idx={idx}
            ></Expe>
          ))}
        </Grid.Row>
      </Grid>
      <Divider> </Divider>

      <h4>
        value in heap when a notification has been sent , you can check for the
        median...{" "}
      </h4>
      <Button.Group>
        <Button
          icon
          onClick={() => {
            if (serfHeap >= 1) setSerfHeap(serfHeap - 1);
          }}
        >
          <Icon name="angle double left" />
        </Button>
        <Label> {`${notif.length==0? serfHeap:serfHeap+1}/${notif.length}`}</Label>
        <Button
          icon
          onClick={() => {
            if (serfHeap + 1 < notif.length) setSerfHeap(serfHeap + 1);
          }}
        >
          <Icon name="angle double right" />
        </Button>
      </Button.Group>
      <Container
        style={{
          marginTop: "40px",
        }}
      >
        <Grid celled width={10}>
          <Grid.Column width={8}>
            <h3> heap with biggest values / min heap </h3>
            <Tree data={lowHeaps[serfHeap]}></Tree>
          </Grid.Column>
          <Grid.Column width={4}>
            <h3> heap with smallest values /max heap </h3>

            <Tree data={upperHeaps[serfHeap]}></Tree>
          </Grid.Column>
        </Grid>
      </Container>
    </Container>
  );
};

export default MyHeap;
