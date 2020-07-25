class Graph {
  constructor(noOfVertices = 0) {
    this.noOfVertices = noOfVertices;
    this.adjList = new Map();
  }

  setnoOfVertices(noOfVertices) {
    this.noOfVertices = noOfVertices;
  }

  constructMap(rows, columns) {
    var x, y;
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        this.adjList.set(`${i}+${j}`, []);
        if (j - 1 >= 0) {
          this.adjList.get(`${i}+${j}`).push(`${i }+${j-1}`);
        }

        if (i + 1 <rows) {
          this.adjList.get(`${i}+${j}`).push(`${i + 1}+${j}`);
        }
        if (j + 1 < columns) {
          this.adjList.get(`${i}+${j}`).push(`${i }+${j+1}`);
        }

        if (i -1 >= 0) {
          this.adjList.get(`${i}+${j}`).push(`${i - 1}+${j}`);
        }



        /*
        if ( i === 0 && j===0 ){
        this.addEdge.set(`${i}+${j}`, [`${i+1}+${j}`,`${i}+${j+1}`] ) 
      }
      else if ( i=== 0 && j=== columns-1 ) {
        this.addEdge.set(`${i}+${j}`, [`${i+1}+${j}`,`${i}+${j-1}`] ) 

      }
      else if ( i=== rows-1 && j=== 0 ) {
        this.addEdge.set(`${i}+${j}`, [`${i-1}+${j}`,`${i}+${j+1}`] ) 

      }
      else if ( i=== rows-1 && j=== columns-1 ) {
        this.addEdge.set(`${i}+${j}`, [`${i-1}+${j}`,`${i}+${j-1}`] ) 

      }*/
      }
    }
  }
  // add a vertex ( sommet ) to the graph
  addVertex(v) {
    if (!this.adjList.has(v)) this.adjList.set(v, []);
  }
  // add edge to the graph
  addEdge(source, destination) {
    if (this.adjList.has(source) && this.adjList.has(destination)) {
      let arr = this.adjList.get(source);
      if (!arr.includes(destination)) {
        this.adjList.get(source).push(destination);
        // the graph is undirected
        this.adjList.get(destination).push(source);
      }
    }
  }

  bfs(startpoint, endpoint) {
    console.log(startpoint     ,endpoint )
   

    const visited = new Array();
    const mystack = Array();
    const parentMap = new Map();

    mystack.push(startpoint);
    visited.push(startpoint);

    while (mystack.length != 0) {
      var current = mystack.pop();
      if (current == endpoint)  return parentMap;
      var currentNeighbors = this.adjList.get(current);


        


      for ( var i = 0 ; i<currentNeighbors.length ;  i ++ ) {
        let node = currentNeighbors[i]
        if (visited.indexOf(node) == -1) {
          console.log(node)
          visited.push(node);
          parentMap.set(current, node);
          mystack.push(node);
        }
      }
    }
  }
  deleteVertex(v) {
    if (this.adjList.has(v)) {
      this.adjList.delete(v);
     for (var [key , value ] of this.adjList.entries()){
     console.log(key , value)
     let arr = this.adjList.get(key);
     if (arr.includes(v)) {
       this.adjList.get(key).slice(arr.indexOf(v),1);

    }
    console.log(this.adjList)
  }
  }
}

  print() {
  console.log(this.adjList)
  }
}

const MyGraph = new Graph();

export default MyGraph;
