var editorUi = {
    init: function () {
        this.bindEvents();
    },
    classes: {
        ColorObj: function () {
            var colorInputs = document.querySelectorAll('.js-editorColor'),
                colorObj = {};
            [].forEach.call(colorInputs, function (colorInput) {
                colorObj[colorInput.name] = colorInput.value;
            });
            return colorObj;
        }
    },
    bindEvents: function () {
        var colorInputs = document.querySelectorAll('.js-editorColor');
        console.log(colorInputs);
        [].forEach.call(colorInputs, function (colorInput) {
            colorInput.addEventListener('change', function (e) {
                var colorObj = this.classes.colorObj();
                console.log(this.value);

                editWithCanvas.editImageOnCanvas(colorObj);
            });
        });
    }
};
editorUi.init()

var editWithCanvas;
editWithCanvas =  {
        init: function (imageEl) {
            this.imageEl = imageEl;
            this.createCanvas();
            this.hideImage();
            this.addImageToCanvas(imageEl);
        },
        hideImage: function (imageEl) {
            this.imageEl.style.display = 'none';
        },
        setupCanvas: function () {
            this.createCanvas();
            this.hideImage();
        },
        createCanvas: function () {
            this.canvasEl = document.createElement('canvas');
            this.context = this.canvasEl.getContext('2d');
            this.canvasEl.width = this.imageEl.offsetWidth;
            this.canvasEl.height = this.imageEl.offsetHeight;
            this.canvasEl.style.zIndex = 100;
            this.canvasEl.style.position = 'fixed';
            this.canvasEl.style.left = this.imageEl.offsetLeft;
            this.canvasEl.style.top = this.imageEl.offsetTop;
            document.querySelector('body').appendChild(this.canvasEl);
        },
        addImageToCanvas: function (imageEl) {
            this.context.drawImage(imageEl, 0, 0, this.canvasEl.offsetWidth, this.canvasEl.offsetHeight);
        },

        editImageOnCanvas: function ( colorObj) {
            this.context.clearRect(0,0,this.canvasEl.offsetHeight, this.canvasEl.offsetWidth)
            this.addImageToCanvas(this.imageEl);
            var pixels = this.context.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height),i = 0,brightness;
            for (; i < pixels.data.length; i += 4) {
                    brightness = ((3 * pixels.data[i] + 4 * pixels.data[i + 1] + pixels.data[i + 2]) >>> 3) / 256;
                    pixels.data[i] = ((colorObj.r * brightness) + 0.1) >> 0;
                    pixels.data[i + 1] = ((colorObj.g * brightness) + 0.1) >> 0
                    pixels.data[i + 2] = ((colorObj.b * brightness) + 0.1) >> 0
                }
              this.context.putImageData(pixels, 0, 0);
        },
        setImage : function(imageEl) {
            var _this = this;
            var img = new Image;
            img.onload = function() {
                _this.data.rawData = new _this.classes.ImageData(this);
            }
        },
        setImageAttributes: function(rgbObj, brightness) {

        },
        getImage : function() {
            return imageBlob;
        }
};
var img = document.querySelector('img')
editWithCanvas.init(img);