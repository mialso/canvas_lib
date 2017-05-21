// eslint-disable-next-line no-extra-semi, func-names
;(function (glob) {
  'use strict';

  const canvasLib = glob.reqApp.canvas;
  class Button extends canvasLib.Sprite {
    constructor({ source, x = 0, y = 0 }) {
      super({ source, x, y });
      this.interactive = true;
    }
  }
  function button(configObject, stage) {
    if (typeof stage !== 'object') {
      throw new Error('[ERROR]: <canvasLib>: BUTTON: stage is not defined');
    }
    const sprite = new Button(configObject);
    stage.addChild(sprite);
    return sprite;
  }
  canvasLib.sprite.button = button;
  canvasLib.sprite.Button = Button;
}(self));
