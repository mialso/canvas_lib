;(function(glob) {
  'use strict'

  if (!glob.reqApp) glob.reqApp = {};

  function createCanvas ({width = 256, height = 256, parent}) {
    const canvas;
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    if (parent) {
      document.querySelector(parent).appendChild(canvas);
    } else {
      document.body.appendChild(canvas);
    }
    canvas.ctx = canvas.getContext("2d");
    return canvas;
  }

  glob.reqApp.canvas.createCanvas = createCanvas

})(self);
