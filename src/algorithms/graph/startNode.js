export  class StarNode {
  constructor(name, parent, f=0, g=0, h=0) {
    this.name = name;
    this.parent = parent;
    this.f = f;
    this.g = g;
    this.h = h;
  }
}
