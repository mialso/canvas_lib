## Main object
```javascript
{
  assets: {
    load: sources => {} // sources is array of file names, returns Promise
  },
  createCanvas: ({ width, height, parent }) => return canvas, // creates canvas
  stage: {},  // DisplayObject,
  DisplayObject: DisplayObject, // constructor
  buttons: [],
  draggableSprites: [],
  sprite: {
    render: (canvas, stage) => {},    // renders stage.children
    remove: (sprite1..spriteN) => {}, // removes sprites
    sprite: (config, stage) => new Sprite,  // adds to stage
    Sprite: Sprite,
    button: (config, stage) => new Button,  // adds to stage
    Button: (configObject) => new Button,
    circle: (config, stage) => new Circle,  // adds to stage
    Circle: (configObject) => new Circle,, 
    line: (config, stage) => new Line,      // adds to stage
    text: (config, stage) => new Text,      // adds to stage
    Text: (configObject) => new Text,
    rectangle: (config, stage) => new Rectangle,      // adds to stage
    group: (sprite1..spriteN, stage) => new Group,    // adds to stage
    Group: (sprite1..spriteN) => new Group,
    contain: ({sprite, bounds, bounce, extra}) => collision, // top | left | right | bottom
    distance: (sprite1, sprite2) => distance,      // Number
    followEase: ({follower, leader, speed}) => {},      // updates follower x and y
    followConstant: ({follower, leader, speed}) => {},  // updates follower x and y
    angle: (sprite1, sprite2) => angle,     // Number
    rotateSprite: ({rotatingSprite, centerSprite, distance, angle}) => {},  // x and y update
    rotatePoint: ({pointX, pointY, distanceX, distanceY, angle}) => {x, y},
  },
  controls: {
    keyboard: (keyCode) => key,   // key: { code, isDown, isUp, press, release }
    makePointer: (element, scale) => pointer,   
  },
}
```
  
  
    


