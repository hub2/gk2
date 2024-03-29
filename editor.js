var s = new Scene();

DEFAULT_VECTOR = 1;
SPHERE_LIGHT = VECTOR_MAP = HEIGHT_MAP = 2;
var TEXTURER = 'textura.jpg';
var HEIGHTMAP = 'brick_heightmap.png';
var NORMALMAP = 'brick_normalmap.png';
function setup(){
    frameRate(10);

    var dummy = new Polygon();
    dummy.addVertex(80, 300);
    dummy.addVertex(200, 350);
    dummy.addVertex(40, 600);
    dummy.addVertex(900, 600);
    dummy.addVertex(1200, 20);
    dummy.addVertex(80, 300);
    s.polygons.push(dummy);

    var dummy2 = new Polygon();
    dummy2.addVertex(100, 350);
    dummy2.addVertex(300, 45);
    dummy2.addVertex(500, 200);
    dummy2.addVertex(20, 450);
    dummy2.addVertex(90, 30);
    dummy2.addVertex(100, 350);
    s.polygons.push(dummy2);


    var width = 1400;
    var height = 700;
    var uiHeight = 720;
    var uiHeight2 = uiHeight + 50;
    var uiHeight3 = uiHeight2 + 50;
    var uiHeight4 = uiHeight3 + 50;

    var canvas = createCanvas(1400, 700);
    var img = new Image();
    img.onload = function(){
        s.setDrawer(new ImageDrawer(this, canvas));
        s.setSphereLight();
    };
    img.src = TEXTURER;
    console.log(HEIGHTMAP);
    var normalMap = new Image();
    normalMap.onload = function(){
        s.setNormalMap(this);
    }
    normalMap.src = NORMALMAP;
    var heightMap = new Image();
    heightMap.onload = function(){
        s.setHeightMap(this);
    }
    heightMap.src = HEIGHTMAP;


    canvas.parent('polygon-editor');
    canvas.mouseReleased(canvasMouseReleased);
    canvas.mousePressed(canvasMousePressed);
    canvas.mouseMoved(canvasMouseDragged);

    button = createButton('Usuń wielokąty');
    button.class("btn btn-danger");
    button.position(10, uiHeight);
    button.mousePressed(function(){
        s.removePolygons();
    });

    button = createButton('Stwórz wielokąt');
    button.class("btn btn-success");
    button.position(150, uiHeight);
    button.mousePressed(function(){
        s.startDrawingNewPolygon();
    });

    button = createButton("Wypełnij teksturą");
    button.class("btn btn-success");
    button.position(10, uiHeight2);
    button.mousePressed(function(){
        if (img !== null)
        {
            if (img.complete)
            {
                if (s.drawer !== null)
                {
                    var oldHeightMap = s.drawer.heightMap;
                    var oldNormalMap = s.drawer.nPrim;
                }
                s.setDrawer(new ImageDrawer(img, canvas));
                s.drawer.heightMap = oldHeightMap;
                s.drawer.nPrim = oldNormalMap;
            }
            else
                alert("przetwarzam obrazek, spróbuj za chwilę...");
        }

    });
    fileInput = createFileInput(function(file){
        img = new Image();
        img.src = file.data;
    });
    fileInput.position(150, uiHeight2);

    button = createButton('Wypełnij kolorem');
    button.class("btn btn-success");
    button.position(400, uiHeight2);
    button.mousePressed(function(){
        var c = color(colourInput.value());
        console.log(c);

        if (s.drawer !== null)
        {
            var oldHeightMap = s.drawer.heightMap;
            var oldNormalMap = s.drawer.nPrim;
        }
        s.setDrawer(new ColorDrawer(c, canvas));
        s.drawer.heightMap = oldHeightMap;
        s.drawer.nPrim = oldNormalMap;
    });

    var colourInput = createInput('#fffff0');
    colourInput.position(540, uiHeight2);

    button = createButton('Zmień normalmap');
    button.class("btn btn-success");
    button.position(10, uiHeight3);
    button.mousePressed(function(){
        if (normalMapRadio.value() == DEFAULT_VECTOR)
        {
            s.unSetNormalMap();
        }
        else if(normalMapRadio.value() == VECTOR_MAP)
        {
            if (normalMap.complete)
                s.setNormalMap(normalMap);
            else
                alert("przetwarzam mape, spróbuj za chwilę...");

        }
    });

    fileInput = createFileInput(function(file){
        normalMap = new Image();
        normalMap.src = file.data;
    });
    fileInput.position(150, uiHeight3);

    var normalMapRadio = createRadio();
    normalMapRadio.option("[0, 0, 1]", DEFAULT_VECTOR);
    normalMapRadio.option("Wybrany normalMap", VECTOR_MAP);
    normalMapRadio.value(2);
    normalMapRadio.position(440, uiHeight3);

    button = createButton('Zmień światło');
    button.class("btn btn-success");
    button.position(710, uiHeight3);
    button.mousePressed(function(){
        if (lightSphereRadio.value() == DEFAULT_VECTOR)
        {
            s.unSetSphereLight();
        }
        else if(lightSphereRadio.value() == SPHERE_LIGHT)
        {
            s.setSphereLight();
        }
    });

    var lightSphereRadio = createRadio();
    lightSphereRadio.option("[0, 0, 1]", DEFAULT_VECTOR);
    lightSphereRadio.option("Światło animowane", SPHERE_LIGHT);
    lightSphereRadio.value(2);
    lightSphereRadio.position(840, uiHeight3);


    button = createButton('Zmień zaburzenie');
    button.class("btn btn-success");
    button.position(10, uiHeight4);
    button.mousePressed(function(){
        if (heightMapRadio.value() == DEFAULT_VECTOR)
        {
            s.unSetHeightMap();
        }
        else if(heightMapRadio.value() == HEIGHT_MAP)
        {
            if (heightMap.complete)
                s.setHeightMap(heightMap);
            else
                alert("przetwarzam mape, spróbuj za chwilę...");
        }
    });

    fileInput = createFileInput(function(file){
        heightMap = new Image();
        heightMap.src = file.data;
    });

    fileInput.position(150, uiHeight4);
    var heightMapRadio = createRadio();
    heightMapRadio.option("[0, 0, 0]", DEFAULT_VECTOR);
    heightMapRadio.option("Wybrany HeightMap", HEIGHT_MAP);
    heightMapRadio.value(2);
    heightMapRadio.position(400, uiHeight4);

    button = createButton('Zmień kolor światła');
    button.class("btn btn-success");
    button.position(710, uiHeight4);
    button.mousePressed(function(){
        var c = color(lightColorInput.value());
        s.setLightColor(c);
    });

    var lightColorInput = createInput('#ffffff');
    lightColorInput.position(890, uiHeight4);

    button = createButton('Zmień f');
    button.class("btn btn-success");
    button.position(780, uiHeight2);
    button.mousePressed(function(){
        if (s.drawer !== null){
            s.drawer.f = parseFloat(fInput.value());
        }
    });

    var fInput = createInput('0.2');
    fInput.position(920, uiHeight2);
}

function draw(){
    background(211, 211, 211);
    s.handleArrowKeys();
    s.reFill();
    s.draw();
}

function canvasMouseReleased() {
    s.mouseReleased(mouseButton, mouseX, mouseY);
}

function canvasMousePressed() {
    s.mousePressed(mouseButton, mouseX, mouseY);
}

function canvasMouseDragged() {
    s.mouseDragged(mouseButton, mouseX, mouseY);
}

