// eslint-disable-next-line no-extra-semi, func-names
;(function (glob) {
  'use strict';

  const canvasLib = glob.reqApp.canvas;
  class Text extends canvasLib.DisplayObject {
    constructor({
      content = 'Hello!',
      font = '12px sans-serif',
      fillStyle = 'red',
      x = 0,
      y = 0,
      baseLine = '',
    }) {
      super();
      Object.assign(this, { content, font, fillStyle, x, y });
      this.textBaseline = baseLine || 'top';
      this.strokeText = 'none';
    }
    render(ctx) {
      ctx.font = this.font;
      ctx.strokeStyle = this.strokeStyle;
      ctx.lineWidth = this.lineWidth;
      ctx.fillStyle = this.fillStyle;

      this.width = ctx.measureText(this.content).width;
      // if (this.width === 0) this.width = ctx.measureText(this.content).width
      this.height = ctx.measureText('M').width;
      // if (this.height === 0) this.height = ctx.measureText("M").width

      ctx.translate(-this.width * this.pivotX, -this.height * this.pivotY);
      ctx.textBaseline = this.textBaseline;
      ctx.fillText(this.content, 0, 0);
      if (this.strokeText !== 'none') ctx.strokeText();
    }
  }

  function text(configObject, stage) {
    const sprite = new Text(configObject);
    stage.addChild(sprite);
    return sprite;
  }
  canvasLib.sprite.text = text;
  canvasLib.sprite.Text = Text;
}(self));

