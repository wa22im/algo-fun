import React, { useEffect, useState } from "react";
import MyResponsiveBar from "../nivobar";
import { Grid, Container, Button, Step, Header } from "semantic-ui-react";

const SelectionSort = () => {
  var countsteps = 1;

  const [stepsadded, setsteps] = useState([]);
  const [stepstrigger, setstepstrigger] = useState(false);
  //const [barIndex, setbarIndex] = useState(["1","2","3","4","5","6"]);
  const [sortActive, setSortActive] = useState(false);
  const [keys, setkeys] = useState(["value"]);
  const [colors, setColors] = useState([
    "hsla(4,   90%,  58%, 1)",
    "hsla(340, 82%,  52%, 1)",
    "hsla(291, 64%,  42%, 1)",
    "hsl(35, 70%, 50%)",
    "hsl(263, 70%, 50%)",
    "hsl(188, 70%, 50%)",
    "hsl(150, 70%, 50%)",
    "hsl(300, 76%, 72%)"
  ]);
  const [data, setdata] = useState([
    {
      row: "1",
      value: 100,
      valueColor: "hsl(14, 70%, 50%)",
    },
    {
      row: "2",
      value: 50,
      valueColor: "hsl(101, 70%, 50%)",
    },
    {
      row: "3",
      value: 10,
      valueColor: "hsl(64, 70%, 50%)",
    },

    {
      row: "4",
      value: 90,
      valueColor: "hsl(200, 70%, 50%)",
    },
    {
      row: "5",
      value: 30,
      valueColor: "hsl(64, 70%, 50%)",
    },
    {
      row: "6",
      value: 20,
      valueColor: "hsl(287, 70%, 50%)",
    },
    {
      row: "7",
      value: 70,
      valueColor: "hsl(302, 70%, 50%)",
    },
    {
      row: "8",
      value: 80,
      valueColor: "hsl(328, 70%, 50%)",
    },
  ]);

  const resetapp = () => {
    setstepstrigger(false);
    setdata([
      {
        row: "1",
        value: 100,
        valueColor: "hsl(14, 70%, 50%)",
      },
      {
        row: "2",
        value: 50,
        valueColor: "hsl(101, 70%, 50%)",
      },
      {
        row: "3",
        value: 10,
        valueColor: "hsl(64, 70%, 50%)",
      },

      {
        row: "4",
        value: 90,
        valueColor: "hsl(200, 70%, 50%)",
      },
      {
        row: "5",
        value: 30,
        valueColor: "hsl(64, 70%, 50%)",
      },
      {
        row: "6",
        value: 20,
        valueColor: "hsl(287, 70%, 50%)",
      },
      {
        row: "7",
        value: 70,
        valueColor: "hsl(302, 70%, 50%)",
      },
      {
        row: "8",
        value: 80,
        valueColor: "hsl(328, 70%, 50%)",
      },
    ]);
    setsteps([]);
  };


  const showSteps = () => {
    //stepsadded? setsteps([...]):''
    return (
      <Container>
        <Header as="h3">steps Queau</Header>
        <Step.Group inverted vertical items={stepsadded}></Step.Group>
      </Container>
    );
  };

  const addstep = (nextstep) => {
    const nxtstep = {
      key: nextstep,
      title: `step ${countsteps}`,
      description: nextstep,
    };

    countsteps = countsteps + 1;
    let newsteps = stepsadded;
    if (newsteps.length >= 5) {
      newsteps.pop();
    }
    newsteps.unshift(nxtstep);
    setsteps([...newsteps]);
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const sortMyapp = async (dat) => {
    let len = dat.length;
    //   setlenArray(len);
    //showSteps()

    setstepstrigger(true);
    ;
    for (let i = 0; i < len; i++) {
      let min = i;
      let d = colors;
      let c = d[i]
      d[i] = "hsla(174, 100%, 0%, 1)";
      setColors([...d]);
      addstep(`find the min ele in [${i}..${len}]`);
      await sleep(400);
      for (let j = i + 1; j < len; j++) {
        if (dat[min]["value"] > dat[j]["value"]) {
          min = j;
        }
      }
      if (min !== i) {
        let tmp = dat[i];
        dat[i] = dat[min];
        dat[min] = tmp;
        addstep(
          `replace  the min founded  ${dat[min]["value"]} from ${min} pos 1`
        );

        await sleep(1000);

        setdata([...dat]);
        await sleep(1000);
      }
      d[i]=c
      setColors([...d])
      await sleep(500);

    }
  };
  useEffect(() => {
  }, []);


  return (
    <Grid divided>
      <Grid.Row>
        <Grid.Column
          style={{
            margin: "40px",
          }}
          width={3}
          floated="left"
        >
          <Button.Group>
            <Button
              content="sort"
              primary
              onClick={() => {
                sortMyapp(data);
              }}
            />
            <Button
              content="reset"
              secondary
              onClick={() => {
                resetapp(data);
              }}
            />
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={3}>
        <Grid.Column
          width={14}
          style={{
            height: "500px",
          }}
        >
          <Container
            style={{
              height: "500px",
            }}
          >
            <MyResponsiveBar
              colors={colors}
              barKeys={keys}
              barIndex={"row"}
              data={data}
            ></MyResponsiveBar>
          </Container>
        </Grid.Column>
        <Grid.Column width={2}>{stepstrigger ? showSteps() : ""}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default SelectionSort;
