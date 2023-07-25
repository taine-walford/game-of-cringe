interface Cell {
    x: number
    y: number
    state: "on" | "off" | "asleep"
}

let cv: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: ImageData
let cells: number[] = []
let cellSize: number = 2

let colorD = [17, 17, 17, 255]
let colorM = [50, 50, 50, 255]
let colorT = [0, 255, 150, 255]

window.onload = function () {
    console.log("loaded")
    let body: HTMLElement = document.querySelector("body")!
    cv = document.createElement("canvas")
    cv.width = 1280
    cv.height = 720
    body.appendChild(cv)
    ctx = cv.getContext("2d")!
    img = ctx.createImageData(cv.width, cv.height)

    // draw background
    render()
}

function render() {
    console.log("render")
    drawCellArray()
}

function drawCellArray() {
    console.log("drawCellArray")
    let t: number = performance.now()
    let x: number, y: number
    for (x = 1; x < cv.width; x += cellSize + 1) {
        for (y = 1; y < cv.height; y += cellSize + 1) {
            let cell: Cell = { x, y, state: "off" }
            drawCell(cell)
        }
    }
    console.log(performance.now() - t)
    ctx.putImageData(img, 0, 0)
}

function drawCell(cell: Cell) {
    for (let coordX = cell.x; coordX < cell.x + cellSize; coordX++) {
        for (let coordY = cell.y; coordY < cell.y + cellSize; coordY++) {
            drawPixel(coordX, coordY, cell.state == "on" ? colorT : colorM, img)
        }
    }
}

function drawPixel(x, y, color, { data }) {
    let roundedX = Math.floor(x)
    let roundedY = Math.floor(y)
    let index = 4 * (cv.width * roundedY + roundedX)
    data[index + 0] = color[0]
    data[index + 1] = color[1]
    data[index + 2] = color[2]
    data[index + 3] = color[3]
}
