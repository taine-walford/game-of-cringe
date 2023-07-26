import * as core from "./core.js"

console.log("main loaded ")

interface Cell {
    x: number
    y: number
    state: "on" | "off" | "asleep"
}

function main() {
    const bodyElement: HTMLBodyElement = document.querySelector("body")!
    const canvas: HTMLCanvasElement = core.createCanvas(1280, 720)
    bodyElement.appendChild(canvas)

    const context: CanvasRenderingContext2D = canvas.getContext("2d")!
    let image: ImageData = context.getImageData(0, 0, 1280, 720)

    const config = {
        cellSize: 1,
        colours: {
            on: [0, 255, 160, 255],
            off: [50, 40, 50, 255],
            asleep: [50, 100, 70, 255],
        },
        canvas,
        context,
        image,
    }

    let t = performance.now()
    image = drawGrid(2, 1, config.colours.off, image)
    context.putImageData(image, 0, 0)
    console.log(performance.now() - t + "ms")
    // animate()
}

function animate() {
    requestAnimationFrame(animate)
}

function simulate() {}

function drawGrid(cellSize: number, borderSize: number, color: number[], image: ImageData) {
    let result = image
    const maxWidth = Math.floor(image.width / (cellSize + borderSize)) * (cellSize + borderSize)
    const maxHeight = Math.floor(image.height / (cellSize + borderSize)) * (cellSize + borderSize)
    for (let ordX = borderSize; ordX < maxWidth; ordX += cellSize + borderSize) {
        for (let ordY = borderSize; ordY < maxHeight; ordY += cellSize + borderSize) {
            result = core.fillRect(ordX, ordY, cellSize, cellSize, color, result)
        }
    }
    return result
}

window.onload = main
