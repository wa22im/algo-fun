class Node {
  constructor(name, parent, distance) {
    this.name = name;
    this.parent = parent;
    this.distance = distance;
    let m = name.split('+')
    this.row = m[0];
    this.column = m[1]
  }
}
export default Node;
