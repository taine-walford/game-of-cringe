let bg, bgctx, bgImage, bgData
let fg, fgctx, fgImage, fgData

const resX = 320
const resY = 180

const colorBG = [50, 20, 50, 255]
const colorBGL = [10, 0, 10, 255]
const colorFG = [150, 230, 255, 255]
const colorFGX = [55, 50, 65, 255]
const transparent = [0, 0, 0, 0]

let playing = false
activePoints = []

window.onload = () => {
    bg = document.querySelector('canvas#bg')
    bgctx = bg.getContext('2d')
    fg = document.querySelector('canvas#fg')
    fgctx = fg.getContext('2d')
    ren = document.querySelector('canvas#render')
    rctx = ren.getContext('2d')

    rctx.imageSmoothingEnabled = false

    bgImage = bgctx.createImageData(resX, resY);
    fgImage = fgctx.createImageData(resX, resY);
    rImage = rctx.createImageData(resX*4, resY*4);

    drawBG()

    ren.onclick = clickHandler

    stepButton = document.querySelector('button#step')
    stepButton.onclick = stepHandler

    playButton = document.querySelector('button#simulate')
    playButton.onclick = playhandler

    render()
    let ticks = window.location.search.slice(1)
    setInterval(simulate, 1000/ticks)
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
    bgctx.putImageData(bgImage, 0, 0);
    rctx.scale(4,4)
    rctx.drawImage(bg, 0, 0)
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
    tickPoints = []
    activePoints = activePoints.filter(c => c.state == 'live')
    activePoints = activePoints.filter(c => c.x > 0 && c.y > 0)
    console.log(activePoints)
    let nearPoints = getNear(activePoints)
    tickPoints = [...activePoints, ...nearPoints]
    activePoints = simulateStep(tickPoints)
}

function getNear (array) {
    let result = []
    for (let obj of array) {
        for (let offX = obj.x - 2; offX < obj.x + 4; offX += 2) {
            for (let offY = obj.y - 2; offY < obj.y + 4; offY += 2) {
                if ((offX == obj.x && offY == obj.y)) continue 
                if (array.filter(p => p.x == offX && p.y == offY).length > 0) continue
                if (result.filter(p => p.x == offX && p.y == offY).length > 0) continue
                result.push({
                    x: offX,
                    y: offY,
                    state: 'dead'
                })
            }
        }
    }
    return result
}

function simulateStep (array) {
    let result = []
    for (let key in array) {
        let c = array[key]
        let near = array.filter(p => {
            if (p.state != 'live') return false
            if (p.x == c.x && p.y == c.y) return false
            if (p.x < (c.x - 2) || p.x > (c.x + 2)) return false
            if (p.y < (c.y - 2) || p.y > (c.y + 2)) return false
            return true
        }).length
        if (c.state == 'dead' && near == 3) 
            result.push({x: c.x, y: c.y, state: 'live'})
        else {
            if (near == 2 || near == 3)
                result.push(c)
            else 
                result.push({x: c.x, y: c.y, state: 'dead'})
        }
    }
    return result
}

function drawPoints(array) {
    for (let key in array) {
        obj = array[key]
        if (obj.state == 'live') drawPixel(obj.x, obj.y, colorFG, fgImage.data)
        else drawPixel(obj.x, obj.y, colorBG, fgImage.data)
    }
    fgctx.putImageData(fgImage, 0, 0);
    rctx.drawImage(fg, 0, 0)
}


const clickHandler = ({layerX, layerY}) => {
    layerX -= 2
    layerY -= 2
    scaledX = (Math.floor(layerX / 8) * 2) + 1
    scaledY = (Math.floor(layerY / 8) * 2) + 1
    activePoints[scaledX + (resX * scaledY)] = {
        x: scaledX,
        y: scaledY,
        state: 'live',
    }
}

function stepHandler (evt) {
    playing = true
    updateAllPoints()
    playing = false
}

function playhandler() {
    playing = playing ? false : true
    playButton.textContent = playing ? 'PAUSE' : 'PLAY'
}

let simulate = () => {
    console.log('tick')
    if(playing)
        updateAllPoints()
}

let render = () => {
    drawPoints(activePoints)
    requestAnimationFrame(render)
}