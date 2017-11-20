var s = new Scene();

DEFAULT_VECTOR = 1;
SPHERE_LIGHT = VECTOR_MAP = HEIGHT_MAP = 2;

function setup(){
    frameRate(10);

    var dummy = new Polygon();
    dummy.addVertex(80, 300);
    dummy.addVertex(200, 350);
    dummy.addVertex(40, 600);
    dummy.addVertex(900, 400);
    dummy.addVertex(300, 330);
    dummy.addVertex(80, 300);
    s.polygons.push(dummy);
    console.log(s.polygons);

    var width = 1400;
    var height = 700;
    var uiHeight = 720;
    var uiHeight2 = uiHeight + 50;
    var uiHeight3 = uiHeight2 + 50;
    var uiHeight4 = uiHeight3 + 50;

    var canvas = createCanvas(1400, 700);
    var img = null;
    var normalMap = null;
    var heightMap = null;
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
                s.setDrawer(new ImageDrawer(img, canvas));
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
        s.setDrawer(new ColorDrawer(c, canvas));
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
    normalMapRadio.value(1);
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
    lightSphereRadio.value(1);
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
    heightMapRadio.value(1);
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

