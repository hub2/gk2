function Edge(v1, v2){
    this.v1 = v1;
    this.v2 = v2;
}

Edge.prototype.draw = function(){
    MyLine(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
};


