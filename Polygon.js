function Polygon() {
    this.vertices = [];
    this.edges = [];
    this.drawer = null;
}

Polygon.prototype.addVertex = function (x, y) {
    var currentVertex = new Vertex(x, y);

    // Check if we finished drawing the polygon (min. 3v)
    if (this.vertices.length > 2 && currentVertex.distance(this.vertices[0]) <= currentVertex.r) {
        this.edges.push(new Edge(this.vertices[this.vertices.length - 1], this.vertices[0]));
        return true;
    }
    else{ // Add vertex if not
        this.vertices.push(currentVertex);
    }
    // Add edge
    if (this.vertices.length > 1) {
        this.edges.push(new Edge(this.vertices[this.vertices.length - 2], this.vertices[this.vertices.length - 1]));
    }
    return false;
};

Polygon.prototype.translate = function(x, y){
    this.vertices.forEach(function(o){
        o.translate(x, y);
    });
};

Polygon.prototype.setDrawer = function(drawer){
    this.drawer = drawer;
};

Polygon.prototype.fill = function(){
    if (this.drawer === null)
        return;
    var filling = new Filling(this.drawer, this.edges);
    filling.fill();
};
Polygon.prototype.moveOnArrowKeys = function(){
    if (keyIsDown(LEFT_ARROW))
        this.translate(-2, 0);

    if (keyIsDown(RIGHT_ARROW))
        this.translate(2, 0);

    if (keyIsDown(UP_ARROW))
        this.translate(0, -2);

    if (keyIsDown(DOWN_ARROW))
        this.translate(0, 2);
};

Polygon.prototype.drawFill = function () {
    if(this.drawer !== null)
        this.drawer.draw();
};

Polygon.prototype.draw = function () {
    this.drawVertices();
    this.drawEdges();
};

Polygon.prototype.drawVertices = function () {
    this.vertices.forEach(function(x){
        x.draw()
    });
};

Polygon.prototype.drawEdges = function () {
    this.edges.forEach(function(x){
        x.draw()
    });
};
