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
        var _this = this;
        var colorInputs = document.querySelectorAll('.js-editorColor');
        console.log(colorInputs);
        [].forEach.call(colorInputs, function (colorInput) {
            colorInput.addEventListener('change', function (e) {
                var colorObj = _this.classes.ColorObj();
                console.log(colorObj);
                editWithCanvas.editImageOnCanvas(colorObj);
            });
        });
    }
};
editorUi.init();

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
            this.imageEl.parentNode.appendChild(this.canvasEl);
        },
        addImageToCanvas: function (imageEl) {
            this.context.drawImage(imageEl, 0, 0, this.canvasEl.offsetWidth, this.canvasEl.offsetHeight);
        },
        editImageOnCanvas: function ( colorObj) {
            this.context.clearRect(0,0,this.canvasEl.offsetHeight, this.canvasEl.offsetWidth);
            this.addImageToCanvas(this.imageEl);
            var pixels = this.context.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height),i = 0,brightness;
            for (; i < pixels.data.length; i += 4) {
                    brightness = ((3 * pixels.data[i] + 4 * pixels.data[i + 1] + pixels.data[i + 2]) >>> 3) / 256;
                    pixels.data[i] = ((colorObj.red * brightness) + 0.1) >> 0;
                    pixels.data[i + 1] = ((colorObj.green * brightness) + 0.1) >> 0;
                    pixels.data[i + 2] = ((colorObj.blue * brightness) + 0.1) >> 0;
                }
              this.context.putImageData(pixels, 0, 0);
        },
        setImageAttributes: function(rgbObj, brightness) {

        },
        getImage : function() {
            return this.context.toDataURL();
        }
};
/* === BEARDCORE ===*/
/*The image comes from Anguilla. somewhere*/
var img = document.querySelector('img');

/*Init the thing with the image... wherever it came from*/
editWithCanvas.init(img);