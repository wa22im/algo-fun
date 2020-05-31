class Graph {



    constructor(noOfVertices){

        this.noOfVertices = noOfVertices ; 
        this.adjList = new Map()
    }

    // add a vertex ( sommet ) to the graph
    addVertex(v){
        if ( !this.adjList.has(v))
        this.adjList.set(v,[])
    }
    // add edge to the graph 
    addEdge ( source ,destination ){

        if ( this.adjList.has(source) && this.adjList.has(destination)){

        let arr = this.adjList.get(source) 
        if ( !arr.includes(destination)){
        this.adjList.get(source).push(destination)
        // the graph is undirected 
        this.adjList.get(destination).push(source)

        }

    }

}

print() {
    for (let [key, value] of this.AdjList) {
      console.log(key, value);
    }
  }

    
}