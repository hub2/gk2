function Vertex(x,y){
    this.x = x;
    this.y = y;
    this.r = 20;
    this.dragged = false;
}

Vertex.prototype.draw = function(){
    fill(40);
    ellipse(this.x, this.y, this.r);
    fill(255);
};

Vertex.prototype.equals = function(o){
    return o.x == this.x && o.y == this.y;
};

Vertex.prototype.distance = function(o){
    return dist(this.x, this.y, o.x, o.y);
};

Vertex.prototype.translate = function(x, y){
    this.x += x;
    this.y += y;
};

Vertex.prototype.mousePressed = function(){
    if (dist(this.x, this.y, mouseX, mouseY) <= this.r)
    {
        this.dragged = true;
        return true;
    }
    return false;
};


Vertex.prototype.mouseDragged = function(){
    if (this.dragged)
    {
        this.x = mouseX;
        this.y = mouseY;
        return true;
    }
    return false;
};


Vertex.prototype.mouseReleased = function(){
    if(this.dragged)
    {
        this.dragged = false;
        return true;
    }
    return false;
};
