let bg = null
let bgctx = null

let fg = null
let fgctx = null

let bgImage
let bgData

let fgImage
let fgData

const resX = 320
const resY = 180

const colorBG = [60, 25, 65, 255]
const colorBGL = [45, 5, 50, 255]
const colorFG = [175, 235, 255, 255]
const colorFGX = [75, 135, 155, 255]
const transparent = [0, 0, 0, 0]

blank = new Array(320 * 180)
activePoints = blank.map(x => {state: 'dead'})

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
    
    fg.onclick = clickHandler
    // // gameLoop()

    // console.log(fgImage.data);

    stepButton = document.querySelector('button#step')
    stepButton.onclick = stepHandler
}

const drawBG = () => {
    for (let x = 0; x < resX; x++) {
        for (let y = 0; y < resY; y++) {
            if ((x % 2) == 0 || (y % 2) == 0)
                drawPixel(x, y, colorBGL, bgImage.data)
            else 
                drawPixel(x, y, colorBG, bgImage.data)
        }
    }
}

function drawPixel (x, y, color, data) {
    let roundedX = Math.round(x);
    let roundedY = Math.round(y);
    let index = 4 * (resX * roundedY + roundedX);
    data[index + 0] = color[0];
    data[index + 1] = color[1];
    data[index + 2] = color[2];
    data[index + 3] = color[3];
}

function updateAllPoints() {
    // get neighbours of live cells
    getNeighbours()
    // store x, y, state, liveNeighs

    // loop activePoints
    //     handle dead
    //     kill lives

    // draw
}

function getNeighbours () {
    for (let obj of activePoints) {
        if(!obj) continue
        for(let offX = obj.x - 8; offX < obj.x + 16; offX += 8) {
            for(let offY = obj.y - 8; offY < obj.y + 16; offY += 8) {
                if(!(offX == obj.x && offY == obj.y) && activePoints[offX + offY * resX].state != 'live') {
                    activePoints[layerX + (resX * offY)] = {
                        x: offX,
                        y: offY,
                        index: offX + (resX * offY),
                        state: 'dead',
                    }
                }
            }
        }
    }
}

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

// function getNeighbourPoints () {
//     console.log('initial check')
//     for (let key in activePoints) {
//         let coords = key.split(`|`)
//         let x = Number(coords[0])
//         let y = Number(coords[1])
//         let neighbours = checkNeighbours(x, y)
//         activePoints = {...activePoints, ...neighbours.newPoints}
//     }
// }

// function checkNeighbours(x, y) {
//     console.log('cell check  ', x, '|', y)
//     let result = {
//         newPoints: [],
//         live: 0
//     }
//     for(let offX = x - 8; offX < x + 16; offX += 8) {
//         for(let offY = y - 8; offY < y + 16; offY += 8) {
//             console.log(`     ${offX}|${offY}`)
//             if(!(offX == x && offY == y)) {
//                 result.newPoints[`${offX}|${offY}`] = "dead"
//             }
//             if(Object.keys(activePoints).includes(`${offX}|${offY}`))
//                 if(activePoints[`${offX}|${offY}`] == 'live') {
//                     console.log('live')
//                     result.live += 1
//             }
//         }
//     }
//     console.log(result)
//     console.log()
//     return result
// }

function drawActivePoints(points) {
    for (let point in points) {
        drawBlock(point.x, point.y, point.state == 'live' ? colorFG : transparent, fgImage.data)
    }
    fgctx.putImageData(fgImage, 0, 0);
}


const clickHandler = ({layerX, layerY}) => {
    activePoints[layerX + (resX * layerY)] = {
        x: layerX,
        y: layerY,
        index: layerX + (resX * layerY),
        state: 'live',
    }
    console.log(activePoints)
}

function stepHandler (evt) {
    updateAllPoints()
}

let simulate = () => {
    requestAnimationFrame(simulate)

    drawActivePoints()
}