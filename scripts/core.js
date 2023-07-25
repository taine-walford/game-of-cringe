"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCanvas = void 0;
function createCanvas(x, y) {
    var canvas = document.createElement("canvas");
    canvas.width = x;
    canvas.height = y;
    return canvas;
}
exports.createCanvas = createCanvas;
