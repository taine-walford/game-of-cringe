let bg = null
let bgctx = null

let fg = null
let fgctx = null

let bgImage
let bgData

let fgImage
let fgData

const resX = 320 * 4
const resY = 180 * 4

const colorBG = [60, 25, 65, 255]
const colorBGL = [45, 5, 50, 255]
const colorFG = [175, 235, 255, 255]
const colorFGX = [75, 135, 155, 255]
const transparent = [0, 0, 0, 0]

activePoints = {}

window.onload = () => {
    bg = document.querySelector('canvas#bg')
    bgctx = bg.getContext('2d')
    fg = document.querySelector('canvas#fg')
    fgctx = fg.getContext('2d')

    bgctx.mozImageSmoothingEnabled = false;
    bgctx.webkitImageSmoothingEnabled = false;
    fgctx.mozImageSmoothingEnabled = false;
    fgctx.webkitImageSmoothingEnabled = false;

    bgImage = bgctx.createImageData(resX, resY);
    fgImage = fgctx.createImageData(resX, resY);
    drawBG()
    bgctx.putImageData(bgImage, 0, 0);
    
    // fg.onclick = clickHandler
    // // gameLoop()

    // console.log(fgImage.data);

    // stepButton = document.querySelector('button#step')
    // stepButton.onclick = stepHandler
}

const drawBG = () => {
    for (let x = 0; x < resX; x+=4) {
        for (let y = 0; y < resY; y+=4) {
            coordX = x - 2
            coordY = y - 2
            if ((x % 8) == 0 || (y % 8) == 0)
                drawBlock(coordX, coordY, colorBGL, bgImage.data)
            else 
                drawBlock(coordX, coordY, colorBG, bgImage.data)
        }
    }
}

// for (let x = 0; x < resX; x+=2) {
//     for (let y = 0; y < resY; y+=2) {
//         drawPixel(x, y, colorFG, bgImage.data)
//     }
// }

function drawPixel (x, y, color, data) {
    let roundedX = Math.round(x);
    let roundedY = Math.round(y);
    let index = 4 * (resX * roundedY + roundedX);
    data[index + 0] = color[0];
    data[index + 1] = color[1];
    data[index + 2] = color[2];
    data[index + 3] = color[3];
}

function drawBlock(x, y, color, data) {
    for (let xOffset = x; xOffset < x+4; xOffset++) {
        for (let yOffset = y; yOffset < y+4; yOffset++) {
            drawPixel(xOffset, yOffset, color, data)
        }
    }
}


function updateAllPoints() {
    console.log(`
    
    update`)

    removeDeadPoints()

    getNeighbourPoints()

    simulateStep(activePoints)

    drawActivePoints(activePoints)
}
/*
function testset() {

    get neighbours of live cells

}
*/

function simulateStep (points) {
    for (let key in points) {
        let coords = key.split(`|`)
        currentX = Number(coords[0])
        currentY = Number(coords[1])
        currentNeighbours = checkNeighbours(currentX, currentY)
        console.log('checking', `${currentX}|${currentY}`)
        if(points[key] == "dead") {
            if(currentNeighbours.live == 3) points[key] == 'live'
        }
        else {
            if(currentNeighbours.live != 2 && currentNeighbours.live != 3)
                points[key] == 'dead'
        }
    }
}

function removeDeadPoints () {
    for (let key in activePoints) {
        if(activePoints[key] == 'dead') delete activePoints[key]
    }
}

function getNeighbourPoints () {
    console.log('initial check')
    for (let key in activePoints) {
        let coords = key.split(`|`)
        let x = Number(coords[0])
        let y = Number(coords[1])
        let neighbours = checkNeighbours(x, y)
        activePoints = {...activePoints, ...neighbours.newPoints}
    }
}

function checkNeighbours(x, y) {
    console.log('cell check  ', x, '|', y)
    let result = {
        newPoints: [],
        live: 0
    }
    for(let offX = x - 8; offX < x + 16; offX += 8) {
        for(let offY = y - 8; offY < y + 16; offY += 8) {
            console.log(`     ${offX}|${offY}`)
            if(!(offX == x && offY == y)) {
                result.newPoints[`${offX}|${offY}`] = "dead"
            }
            if(Object.keys(activePoints).includes(`${offX}|${offY}`))
                if(activePoints[`${offX}|${offY}`] == 'live') {
                    console.log('live')
                    result.live += 1
            }
        }
    }
    console.log(result)
    console.log()
    return result
}

function drawActivePoints(points) {
    for (let key in points) {
        let coords = key.split(`|`)
        if (points[key] == "live")
            drawBlock(Number(coords[0]), Number(coords[1]), colorFG, fgImage.data)
        else {
            drawBlock(Number(coords[0]), Number(coords[1]), transparent, fgImage.data)
        }
    }
    fgctx.putImageData(fgImage, 0, 0);
}


const clickHandler = ({layerX, layerY}) => {
    let blockX = (Math.floor(layerX / 8) * 8) + 2
    let blockY = (Math.floor(layerY / 8) * 8) + 2
    activePoints[`${blockX}|${blockY}`] = "live"
    drawActivePoints(activePoints)
    updateAllPoints()
}

function stepHandler (evt) {
    updateAllPoints()
}

let simulate = () => {
    // requestAnimationFrame(simulate)
    // updateAllPoints()
}