// eslint-disable-next-line no-extra-semi, func-names
;(function (glob) {
  'use strict';

  if (!glob.reqApp) {
    glob.reqApp = { canvas: {} };
  } else {
    glob.reqApp.canvas = {};
  }
  glob.reqApp.canvas.sprite = {};
  glob.reqApp.canvas.controls = {};
}(self));
