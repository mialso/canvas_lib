// eslint-disable-next-line no-extra-semi, func-names
;(function (glob) {
  'use strict';

  const canvasLib = glob.reqApp.canvas;
  class Rectangle extends canvasLib.DisplayObject {
    constructor({
      width = 32,
      height = 32,
      fillStyle = 'gray',
      strokeStyle = 'none',
      lineWidth = 0,
      x = 0,
      y = 0,
    }) {
      super();
      Object.assign(
        this, { width, height, fillStyle, strokeStyle, lineWidth, x, y },
      );
      this.mask = false;
    }
    render(ctx) {
      ctx.strokeStyle = this.strokeStyle;
      ctx.lineWidth = this.lineWidth;
      ctx.fillStyle = this.fillStyle;
      ctx.beginPath();
      ctx.rect(
        -this.width * this.pivotX,
        -this.height * this.pivotY,
        this.width,
        this.height,
      );
      if (this.strokeStyle !== 'none') ctx.stroke();
      if (this.fillStyle !== 'none') ctx.fill();
      if (this.mask && this.mask === true) ctx.clip();
    }
  }
  function rectangle(configObject, stage) {
    const sprite = new Rectangle(configObject);
    stage.addChild(sprite);
    return sprite;
  }
  canvasLib.sprite.rectangle = rectangle;
}(self));
