// eslint-disable-next-line no-extra-semi, func-names
;(function (glob) {
  'use strict';

  const canvasLib = glob.reqApp.canvas;
  function keyboard(keyCode) {
    const key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    function keyDownHandler(event) {
      if (event.keyCode === key.code) {
        if (key.press) key.press();
        // if (key.isUp && key.press) key.press()
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    }
    key.downHandler = keyDownHandler;

    function keyUpHandler(event) {
      if (event.keyCode === key.code) {
        // if (key.isDown && key.release) key.release()
        if (key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    }
    key.upHandler = keyUpHandler;

    glob.addEventListener('keydown', key.downHandler.bind(key), false);
    glob.addEventListener('keyup', key.upHandler.bind(key), false);
    return key;
  }

  canvasLib.controls.keyboard = keyboard;
}(self));
