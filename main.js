var cv, ctx, img;
var cells = [];
var cellSize = 2;
var colorD = [17, 17, 17, 255];
var colorM = [50, 50, 50, 255];
var colorT = [0, 255, 150, 255];
window.onload = function () {
    console.log("loaded");
    var body = document.querySelector("body");
    cv = document.createElement("canvas");
    cv.width = 1280;
    cv.height = 720;
    body.appendChild(cv);
    ctx = cv.getContext("2d");
    img = ctx.createImageData(cv.width, cv.height);
    // draw background
    render();
};
function render() {
    console.log("render");
    drawCellArray();
}
function drawCellArray() {
    console.log("drawCellArray");
    var t = performance.now();
    var x, y;
    for (x = 1; x < cv.width; x += cellSize + 1) {
        for (y = 1; y < cv.height; y += cellSize + 1) {
            var cell = { x: x, y: y, state: "off" };
            drawCell(cell);
        }
    }
    console.log(performance.now() - t);
    ctx.putImageData(img, 0, 0);
}
function drawCell(cell) {
    for (var coordX = cell.x; coordX < cell.x + cellSize; coordX++) {
        for (var coordY = cell.y; coordY < cell.y + cellSize; coordY++) {
            drawPixel(coordX, coordY, cell.state == "on" ? colorT : colorM, img);
        }
    }
}
function drawPixel(x, y, color, _a) {
    var data = _a.data;
    var roundedX = Math.floor(x);
    var roundedY = Math.floor(y);
    var index = 4 * (cv.width * roundedY + roundedX);
    data[index + 0] = color[0];
    data[index + 1] = color[1];
    data[index + 2] = color[2];
    data[index + 3] = color[3];
}
