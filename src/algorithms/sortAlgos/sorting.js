import React, { useEffect, useState, useRef } from "react";
import { Container, Button, Icon, Input, Grid } from "semantic-ui-react";
import "./sortCss.css";

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const Sorting = () => {
  const [disbled, setdisbled] = useState(false);
  const [dataAyya, setdataAyya] = useState([]);
  //var arrLength=100;
  const [arrLength, setarrLength] = useState(50);
  const [colorVariation, setColorVarition] = useState(150);
  const [windowWidth, setWidth] = useState(0);
  const [barWidth, setBarWidth] = useState("10px");
  const heightRange = [20, 700];
  const refTab = [];
  const createArray = () => {
    console.log(arrLength);
    let arr = [];
    for (var i = 0; i < arrLength; i++) {
      let obj = {};
      obj.twil = getRandom(heightRange[0], heightRange[1]);
      obj.color = pickColor(i);
      arr.push(obj);
    }

    setdataAyya([...arr]);
    refTab.splice();
  };
  const pickColor = (idx) => {
    return `hsl(${idx + colorVariation}, 87%, 45%)`;
  };

  const mergee = async (tab, startt, mid, endd) => {
    let startMid = mid + 1;

    if (dataAyya[mid].twil <= dataAyya[startMid].twil) return;
    while (startt <= mid && startMid <= endd) {
      if (dataAyya[startt].twil < dataAyya[startMid].twil) {
        startt++;
      } else {
        let valueh = tab[startMid].style.height;
        let value = dataAyya[startMid].twil;
        let indexx = startMid;
        let firstColor = tab[startMid].style.backgroundColor;
        tab[startMid].style.backgroundColor = "red";
        let startColor = tab[startt].style.backgroundColor;
        tab[startt].style.backgroundColor = "black";
        let endColor = tab[endd].style.backgroundColor;
        tab[endd].style.backgroundColor = "black";

        while (indexx != startt) {
          tab[indexx].style.height = tab[indexx - 1].style.height;
          await sleep(1);

          dataAyya[indexx].twil = dataAyya[indexx - 1].twil;

          indexx--;
        }
        tab[startt].style.backgroundColor = startColor;
        tab[endd].style.backgroundColor = endColor;
        tab[startMid].style.backgroundColor = firstColor;

        tab[startt].style.height = valueh;

        dataAyya[startt].twil = value;
        startt++;
        mid++;
        startMid++;
      }
    }
  };

  const mergeSort = async (tab, startt, endd) => {
    if (startt < endd) {
      var m = Math.floor(startt + (endd - startt) / 2);

      await mergeSort(tab, startt, m);
      await mergeSort(tab, m + 1, endd);
      await mergee(tab, startt, m, endd);
    }
  };

  const quickSort = async (arr, start, end) => {
    if (start >= end) {
      return;
    }
    let index = await partition(arr, start, end);

    await quickSort(arr, start, index - 1);
    await quickSort(arr, index + 1, end);
  };

  const partition = async (arr, start, end) => {
    let endcolr = arr[end].style.backgroundColor;
    let startColor = arr[start].style.backgroundColor;

    arr[end].style.backgroundColor = "#9f0000";
    arr[start].style.backgroundColor = "#d84315";
    await sleep((1 / end - start) * 10);

    let pivotValue = dataAyya[end].twil;
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
      if (dataAyya[i].twil < pivotValue) {
        await swap(arr, i, pivotIndex);

        pivotIndex++;
      }
    }

    await swap(arr, pivotIndex, end);
    arr[end].style.backgroundColor = endcolr;
    arr[start].style.backgroundColor = startColor;

    return pivotIndex;
  };

  const reverseMerge = async (tab, startt, mid, endd) => {
    let startMid = mid + 1;

    if (dataAyya[startMid].twil <= dataAyya[mid].twil) return;
    while (startt <= mid && startMid <= endd) {
      if (dataAyya[startt].twil >= dataAyya[startMid].twil) {
        startt++;
      } else {
        let valueh = tab[startMid].style.height;
        let value = dataAyya[startMid].twil;
        let indexx = startMid;
        let firstColor = tab[startMid].style.backgroundColor;
        tab[startMid].style.backgroundColor = "red";
        let startColor = tab[startt].style.backgroundColor;
        tab[startt].style.backgroundColor = "black";
        let endColor = tab[endd].style.backgroundColor;
        tab[endd].style.backgroundColor = "black";

        while (indexx != startt) {
          tab[indexx].style.height = tab[indexx - 1].style.height;
          await sleep(1);

          dataAyya[indexx].twil = dataAyya[indexx - 1].twil;

          indexx--;
        }
        tab[startt].style.backgroundColor = startColor;
        tab[endd].style.backgroundColor = endColor;
        tab[startMid].style.backgroundColor = firstColor;

        tab[startt].style.height = valueh;

        dataAyya[startt].twil = value;
        startt++;
        mid++;
        startMid++;
      }
    }
  };

  const reverseSortMerge = async (tab, startt, endd) => {
    if (startt < endd) {
      var m = Math.floor(startt + (endd - startt) / 2);

      await reverseSortMerge(tab, startt, m);
      await reverseSortMerge(tab, m + 1, endd);
      await reverseMerge(tab, startt, m, endd);
    }
  };

  const funnyMerge = async (tab) => {
    await mergeSort(tab, Math.floor(tab.length / 2) + 1, tab.length - 1);
    await reverseSortMerge(tab, 0, Math.floor(tab.length / 2));
    await sleep(1000);
    await reverseSortMerge(tab, 0, tab.length - 1);
  };

  const swap = async (arr, a, b) => {
    let pivotColor = arr[b].style.backgroundColor;
    arr[b].style.backgroundColor = "black";
    await sleep(1);

    // swap height values
    var helper = arr[a].style.height;
    arr[a].style.height = arr[b].style.height;
    arr[b].style.height = helper;
    // swap colors
    await sleep(10);

    arr[b].style.backgroundColor = pivotColor;

    var helpp = dataAyya[a].twil;
    dataAyya[a].twil = dataAyya[b].twil;
    dataAyya[b].twil = helpp;
  };
  const selectionSort = async (tab) => {
    let n = tab.length;

    for (var i = 0; i < n; i++) {
      // Finding the smallest number in the subarray
      let min = i;
      for (var j = i; j < n; j++) {
        if (dataAyya[j].twil > dataAyya[min].twil) {
          min = j;
        }
      }
      if (min != i) {
        // Swapping the elements
        let swapColor = tab[i].style.backgroundColor;
        tab[i].style.backgroundColor = "red";

        await swap(tab, i, min);
        await sleep(100);
        tab[i].style.backgroundColor = swapColor;
      }
    }
  };

  const insertionSort = async (arr) => {
    const length = arr.length;
    console.log(arr);

    for (var i = 1; i < length; i++) {
      console.log(i, "arrr", arr[i].style);
      let compColor = arr[i].style.backgroundColor;
      arr[i].style.backgroundColor = "black";
      let key = parseInt(arr[i].style.height);
      let j = i - 1;
      let he = parseInt(arr[j].style.height);
      console.log(j, "jjjj", arr[j], he);

      while (j > -1 && he > key) {
        let ccc = arr[j + 1].style.backgroundColor;
        arr[j + 1].style.backgroundColor = "red";
        await sleep(2);
        arr[j + 1].style.backgroundColor = ccc;
        await sleep(1);
        dataAyya[j + 1].twil = dataAyya[j].twil;
        arr[j + 1].style.height = arr[j].style.height;

        await sleep(5);
        j = j - 1;
        if (j >= 0) {
          he = parseInt(arr[j].style.height);
        }
      }

      dataAyya[j + 1].twil = key;
      arr[j + 1].style.height = key + "px";
      arr[i].style.backgroundColor = compColor;
    }
  };

  const bubbleSwap = async (arr, a, b) => {
    let bcolor = arr[b].style.backgroundColor;
    arr[b].style.backgroundColor = "black";
    let acolor = arr[a].style.backgroundColor;
    arr[a].style.backgroundColor = "red";

    await sleep(5);

    // swap height values
    var helper = arr[a].style.height;
    arr[a].style.height = arr[b].style.height;
    arr[b].style.height = helper;
    // swap colors
    await sleep(Math.floor(arrLength/20));

    arr[b].style.backgroundColor = bcolor;
    arr[a].style.backgroundColor = acolor;

    var helpp = dataAyya[a].twil;
    dataAyya[a].twil = dataAyya[b].twil;
    dataAyya[b].twil = helpp;
  };
  const bubbleSort = async (arr) => {
    //Length of the array
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        //Swap the numbers
        if (dataAyya[j].twil > dataAyya[j + 1].twil) {
          await bubbleSwap(arr, j, j + 1);
        }
      }
    }
  };
  const handleResize = () => {
    let wid = window.innerWidth;
    setWidth(wid);
    // createBar()
    // console.log(windowWidth,window.innerWidth);
  };
  const createBar = () => {
    if (parseInt(window.innerWidth) <= 750) {
      setBarWidth(`${300 / arrLength}px`);
     
      heightRange[1] = 500;
      createArray();
    } else if (
      parseInt(window.innerWidth) > 750 &&
      parseInt(window.innerWidth) <= 1000
    ) {
      setBarWidth(`${300 / arrLength}px`);
     
      heightRange[1] = 600;
      createArray();
    } else if (
      parseInt(window.innerWidth) > 1000 &&
      parseInt(window.innerWidth) <= 1300
    ) {
      setBarWidth(`${700 / arrLength}px`);
     
      heightRange[1] = 600;
      createArray();
    } else {
      setBarWidth(`${800 / arrLength}px`);
   

      heightRange[1] = 700;

      createArray();
    }
  };
  useEffect(() => {
    if (disbled == false) {
      setWidth(window.innerWidth);
      createBar();
      window.addEventListener("resize", handleResize);
    }
    return () => {
      console.log("clean up");
    };
  }, [barWidth, windowWidth, arrLength]);
  return (
    <Container
      style={{
        padding: "10px",
        width: "100%",
      }}
    >
      <Grid.Row>
        <Button.Group
          color="blue"
        
        >
          <Button
            disabled={disbled}
            onClick={async () => {
              setdisbled(true);
              await mergeSort(refTab, 0, refTab.length - 1);
              setdisbled(false);
            }}
          >
            Merge sort
          </Button>
          <Button
            disabled={disbled}
            onClick={async () => {
              setdisbled(true);

              await funnyMerge(refTab);
              setdisbled(false);
            }}
          >
            have fun with merge
          </Button>
          <Button
            disabled={disbled}
            onClick={async () => {
              setdisbled(true);

              await quickSort(refTab, 0, refTab.length - 1);
              setdisbled(false);
            }}
          >
            QuickSort
          </Button>
          </Button.Group>
          <Button.Group 
          color='red'
          >
          <Button
            disabled={disbled}
            onClick={() => {
              setdisbled(true);

              selectionSort(refTab);
              setdisbled(false);
            }}
          >
            selection sort
          </Button>
          <Button
            disabled={disbled}
            onClick={async () => {
              setdisbled(true);

              await insertionSort(refTab);
              setdisbled(false);
            }}
          >
            insertion sort
          </Button>
          <Button
            disabled={disbled}
            onClick={async () => {
              setdisbled(true);

              await bubbleSort(refTab);
              setdisbled(false);
            }}
          >
            bubbleSort
          </Button>
        </Button.Group>
      </Grid.Row>
      <Grid.Row>
        <Button.Group
        color='green'
        >
          <Button disabled={disbled} onClick={createArray}>
            restart
          </Button>
          <Button
            disabled={disbled}
            content="change color variations"
            icon="plus"
            onClick={() => {
              setColorVarition(colorVariation + 10);
              createArray();
            }}
          ></Button>
          <Button
            disabled={disbled}
            icon
            onClick={() => {
              setColorVarition(colorVariation - 10);
              createArray();
            }}
          >
            <Icon name="minus" />
          </Button>
        </Button.Group>
        <Input
          disabled={disbled}
          type="range"
          min={10}
          max={120}
          value={arrLength}
          onChange={(e) => {
            let m = parseInt(e.target.value);
            setarrLength(m);
          }}
        ></Input>
      </Grid.Row>
      <Container textAlign="center">
        <div className="containerare">
          {dataAyya.map((value, index) => (
            <div
              ref={(ref) => refTab.push(ref)}
              className="bars"
              key={index}
              style={{
                height: `${value.twil}px`,
                backgroundColor: `${value.color}`,
                width: barWidth,
              }}
            ></div>
          ))}
        </div>
      </Container>
    </Container>
  );
};

export default Sorting;
