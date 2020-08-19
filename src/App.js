import React from "react";
import SelectionSort from "./algorithms/sortAlgos/selectionSort";
import MyMap from "./algorithms/graph/mymap";
import MyHeap from "./algorithms/heapmap/myheap";

import "semantic-ui-css/semantic.min.css";
//import './maincss.css'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sorting from "./algorithms/sortAlgos/sorting";
import { Navbar } from "./web/navbar/navbar";
import HomepageLayout, { Home } from "./web/home/home";
function App() {
  return (
    <Router>
      <Navbar></Navbar>

      {/*
         A <Switch> looks through all its children <Route>
         elements and renders the first one whose path
         matches the current URL. Use a <Switch> any time
         you have multiple routes, but you want only one
         of them to render at a time
       */}

      <Switch>
        <Route exact path="/">
          <HomepageLayout />
        </Route>

        <Route exact path="/sort">
          <SelectionSort />
        </Route>
        <Route exact path="/sortv2">
          <Sorting />
        </Route>
        <Route exact path="/map">
          <MyMap />
        </Route>
        <Route exact path="/heap">
          <MyHeap />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
