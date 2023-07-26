import * as core from './core.js'

console.log('main loaded ')

interface Cell {
    x: number,
    y: number,
    state: "on" | "off" | "asleep"
}

function main () {
    const bodyElement: HTMLBodyElement = document.querySelector('body')!
    const canvas: HTMLCanvasElement = core.createCanvas(1280, 720)
    bodyElement.appendChild(canvas)

    const context: CanvasRenderingContext2D = canvas.getContext('2d')!
    const image: ImageData = context.getImageData(0, 0, 1280, 720)

    const state = {
        cellSize: 1,
        onColour: [0, 255, 160, 255],
        offColour: [0, 255, 160, 255],
        asleepColour: [50, 100, 70, 255],
        canvas,
        context,
        image,
    }

    animate()
}

function animate () {

    requestAnimationFrame(animate)
}

function simulate () {

}

window.onload = main