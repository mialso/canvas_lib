;(function(glob) {
  'use strict'
  const canvasLib = glob.reqApp.canvas;
  class Line extends canvasLib.DisplayObject {
    constructor ({
      strokeStyle = "none",
      lineWidth = 0,
      ax = 0,
      ay = 0,
      bx = 32,
      by = 32,
    }) {
      super();
      Object.assign(
        this, {strokeStyle, lineWidth, ax, ay, bx, by};
      )
      this.lineJoin = "round";
    }
    render (ctx) {
      ctx.strokeStyle = this.strokeStyle;
      ctx.lineWidth = this.lineWidth;
      ctx.lineJoin = this.lineJoin;
      ctx.beginPath();
      ctx.moveTo(this.ax, this.ay);
      ctx.lineTo(this.bx, this.by);
      if (this.strokeStyle !== "none") ctx.stroke();
    }
  }
  function line (configObject, stage) {
    let sprite = new Line(configObject);
    stage.addChild(sprite);
    return sprite;
  }
  canvasLib.sprite.line = line;
})(window);

