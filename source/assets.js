// eslint-disable-next-line no-extra-semi, func-names
;(function (glob) {
  'use strict';

  const canvasLib = glob.reqApp.canvas;
  const assets = {
    toLoad: 0,
    loaded: 0,
    imageExtensions: ['png', 'jpg', 'gif'],
    fontExtensions: ['ttf', 'otf', 'ttc', 'woff'],
    jsonExtensions: ['json'],
    audioExtensions: ['mp3', 'ogg', 'wav', 'webm'],

    load(sources) {
      return new Promise((resolve) => {
        const loadHandler = () => {
          this.loaded += 1;
          console.log(this.loaded);

          if (this.toLoad === this.loaded) {
            this.toLoad = 0;
            this.loaded = 0;
            console.log('Assets finished loading');

            resolve();
          }
        };
        console.log('Loading assests...');
        this.toLoad = sources.length;
        sources.forEach((source) => {
          const extension = source.split('.').pop();
          if (this.imageExtensions.indexOf(extension) !== -1) {
            this.loadImage(source, loadHandler);
          } else if (this.jsonExtensions.indexOf(extension) !== -1) {
            this.loadJson(source, loadHandler);
          } else if (this.audioExtensions.indexOf(extension) !== -1) {
            this.loadSound(source, loadHandler);
          } else {
            console.log(`File type not recognized: ${source}`);
          }
        });
      });
    },

    loadImage(source, loadHandler) {
      const image = new glob.Image();
      image.addEventListener('load', loadHandler, false);
      this[source] = image;
      image.src = source;
    },

    loadFont(source, loadHandler) {
      const fontFamily = source.split('/').pop().split('.')[0];
      const newStyle = glob.document.createElement('style');
      const fontFace = `@font-face {font-family: "${fontFamily}"; src: url("${source}");}`;
      newStyle.appendChild(glob.document.createTextNode(fontFace));
      glob.document.head.appendChild(newStyle);

      loadHandler();
    },

    loadJson(source, loadHandler) {
      const xhr = new glob.XMLHttpRequest();
      xhr.open('GET', source, true);
      xhr.responseType = 'text';
      xhr.onload = () => {
        if (xhr.status === 200) {
          const file = JSON.parse(xhr.responseText);
          file.name = source;
          this[file.name] = file;
          if (file.frames) {
            this.createTilesetFrames(file, source, loadHandler);
          } else {
            loadHandler();
          }
        }
      };
      xhr.send();
    },

    createTilesetFrames(file, source, loadHandler) {
      const baseUrl = source.replace(/[^/]*$/, '');
      const imageSource = baseUrl + file.meta.image;
      const image = new glob.Image();
      const imageLoadHandler = () => {
        this[imageSource] = image;
        Object.keys(file.frames).forEach((frame) => {
          console.log(`frame: ${frame}`);
          this[frame] = file.frames[frame];
          this[frame].source = image;
        });
        loadHandler();
      };
      image.addEventListener('load', imageLoadHandler, false);
      image.src = imageSource;
    },
    /*
    loadSound(source, loadHandler) {
      console.log('loadSound called - not supported yet');
    },
    */
  };

  canvasLib.assets = assets;
}(self));
