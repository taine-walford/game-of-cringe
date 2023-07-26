console.log("core loaded")

export function createCanvas(x: number, y: number): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = document.createElement("canvas")
    canvas.width = x
    canvas.height = y
    return canvas
}

export function drawPixel(ordX: number, ordY: number, color: number[], image: ImageData) {
    const result: ImageData = image
    const ordIndex: number = (ordX + (ordY * image.width)) * 4
    for (let colourIndex = 0; colourIndex < color.length; colourIndex++) {
        result.data[ordIndex + colourIndex] = color[colourIndex]
    }
    return result
}

export function drawLine(fromX: number, fromY: number, toX: number, toY: number, color: number[], image: ImageData) {
    let result: ImageData = image
    const deltaX: number = toX - fromX
    const deltaY: number = toY - fromY
    const deltaMax: number = Math.abs(deltaX) > Math.abs(deltaY) ? Math.abs(deltaX) : Math.abs(deltaY)
    let ordX: number = fromX
    let ordY: number = fromY
    const stepX: number = deltaX / deltaMax
    const stepY: number = deltaY / deltaMax
    for (let step = 0; step <= deltaMax; step++) {
        let currentX = Math.round(ordX + stepX * step)
        let currentY = Math.round(ordY + stepY * step)
        result = drawPixel(currentX, currentY, color, result)
    }
    return result
}

export function fillRect(x: number, y: number, width: number, height: number,color: number[], image: ImageData) {
    let result: ImageData = image
    for (let ordX = x; ordX < x + width; ordX++) {
        for (let ordY = y; ordY < y + height; ordY++) {
            result = drawPixel(ordX, ordY, color, image)
        }
    }
    return result
}

export function clearImageData(image: ImageData) {
    let result = image
    for(let idx = 0; idx < image.data.length; idx++) {
        image.data[idx] = 0
    }
    return result
}
