const pixelShift = (srcCanvas, shiftCanvas, xOffset, yOffset) => {
    const shiftXY = { xS: 0, yS: 0 }
    const shiftCanvasWidth  = shiftCanvas.width
    const shiftCanvasHeight = shiftCanvas.height
    for ( let x = 0; x < shiftCanvasWidth; x ++) 
      for ( let y = 0; y < shiftCanvasHeight; y++) {
        readShift(shiftCanvas, x, y, shiftXY)
        writePixel(srcCanvas, xOffset + x , yOffset + y, readPixelColor(srcCanvas, xOffset + shiftXY.xS, yOffset + shiftXY.yS))
      }
  }