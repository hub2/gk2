function Scene(){
    this.polygons = [];
    this.drawing = false;
    this.currentDrawingPolygon = null;
    this.drawer = null;
}

Scene.prototype.setDrawer = function(drawer){
    this.drawer = drawer;
    this.polygons.forEach(function(currentPolygon){
        currentPolygon.setDrawer(drawer);
    });
};

Scene.prototype.setLightColor= function(color) {
    if (this.drawer !== null)
    {
        var r = color.levels[0].map(0, 255, -1, 1);
        var g = color.levels[1].map(0, 255, -1, 1);
        var b = color.levels[2].map(0, 255, -1, 1);
        this.drawer.iL = [r,g,b];
    }
};

Scene.prototype.setHeightMap = function(heightMap) {
    if (this.drawer !== null)
        this.drawer.setHeightMap(heightMap);
};

Scene.prototype.unSetHeightMap = function() {
    if (this.drawer !== null)
        this.drawer.unSetHeightMap();
};

Scene.prototype.setSphereLight = function() {
    if (this.drawer !== null)
        this.drawer.setSphereLight();
};

Scene.prototype.unSetSphereLight = function() {
    if (this.drawer !== null)
        this.drawer.unSetSphereLight();
};

Scene.prototype.setNormalMap = function(normalMap) {
    if (this.drawer !== null)
        this.drawer.setNormalMap(normalMap);
};

Scene.prototype.unSetNormalMap = function() {
    if (this.drawer !== null)
        this.drawer.unSetNormalMap();
};


Scene.prototype.mousePressed = function(mouseButton, mouseX, mouseY){
    if (mouseButton == LEFT) {
        if (!this.drawing) {
            this.polygons.forEach(function(currentPolygon){
                currentPolygon.vertices.some(function (x) {
                    return x.mousePressed();
                });
            });
        }
    }


};

Scene.prototype.mouseReleased = function(mouseButton, mouseX, mouseY){
    if (mouseButton == LEFT){
        // Creating polygon
        if (this.drawing) {
            if (this.currentDrawingPolygon.addVertex(mouseX, mouseY)) // if true we finished drawing
                this.stopDrawingNewPolygon();
        }
        // Other actions
        else{
            this.polygons.forEach(function(currentPolygon){
                currentPolygon.vertices.some(function(x){
                    return x.mouseReleased();
                });
            });
        }
    }
};

Scene.prototype.mouseDragged = function(mouseButton, mouseX, mouseY){
    if (mouseButton == LEFT) {
        if (!this.drawing) {
            this.polygons.forEach(function(currentPolygon){
                currentPolygon.vertices.some(function(x){return x.mouseDragged();});
            });
        }
    }

};

Scene.prototype.draw = function(){
    this.polygons.forEach(function(currentPolygon){
        currentPolygon.drawFill();
    });
    this.polygons.forEach(function(currentPolygon){
        currentPolygon.draw();
    });
};

Scene.prototype.reFill = function(){
    if (this.drawer !== null)
        this.drawer.reset();
    this.polygons.forEach(function(currentPolygon){
        if (!(this.drawing && this.currentDrawingPolygon === currentPolygon))
            currentPolygon.fill();
    });
};

Scene.prototype.removePolygons = function(){
    this.polygons = [];
};

Scene.prototype.handleArrowKeys = function(){
    this.polygons.forEach(function(currentPolygon){
        currentPolygon.moveOnArrowKeys();
    });
};

Scene.prototype.startDrawingNewPolygon = function(){
    this.drawing = true;
    this.currentDrawingPolygon = new Polygon();
    this.polygons.push(this.currentDrawingPolygon);
};


Scene.prototype.stopDrawingNewPolygon = function(){
    this.drawing = false;
    this.currentDrawingPolygon = null;
    if (this.drawer !== null)
    {
        this.setDrawer(this.drawer);
    }
    console.log(this.polygons);
};


