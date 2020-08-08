import React from 'react';
import SelectionSort from './algorithms/selectionSort'
import MyMap from './algorithms/graph/mymap'
import MyHeap from './algorithms/heapmap/myheap'
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (


 
    <Router>

       {/*
         A <Switch> looks through all its children <Route>
         elements and renders the first one whose path
         matches the current URL. Use a <Switch> any time
         you have multiple routes, but you want only one
         of them to render at a time
       */}
       <Switch>
        
         <Route exact path="/sort" >
           <SelectionSort />
         </Route>
         <Route exact path="/map" >
           <MyMap />
         </Route>
         <Route exact path = "/heap">
           <MyHeap/>
         </Route>
       
       </Switch>
   </Router>
  );
}

export default App;
