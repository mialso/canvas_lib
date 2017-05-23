// eslint-disable-next-line no-extra-semi, func-names
;(function (glob) {
  'use strict';

  const canvasLib = glob.reqApp.canvas;
  class Sprite extends canvasLib.DisplayObject {
    constructor({
      source,
      x = 0,
      y = 0,
    }) {
      super();
      Object.assign(this, { x, y });
      if (source instanceof glob.Image) {
        this.createFromImage(source);
      } else if (source.frame) {
        this.createFromAtlas(source);
      } else if (source.image && !source.data) {
        this.createFromTileset(source);
      } else if (source.image && source.data) {
        this.createFromTilesetFrames(source);
      } else if (source instanceof Array) {
        if (source[0] && source[0].source) {
          this.createFromAtlasFrames(source);
        } else if (source[0] instanceof glob.Image) {
          this.createFromImages(source);
        } else {
          throw new Error(`The image sources in ${source} are not recognized`);
        }
      } else {
        throw new Error(`The image source ${source} is not recognized`);
      }
    }
    createFromImage(source) {
      if (!(source instanceof glob.Image)) {
        throw new Error(`${source} is not an image object`);
      } else {
        this.source = source;
        this.sourceX = 0;
        this.sourceY = 0;
        this.width = source.width;
        this.height = source.height;
        this.sourceWidth = source.width;
        this.sourceHeight = source.height;
      }
    }
    createFromAtlas(source) {
      this.tilesetFrame = source;
      this.source = this.tilesetFrame.source;
      this.sourceX = this.tilesetFrame.frame.x;
      this.sourceY = this.tilesetFrame.frame.y;
      this.width = this.tilesetFrame.frame.w;
      this.height = this.tilesetFrame.frame.h;
      this.sourceWidth = this.tilesetFrame.frame.w;
      this.sourceHeight = this.tilesetFrame.frame.h;
    }
    createFromTileset(source) {
      if (!(source.image instanceof glob.Image)) {
        throw new Error(`${source.image} is not an image object`);
      } else {
        this.source = source.image;
        this.sourceX = source.x;
        this.sourceY = source.y;
        this.width = source.width;
        this.height = source.height;
        this.sourceWidth = source.width;
        this.sourceHeight = source.height;
      }
    }
    createFromTilesetFrames(source) {
      if (!(source.image instanceof glob.Image)) {
        throw new Error(`${source.image} is not an image object`);
      } else {
        this.source = source.image;
        this.frames = source.data;
        // set the sprite to the first frame
        this.sourceX = this.frames[0][0];
        this.sourceY = this.frames[0][1];
        this.width = source.width;
        this.height = source.height;
        this.sourceWidth = source.width;
        this.sourceHeight = source.height;
      }
    }
    createFromAtlasFrames(source) {
      this.frames = source;
      this.source = source[0].source;
      this.sourceX = source[0].frame.x;
      this.sourceY = source[0].frame.y;
      this.width = source[0].frame.w;
      this.height = source[0].frame.h;
      this.sourceWidth = source[0].frame.w;
      this.sourceHeight = source[0].frame.h;
    }
    createFromImages(source) {
      this.frames = source;
      this.source = source[0];
      this.sourceX = 0;
      this.sourceY = 0;
      this.width = source[0].width;
      this.height = source[0].height;
      this.sourceWidth = source[0].width;
      this.sourceHeight = source[0].height;
    }
    gotoAndStop(frameNumber) {
      if (this.frames.length > 0 && frameNumber < this.frames.length) {
        if (this.frames[0] instanceof Array) {
          this.sourceX = this.frames[frameNumber][0];
          this.sourceY = this.frames[frameNumber][1];
        } else if (this.frames[frameNumber].frame) {
          this.sourceX = this.frames[frameNumber].frame.x;
          this.sourceY = this.frames[frameNumber].frame.y;
          this.sourceWidth = this.frames[frameNumber].frame.w;
          this.sourceHeight = this.frames[frameNumber].frame.h;
          this.width = this.frames[frameNumber].frame.w;
          this.height = this.frames[frameNumber].frame.h;
        } else {
          this.source = this.frames[frameNumber];
          this.sourceX = 0;
          this.sourceY = 0;
          this.width = this.source.width;
          this.height = this.source.height;
          this.sourceWidth = this.source.width;
          this.sourceHeight = this.souce.height;
        }
        this._currentFrame = frameNumber;
      } else {
        throw new Error(`Frame number ${frameNumber} does not exists`);
      }
    }
    render(ctx) {
      ctx.drawImage(
        this.source,
        this.sourceX, this.sourceY,
        this.sourceWidth, this.sourceHeight,
        -this.width * this.pivotX,
        -this.height * this.pivotY,
        this.width, this.height);
    }
  }
  function sprite(configObject, stage) {
    const newSprite = new Sprite(configObject);
    stage.addChild(newSprite);
    return newSprite;
  }
  canvasLib.sprite.sprite = sprite;
  canvasLib.Sprite = Sprite;
}(self));
