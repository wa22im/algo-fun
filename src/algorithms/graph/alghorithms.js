import { StarNode } from "./startNode";

const { default: Node } = require("./node");
const { default: Heap } = require("heap-js");
export const dj = (graph, ss, endd) => {
  if (!ss || !endd || !graph) return;
  const comp = (a, b) => {
    return a.distance - b.distance;
  };
  const prioq = new Heap(comp);
  prioq.init([]);
  let notfound = true;
  let current = new Node(ss, null, 0);
  prioq.push(current);
  const returnedPath = [];

  let nodesinque = new Map();
  let theway = [];
  nodesinque.set(ss, 0);

  //
  let currentNode;
  while (notfound && prioq.size() > 0) {
    currentNode = prioq.pop();
    if (!currentNode) {
      return [];
    }
    theway.push(currentNode);

    returnedPath.push(currentNode.name);
    nodesinque.delete(currentNode.name);
    if (currentNode.name == endd) {
      
      let shortestpath = [];
  
      findparent(theway, currentNode, shortestpath);
      return [shortestpath, returnedPath];
      };
    let adj = graph.get(currentNode.name).adjList;
    for (const [key, val] of Object.entries(adj)) {
      console.log(val)
      let m = new Node(key, currentNode.name, val + currentNode.distance);
      if (graph.get(m.name).isWall) continue;
      if (
        theway.findIndex((vall) => {
          return vall.name == key;
        }) != -1
      )
        continue;
      if (nodesinque.has(key)) {
        if (nodesinque.get(key) > val + currentNode.distance) {
          theway = [...theway.filter((heapnodes) => heapnodes.name != m.name)];
          prioq.init([
            ...prioq.heapArray.filter((heapnodes) => heapnodes.name != m.name),
          ]);
        }
      }

      prioq.push(m);

      nodesinque.set(m.name, m.distance);
      theway.push(m);
      returnedPath.push(m.name);
    }
  }
  return[[],[]]
 
};

export const Astar = (graph, start, endd) => {
  const startNode = new StarNode(start, null, 0, 0, 0);
  //const endNode = new StarNode(endd , )

  const comp = (a, b) => {
    return a.f - b.f;
  };
  const openList = new Heap(comp);
  const closedList = [];

  openList.push(startNode);

  let currentNode;
  let count = 0
  while (openList.heapArray.length > 0 && count<graph.size *4) {
    currentNode = openList.pop();
    closedList.push(currentNode);
    if (currentNode.name == endd) {
      let path = [];

      findparent(closedList, currentNode, path);

      return [path, closedList];
    }
    let adj = graph.get(currentNode.name).adjList;
    for (const [key, val] of Object.entries(adj)) {
      let exists = true

      if (closedList.findIndex((n) => n.name == key) != -1) {
    
        exists =false
        continue;
      }
      if (graph.get(key).isWall) continue;
      let child = new StarNode(key, currentNode.name);
      child.g = currentNode.g + val;
      child.h = calculateH(child.name, endd);
      child.f = child.g + child.h;
      for (var i = 0; i < openList.heapArray.length; i++) {
        if (child.name == openList.heapArray[i].name) {
          if (child.g < openList.heapArray[i].g) {
            openList.heapArray.splice(i, 1);
            openList.push(child);
          }
          continue;
        }
      }
      if (exists)
      openList.push(child);
    }
    count ++;
  }
  return ([] , closedList);
};

function calculateH(nodee, enddNode) {
  let m = nodee.split("+");
  let rowNodee = parseInt(m[0]);

  let columnNodee = parseInt(m[1]);
  m = enddNode.split("+");
  let rowEnd = parseInt(m[0]);
  let colEnd = parseInt(m[1]);

  return Math.floor(
    Math.abs(rowNodee - rowEnd) + Math.abs(columnNodee - colEnd)
  );
}
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

export const bfs = ( gridMap , startt , endpoint )=>{
  const visited =[];
  const queue = [];
  const path = []
  visited.push(startt)
  queue.push(startt)  
  while(queue.length>0){
    let current = queue.shift()// dequeue
    if ( current==endpoint) return path ; 
    path.unshift(current)
    let neibghours = gridMap.get(current).jirani ;
    console.log(current , neibghours )
    
      for ( var i =0 ; i<=neibghours.length-1 ; i++){
        let val = neibghours[i]
        if (gridMap.get(val).isWall)
        continue ;
        console.log(val)
        if  ( visited.indexOf(val)==-1){
        visited.push(val );
        queue.push(val) // enqueue
      }
    }  
  }
  return [] ; 
}



export const dfs = ( gridMap , startt , endpoint )=>{
 const stack = [] ; 
 const visited =[ ] ; 
 const path = []; 
 stack.push(startt) ; 
 visited.push(startt)
 while(stack.length>0){
   let current = stack.pop()
   path.push(current)
   if ( current == endpoint) return path  ; 
   let adjList = gridMap.get(current).jirani
   visited.push(current)

   for ( var i=adjList.length-1  ; i>=0 ;i--){
    let val = adjList[i]
    if (gridMap.get(val).isWall)
    continue ;
     if ( visited.indexOf(val)==-1){  
       stack.push(val)
       visited.push(current)


     }
   }

 }

  return [] ; 
}