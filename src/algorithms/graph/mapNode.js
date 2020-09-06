class MapNode {
  constructor(
    row,
    column,
    NUMCOLUMNS,
    NUMROWS,

    firstNode = false,
    endNode = false,
    isWall = false,
    istopPoint = false,
    islack = false,
    isPickPoint = false,
    isPath=false,
  ) {
    this.ref = null;
    this.column = column;
    this.row = row;
    this.name = row + "+" + column;
    this.NUMROWS = NUMROWS;
    this.NUMCOLUMNS = NUMCOLUMNS;
    this.firstNode = firstNode;
    this.endNode = endNode;
    this.isWall = isWall;
    this.istopPoint = istopPoint;
    this.jirani = [];
    this.adjList = {};
    this.islack = islack;
    this.isPickPoint=isPickPoint;
    this.isPath=isPath
    // setting neibghors and adjency list

    let adjweghit = {};
        if (this.row - 1 >= 0) {
      this.jirani.push(`${this.row - 1}+${this.column}`);
      if (this.islack) adjweghit[`${this.row - 1}+${this.column}`] = 5;
      else adjweghit[`${this.row - 1}+${this.column}`] = 1;
    }
   
    if (this.column + 1 < NUMCOLUMNS) {
      this.jirani.push(`${this.row}+${this.column + 1}`);
      if (this.islack) adjweghit[`${this.row}+${this.column + 1}`] = 5;
      else adjweghit[`${this.row}+${this.column + 1}`] = 1;
    }

    if (this.row + 1 < NUMROWS) {
      this.jirani.push(`${this.row + 1}+${this.column}`);
      if (this.islack) adjweghit[`${this.row + 1}+${this.column}`] = 5;
      else adjweghit[`${this.row + 1}+${this.column}`] = 1;
    }

   
    if (this.column - 1 >= 0) {
      this.jirani.push(`${this.row}+${this.column - 1}`);
      if (this.islack) adjweghit[`${this.row}+${this.column - 1}`] = 5;
      else adjweghit[`${this.row}+${this.column - 1}`] = 1;
    }
    this.adjList = adjweghit;
  }
}

export default MapNode;
