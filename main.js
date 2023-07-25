let cv, ctx, img
let cells = []
let cellSize = 2

let colorD = [17,  17,  17, 255]
let colorM = [50,  50,  50, 255]
let colorT = [ 0, 255, 150, 255]

window.onload = () => {
    console.log('loaded')
    cv = document.getElementById("render");
    ctx = cv.getContext("2d");
    img = ctx.createImageData(cv.width, cv.height);
    console.log(img.data)

    // draw background
    render()
}

const render = () => {
    console.log('render')
    drawCellArray()
}

const drawCellArray = () => {
    console.log('drawCellArray')
    t = performance.now()
    for(let x = 1; x < cv.width; x+=(cellSize + 1)) {
        for(let y = 1; y < cv.height; y+=(cellSize + 1)) {
            drawCell({x, y, state: 'dead'})
        }
    }
    console.log(performance.now() - t)
    ctx.putImageData(img, 0, 0)
}

const drawCell = ({x, y, state}) => {
    for(let coordX = x; coordX < x+cellSize; coordX++) {
        for(let coordY = y; coordY < y+cellSize; coordY++) {
            drawPixel(coordX, coordY, state == 'live'? colorT : colorM, img)
        }
    }
}

const drawPixel = (x, y, color, {data}) => {
    let roundedX = Math.floor(x)
    let roundedY = Math.floor(y)
    let index = 4 * (cv.width * roundedY + roundedX)
    data[index + 0] = color[0]
    data[index + 1] = color[1]
    data[index + 2] = color[2]
    data[index + 3] = color[3]
}