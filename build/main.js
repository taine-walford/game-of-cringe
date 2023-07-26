import * as core from './core.js';
console.log('main loaded ');
function main() {
    var bodyElement = document.querySelector('body');
    var canvas = core.createCanvas(1280, 720);
    bodyElement.appendChild(canvas);
    var context = canvas.getContext('2d');
    var image = context.getImageData(0, 0, 1280, 720);
    var state = {
        cellSize: 1,
        onColour: [0, 255, 160, 255],
        offColour: [0, 255, 160, 255],
        asleepColour: [50, 100, 70, 255],
        canvas: canvas,
        context: context,
        image: image,
    };
    animate();
}
function animate() {
    requestAnimationFrame(animate);
}
function simulate() {
}
window.onload = main;
