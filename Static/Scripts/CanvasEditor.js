var editorUi = {
    init: function () {
        this.bindEvents();
    },
    classes: {
        ColorObj: function () {
            var colorInputs = document.querySelectorAll('[id*="Color"]'),
                colorObj = {};
            [].forEach.call(colorInputs, function (colorInput) {
                colorObj[colorInput.name] = colorInput.value;
            });
            return colorObj;
        }
    },
    bindEvents: function () {
        var _this = this,
            colorInputs = document.querySelectorAll('[id*="Color"]'),
            brightnessInput = document.querySelector('#ImageBrightness'),
            cropImageInput = document.querySelector('#CropImage'),
            saveCropButton = document.querySelector('#SaveCrop');
        [].forEach.call(colorInputs, function (colorInput) {
            colorInput.addEventListener('change', function (e) {
                var colorObj = _this.classes.ColorObj();
                editWithCanvas.drawCanvas(colorObj);
            });
        });
        brightnessInput.addEventListener('change', function (e) {
                var colorObj = _this.classes.ColorObj(),
                    brightness = (this.value /100);
                editWithCanvas.drawCanvas(colorObj, brightness);
        });
        cropImageInput.addEventListener('change', function (e) {
            editWithCanvas.cropData.allowCropping = e.target.checked;
        });
        saveCropButton.addEventListener('click', function (e) {
            editWithCanvas.cropCanvas();
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
            this.bindEvents();
        },
        cropData: {
            allowCropping: false,
            isCropping: false,
            hasCropping: false,
            x: 0,
            y: 0,
            w: 1,
            h: 1
        },
        bindEvents: function () {
            this.canvasEl.addEventListener('mousedown', function (e) {
                if (editWithCanvas.cropData.allowCropping) {
                    editWithCanvas.cropData.isCropping = true;
                    editWithCanvas.cropData.x = e.offsetX;
                    editWithCanvas.cropData.y = e.offsetY;
                }
            });
            this.canvasEl.addEventListener('mousemove', function (e) {
                if(editWithCanvas.cropData.isCropping) {
                    editWithCanvas.cropData.w = editWithCanvas.cropData.x + e.offsetX;
                    editWithCanvas.cropData.h = editWithCanvas.cropData.y + e.offsetY;
                }
            });
            this.canvasEl.addEventListener('mouseup', function (e) {
                if (editWithCanvas.cropData.allowCropping) {
                    editWithCanvas.cropData.isCropping = false;
                    editWithCanvas.cropData.hasCropping = true;
                    editWithCanvas.cropData.w = editWithCanvas.cropData.x + e.offsetX;
                    editWithCanvas.cropData.h = editWithCanvas.cropData.y + e.offsetY;
                    console.log(editWithCanvas.cropData);
                }

            })
        },
        resetCropData: function () {
            this.cropData = {
                allowCropping: false,
                isCropping: false,
                hasCropping: false,
                x: 0,
                y: 0,
                w: 1,
                h: 1
            }
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
        getCanvasPixels: function (colorObj, userBrightness) {
            var pixels = this.context.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height),i = 0,brightness;
            for (; i < pixels.data.length; i += 4) {
                    brightness = ((3 * pixels.data[i] + 4 * pixels.data[i + 1] + pixels.data[i + 2]) >>> 3) / 256;
                    brightness = userBrightness !== undefined ? ((brightness * userBrightness  ) + brightness) : brightness;


                    pixels.data[i] = colorObj.red != 0 ? ((colorObj.red * brightness) + 0.1) >> 0 : ((pixels.data[i] * brightness) + .1);
                    pixels.data[i + 1] = colorObj.green != 0 ?  ((colorObj.green * brightness) + 0.1) >> 0 : ((pixels.data[i+1] * brightness) + .1) ;
                    pixels.data[i + 2] = colorObj.blue != 0 ? ((colorObj.blue * brightness) + 0.1) >> 0 : ((pixels.data[i+2] * brightness) + .1) ;
                }
             return pixels;
        },
        showCroppingFrame: function() {

            if (this.cropData.isCropping || this.cropData.hasCropping) {
                this.context.lineWidth = 4;
                this.context.strokeStyle = "#444";
                this.context.fillStyle = 'rgba(200,200,200, .5)';
                this.context.fillRect(this.cropData.x, this.cropData.y, this.cropData.w, this.cropData.h);
            }
        },
        cropCanvas: function () {
            this.context.drawImage(this.imageEl, 0, 0, this.canvasEl.width, this.canvasEl.height, this.cropData.x, this.cropData.y, this.cropData.width, this.cropData.height);
          //  this.context.fillRect(this.cropData.x, this.cropData.y, this.cropData.w, this.cropData.h);
            this.imageEl.src = this.canvasEl.toDataURL('image/png');
            this.canvasEl.width = this.cropData.w;
            this.canvasEl.height = this.cropData.h;
            this.resetCropData();
        },
        drawCanvas: function ( colorObj,userBrightness) {
            var _this = this;
            _this.context.clearRect(0,0,this.canvasEl.offsetHeight, this.canvasEl.offsetWidth);
            _this.addImageToCanvas(this.imageEl);
            var pixels = _this.getCanvasPixels(colorObj, userBrightness);
            
            this.context.putImageData(pixels, 0, 0);
            _this.showCroppingFrame();
             window.requestAnimationFrame(function() {
                _this.drawCanvas(colorObj, userBrightness);
             })
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