// eslint-disable-next-line no-extra-semi, func-names
;(function (glob) {
  'use strict';

  const canvasLib = glob.reqApp.canvas;

  function contain({
    sprite,
    bounds,
    bounce = false,
    extra = undefined,
  }) {
    const x = bounds.x;
    const y = bounds.y;
    const width = bounds.width;
    const height = bounds.height;
    // collision object used to store which side sprite hits
    let collision;
    // left
    if (sprite.x < x) {
      if (bounce) sprite.vx *= -1;
      if (sprite.mass) sprite.vx /= sprite.mass;
      sprite.x = x;
      collision = 'left';
    }
    // top
    if (sprite.y < y) {
      if (bounce) sprite.vy *= -1;
      if (sprite.mass) sprite.vy /= sprite.mass;
      sprite.y = y;
      collision = 'top';
    }
    // right
    if (sprite.x + sprite.width > width) {
      if (bounce) sprite.vx *= -1;
      if (sprite.mass) sprite.vx /= sprite.mass;
      sprite.x = width - sprite.width;
      collision = 'right';
    }
    // bottom
    if (sprite.y + sprite.height > height) {
      if (bounce) sprite.vy *= -1;
      if (sprite.mass) sprite.vy /= sprite.mass;
      sprite.y = height - sprite.height;
      collision = 'bottom';
    }
    // run extra function in case collision took place
    if (collision && extra) extra(collision);

    return collision;
  }

  function getDistance(sprite1, sprite2) {
    const vx = sprite2.centerX - sprite1.centerX;
    const vy = sprite2.centerY - sprite1.centerY;
    return Math.sqrt((vx * vx) + (vy * vy));
  }

  function followEase({ follower, leader, speed }) {
    const vx = leader.centerX - follower.centerX;
    const vy = leader.centerY - follower.centerY;
    const distance = Math.sqrt((vx * vx) + (vy * vy));
    if (distance >= 1) {
      follower.x += vx * speed;
      follower.y += vy * speed;
    }
  }

  function followConstant({ follower, leader, speed }) {
    const vx = leader.centerX - follower.centerX;
    const vy = leader.centerY - follower.centerY;
    const distance = Math.sqrt((vx * vx) + (vy * vy));
    if (distance >= speed) {
      follower.x += (vx / distance) * speed;
      follower.y += (vy / distance) * speed;
    }
  }

  function getAngle(s1, s2) {
    return Math.atan2(
      s2.centerY - s1.centerY,
      s2.centerX - s1.centerX,
    );
  }

  function rotateSprite({
    rotatingSprite,
    centerSprite,
    distance,
    angle,
  }) {
    rotatingSprite.x =
      (distance * Math.cos(angle)) - rotatingSprite.halfWidth
      - centerSprite.centerX - rotatingSprite.parent.x;
    rotatingSprite.y =
      (distance * Math.sin(angle)) - centerSprite.centerY
      - rotatingSprite.parent.y - rotatingSprite.halfWidth;
  }

  function rotatePoint({ pointX, pointY, distanceX, distanceY, angle }) {
    return {
      x: pointX + (Math.cos(angle) * distanceX),
      y: pointY + (Math.sin(angle) * distanceY),
    };
  }

  canvasLib.sprite.contain = contain;
  canvasLib.sprite.distance = getDistance;
  canvasLib.sprite.followEase = followEase;
  canvasLib.sprite.followConstant = followConstant;
  canvasLib.sprite.angle = getAngle;
  canvasLib.sprite.rotateSprite = rotateSprite;
  canvasLib.sprite.rotatePoint = rotatePoint;
}(self));
