;(function(glob) {
  'use strict'
  const canvasLib = glob.reqApp.canvas;
  function keyboard (keyCode) {
    const key = {}
    key.code = keyCode
    key.isDown = false
    key.isUp = true
    key.press = undefined
    key.release = undefined

    key.downHandler = function (event) {
      if (event.keyCode === key.code) {
        if (key.press) key.press()
        //if (key.isUp && key.press) key.press()
        key.isDown = true
        key.isUp = false
      }
      event.preventDefault()
    }
    key.upHandler = function (event) {
      if (event.keyCode === key.code) {
        //if (key.isDown && key.release) key.release()
        if (key.release) key.release()
        key.isDown = false
        key.isUp = true
      }
      event.preventDefault()
    }

    window.addEventListener(
      "keydown", key.downHandler.bind(key), false
    )
    window.addEventListener(
      "keyup", key.upHandler.bind(key), false
    )
    return key
  }

  canvasLib.controls = {keyboard}
})(self);
