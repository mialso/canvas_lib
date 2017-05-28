// eslint-disable-next-line no-extra-semi, func-names
;(function (glob) {
  'use strict';

  const canvasLib = glob.reqApp.canvas;

  function remove(...spritesToRemove) {
    spritesToRemove.forEach((sprite) => {
      sprite.parent.removeChild(sprite);
    });
  }

  function render(canvas, stage) {
    const ctx = canvas.getContext('2d');
    if (typeof stage !== 'object') {
      throw new Error('[ERROR]: <canvasLib>: render(): no stage provided');
    }

    function displaySprite(sprite) {
      if (
        sprite.visible
        && sprite.gx < canvas.width + sprite.width
        && sprite.gx + sprite.width >= -sprite.width
        && sprite.gy < canvas.height + sprite.height
        && sprite.gy + sprite.height >= -sprite.height
      ) {
        ctx.save();
        ctx.translate(
          sprite.x + (sprite.width * sprite.pivotX),
          sprite.y + (sprite.height * sprite.pivotY));
        ctx.rotate(sprite.rotation);
        ctx.globalAlpha = sprite.alpha * sprite.parent.alpha;
        ctx.scale(sprite.scaleX, sprite.scaleY);

        if (sprite.shadow) {
          ctx.shadowColor = sprite.shadowColor;
          ctx.shadowOffsetX = sprite.shadowOffsetX;
          ctx.shadowOffsetY = sprite.shadowOffsetY;
          ctx.shadowBlur = sprite.shadowBlur;
        }

        if (sprite.blendMode) ctx.globalCompositeOperation = sprite.blendMode;
        if (sprite.render) sprite.render(ctx);
        if (sprite.children && sprite.children.length > 0) {
          ctx.translate(-sprite.width * sprite.pivotX, -sprite.height * sprite.pivotY);
          sprite.children.forEach(child => displaySprite(child));
        }
        ctx.restore();
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stage.children.forEach(sprite => displaySprite(sprite));
  }

  canvasLib.sprite.render = render;
  canvasLib.sprite.remove = remove;
}(self));
