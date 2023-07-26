console.log('core loaded')

export function createCanvas(x: number, y: number): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = document.createElement("canvas")
    canvas.width = x
    canvas.height = y
    return canvas
}