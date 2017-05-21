// eslint-disable-next-line no-extra-semi, func-names
;(function (glob) {
  'use strict';

  const canvasLib = glob.reqApp.canvas;

  function createCanvas({ width = 256, height = 256, parent }) {
    const canvas = glob.document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    if (parent) {
      glob.document.querySelector(parent).appendChild(canvas);
    } else {
      glob.document.body.appendChild(canvas);
    }
    canvas.ctx = canvas.getContext('2d');
    return canvas;
  }

  canvasLib.createCanvas = createCanvas;
}(self));
