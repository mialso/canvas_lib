// eslint-disable-next-line no-extra-semi, func-names
;(function (glob) {
  'use strict';

  const canvasLib = glob.reqApp.canvas;
  function makePointer(element, scale = 1) {
    const pointer = {
      element,
      scale,
      _x: 0,
      _y: 0,

      get x() {
        return this._x / this.scale;
      },
      get y() {
        return this._y / this.scale;
      },
      get centerX() {
        return this.x;
      },
      get centerY() {
        return this.y;
      },
      get position() {
        return { x: this.x, y: this.y };
      },
      // to track pointer state
      isDown: false,
      isUp: true,
      tapped: false,

      // to help measure the time between up and down states
      downTime: 0,
      elapsedTime: 0,

      // optional user definable
      press: undefined,
      release: undefined,
      tap: undefined,

      // mouse move handler
      moveHandler(event) {
        const elem = event.target;
        this._x = (event.pageX - elem.offsetLeft);
        this._y = (event.pageY - elem.offsetTop);
        event.preventDefault();
      },

      touchMoveHandler(event) {
        const elem = event.target;
        this._x = (event.targetTouches[0].pageX - elem.offsetLeft);
        this._y = (event.targetTouches[0].pageY - elem.offsetTop);
        event.preventDefault();
      },

      downHandler(event) {
        this.isDown = true;
        this.isUp = false;
        this.tapped = false;
        this.downTime = Date.now();
        if (this.press) this.press();
        event.preventDefault();
      },

      touchStartHandler(event) {
        const elem = event.target;
        this._x = event.targetTouches[0].pageX - elem.offsetLeft;
        this._y = event.targetTouches[0].pageY - elem.offsetTop;
        this.isDown = true;
        this.isUp = false;
        this.tapped = false;

        this.downTime = Date.now();
        if (this.press) this.press();
        event.preventDefault();
      },

      upHandler(event) {
        this.elapsedTime = Math.abs(this.downTime - Date.now());
        if (this.elapsedTime <= 200 && this.tapped === false) {
          this.tapped = true;
          if (this.tap) this.tap();
        }
        this.isDown = false;
        this.isUp = true;
        if (this.release) this.release();
        event.preventDefault();
      },

      touchEndHandler(event) {
        this.elapsedTime = Math.abs(this.downTime - Date.now());
        if (this.elapsedTime <= 200 && this.tapped === false) {
          this.tapped = true;
          if (this.tap) this.tap();
        }
        this.isDown = false;
        this.isUp = true;
        if (this.release) this.release();
        event.preventDefault();
      },

      hitTestSprite(sprite) {
        let hit = false;
        if (!sprite.circular) {
          const left = sprite.gx;
          const right = sprite.gx + sprite.width;
          const top = sprite.gy;
          const bottom = sprite.gy + sprite.height;

          hit =
            this.x > left && this.x < right
            && this.y > top && this.y < bottom;
        } else {
          const vx = this.x - (sprite.gx + sprite.radius);
          const vy = this.y - (sprite.gy + sprite.radius);
          const distance = Math.sqrt((vx * vx) + (vy * vy));
          hit = distance < sprite.radius;
        }
        return hit;
      },

      dragSprite: null,
      dragOffsetX: 0,
      dragOffsetY: 0,

      updateDragAndDrop() {
        const draggableSprites = canvasLib.draggableSprites;
        if (this.isDown) {
          if (this.dragSprite === null) {
            for (let i = draggableSprites.length - 1; i > -1; i -= 1) {
              const sprite = draggableSprites[i];
              if (this.hitTestSprite(sprite) && sprite.draggable) {
                this.dragOffsetX = this.x - sprite.gx;
                this.dragOffsetY = this.y - sprite.gy;

                this.dragSprite = sprite;

                const children = sprite.parent.children;
                children.splice(children.indexOf(sprite), 1);
                children.push(sprite);

                draggableSprites.splice(draggableSprites.indexOf(sprite), 1);
                draggableSprites.push(sprite);
                break;
              }
            }
          } else {
            this.dragSprite.x = this.x - this.dragOffsetX;
            this.dragSprite.y = this.y - this.dragOffsetY;
          }
        }
        if (this.isUp) {
          this.dragSprite = null;
        }
        draggableSprites.some((sprite) => {
          if (this.hitTestSprite(sprite) && sprite.draggable) {
            this.element.style.cursor = 'pointer';
            return true;
          }
          this.element.style.cursor = 'auto';
          return false;
        });
      },
    };
    element.addEventListener(
      'mousemove', pointer.moveHandler.bind(pointer), false);
    element.addEventListener(
      'mousedown', pointer.downHandler.bind(pointer), false);
    glob.addEventListener(
      'mouseup', pointer.upHandler.bind(pointer), false);
    element.addEventListener(
      'touchmove', pointer.touchMoveHandler.bind(pointer), false);
    element.addEventListener(
      'touchstart', pointer.touchStartHandler.bind(pointer), false);
    glob.addEventListener(
      'touchend', pointer.touchEndHandler.bind(pointer), false);
    element.style.touchAction = 'none';

    return pointer;
  }

  canvasLib.controls.makePointer = makePointer;
}(self));
