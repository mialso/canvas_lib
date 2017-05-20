;(function(glob) {
  'use strict'

  const canvasLib = glob.reqApp.canvas;
  class Circle extends canvasLib.DisplayObject {
    constructor ({
      diameter = 32,
      fillStyle = "gray",
      strokeStyle = "none",
      lineWidth  = 0,
      x = 0,
      y = 0
    }) {
      super()
      this.circular = true
      Object.assign(
        this, {diameter, fillStyle, strokeStyle, lineWidth, x, y}
      )
      this.mask = false
    }
    render (ctx) {
      ctx.strokeStyle = this.strokeStyle
      ctx.lineWidth = this.lineWidth
      ctx.fillStyle = this.fillStyle
      ctx.beginPath()

      ctx.arc(
        this.radius + (-this.diameter * this.pivotX),
        this.radius + (-this.diameter * this.pivotY),
        this.radius,
        0,
        2 * Math.PI,
        false
      )
      if (this.strokeStyle !== "none") ctx.stroke()
      if (this.fillStyle !== "none") ctx.fill()
      if (this.mask && this.mask === true) ctx.clip()
    }
  }

  function circle (configObject, stage) {
    let sprite = new Circle(configObject)
    stage.addChild(sprite)
    return sprite
  }
  canvasLib.sprite.circle = circle
})(self);
