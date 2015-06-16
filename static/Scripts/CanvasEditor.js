var editWithCanvas;
editWithCanvas = {
    data : {
        rawData :{},
        editData: {}
    },
    classes: {
        RelativeBrightness: function(brightness) {
            return brightness > 125 ? 'imgDetect--lighter' : 'imgDetect--darker';
        },
        RelativeColor: function(data) {
            var highClr = Math.max(data.r, data.g, data.b),
                color = '';
            console.log(data);
            switch (highClr) {
                case data.r:
                    color = 'imgDetect--redder';
                    break;
                case data.g:
                    color = 'imgDetect--greener';
                    break;
                case data.b:
                    color = 'imgDetect--bluer';
                default:
                    break;
            }
            return color;
        },
        CvsCtx: function(imgEl) {
            var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
            canvas.width = imgEl.width;
            canvas.height = imgEl.height;
            ctx.drawImage(imgEl, 0, 0);
            return ctx;
        },
        ImageData: function(imgEl) {
            var _this = imgDetect,
                ctx = _this.CvsCtx(imgEl),
                imageData = ctx.getImageData(0, 0, imgEl.width, imgEl.height),
                data = imageData.data,
                colorSum = 0,
                imgData = {},
                r, g, b, avg, brightness;
            for (var x = 0, len = data.length; x < len; x += 4) {
                r = data[x];
                g = data[x + 1];
                b = data[x + 2];
                avg = Math.floor((r + g + b) / 3);
                colorSum += avg;
            }
            imgData.r = r;
            imgData.g = g;
            imgData.b = b;
            imgData.avg = avg;
            imgData.brightness = Math.floor(colorSum / (imgEl.width * imgEl.height));
            return imgData;
        },

    },

    setImage: function(imageEl) {
        var _this = this;
        var img = new Image;
        img.onload = function() {
            _this.data.
        }
    },
    setImageAttributes: function(rgbObj, brightness) {

    },
    getImage: function() {
        return imageBlob;
    }

};