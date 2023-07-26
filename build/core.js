console.log('core loaded');
export function createCanvas(x, y) {
    var canvas = document.createElement("canvas");
    canvas.width = x;
    canvas.height = y;
    return canvas;
}
