Type.registerNamespace("Alchemy.Popups");

Alchemy.Popups.EditDialog = function ExternalContentLibrary$EditDialog()
{
	Tridion.OO.enableInterface(this, "Alchemy.Popups.EditDialog");
	this.addInterface("Tridion.Controls.ModalPopupView");
	this.addInterface("Tridion.Cme.View");

	var p = this.properties;

	p.itemIds = undefined;
};

Alchemy.Popups.EditDialog.prototype.initialize = function EditDialog$initialize()
{
    this.callBase("Tridion.Cme.View", "initialize");

    var p = this.properties;
    var c = p.controls;

    var args = window.dialogArguments;
    p.itemIds = args && args.itemIds;

	var itemsCount = p.itemIds && p.itemIds.length;
	if (itemsCount > 0)
	{
		//c.elementsSelectedLabel = $("#ElementsSelectedLabel");
		/*
		c.newFileName = $("#NewFileName");
		$evt.addEventHandler(c.newFileName, "valuepropertychange", this.getDelegate(this._generatePreview));
		*/
		c.colorRed = $("#ColorRed");
		c.colorBlue = $("#ColorBlue");
		c.colorGreen = $("#ColorGreen");

		$evt.addEventHandler(c.colorRed, "change", this.getDelegate(this._updateGeneratedPreview));
		$evt.addEventHandler(c.colorBlue, "change", this.getDelegate(this._updateGeneratedPreview));
		$evt.addEventHandler(c.colorGreen, "change", this.getDelegate(this._updateGeneratedPreview));

		c.previewArea = $("#PreviewArea");

		c.MultimediaImage = $("#MultimediaImage");

		$controls.getControl($("#Stack"), "Tridion.Controls.Stack");

		c.BtnRename = $controls.getControl($("#Edit"), "Tridion.Controls.Button");
		c.BtnCancel = $controls.getControl($("#Cancel"), "Tridion.Controls.Button");

		$evt.addEventHandler(c.BtnRename, "click", this.getDelegate(this._onRenameClick));
		$evt.addEventHandler(c.BtnCancel, "click", this.getDelegate(this._onCloseClick));

		this._generatePreview();
	}
	else
	{
		this._onCloseClick();
	}
};

Alchemy.Popups.EditDialog.prototype.getItem = function EditDialog$getItem()
{
	return $models.getItem(this.properties.itemIds[0]);
};

/**
 * Updating Rating representation in View.
 */
Alchemy.Popups.EditDialog.prototype.updateView = function EditDialog$updateView()
{
	var p = this.properties;
	var c = p.controls;

	
	var item = this.getItem();
	//c.newFileName.value = item && (item.getTitle() || item.getStaticTitle()) || "File Name";
	
	this._generatePreview();
};

Alchemy.Popups.EditDialog.prototype.getInstructions = function EditDialog$getInstructions()
{
	var p = this.properties;
	var c = p.controls;
	var instructions = {
		red: c.colorRed.value,
		green: c.colorGreen.value,
		blue: c.colorBlue.value
	};

	return instructions;
}

Alchemy.Popups.EditDialog.prototype._onRenameClick = function EditDialog$_onRenameClick(e)
{
	this.fireEvent("update", this.getInstructions());
};

Alchemy.Popups.EditDialog.prototype._onCloseClick = function EditDialog$_onCloseClick(e)
{
	this.fireEvent("cancel");
};

/**
 * Handles the thumbnail load failed event.
 */
Alchemy.Popups.EditDialog.prototype.onThumbnailLoadFailed = function Component$onThumbnailLoadFailed()
{
	var p = this.properties;

	// remove our eventhandler
	if (p.thumbnailImage)
	{
		$evt.removeEventHandler(p.thumbnailImage, "error", this.getDelegate(this.onThumbnailLoadFailed));
	}

	console.log("can not load image");

};

Alchemy.Popups.EditDialog.editWithCanvas = {
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
	editImageOnCanvas: function (colorObj, userBrightness) {
		this.context.clearRect(0, 0, this.canvasEl.offsetHeight, this.canvasEl.offsetWidth);
		this.addImageToCanvas(this.imageEl);
		console.log(colorObj);
		var pixels = this.context.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height), i = 0, brightness;
		for (; i < pixels.data.length; i += 4) {
			brightness = ((3 * pixels.data[i] + 4 * pixels.data[i + 1] + pixels.data[i + 2]) >>> 3) / 256;
			brightness = userBrightness !== undefined ? ((brightness * userBrightness) + brightness) : brightness;


			pixels.data[i] = colorObj.red != 0 ? ((colorObj.red * brightness) + 0.1) >> 0 : ((pixels.data[i] * brightness) + .1);
			pixels.data[i + 1] = colorObj.green != 0 ? ((colorObj.green * brightness) + 0.1) >> 0 : ((pixels.data[i + 1] * brightness) + .1);
			pixels.data[i + 2] = colorObj.blue != 0 ? ((colorObj.blue * brightness) + 0.1) >> 0 : ((pixels.data[i + 2] * brightness) + .1);
		}
		this.context.putImageData(pixels, 0, 0);
	},
	setImageAttributes: function (rgbObj, brightness) {

	},
	getImage: function () {
		return this.context.toDataURL();
	}
};

Alchemy.Popups.EditDialog.prototype.onThumbnailLoad = function Component$onThumbnailLoad()
{
	var p = this.properties;
	if (p.thumbnailImage)
	{
		p.imageWidth = p.thumbnailImage.width;
		p.imageHeight = p.thumbnailImage.height;

		$evt.removeEventHandler(p.thumbnailImage, "load", this.getDelegate(this.onThumbnailLoad));
		var multimediaImage = p.controls.MultimediaImage;
		multimediaImage.src = p.thumbnailImage.src;
		p.thumbnailImage = null;

		Alchemy.Popups.EditDialog.editWithCanvas.init(p.controls.MultimediaImage);
	}
};

Alchemy.Popups.EditDialog.prototype._updateGeneratedPreview = function EditDialog$_generatePreview(e) {
	Alchemy.Popups.EditDialog.editWithCanvas.editImageOnCanvas(this.getInstructions());
};

Alchemy.Popups.EditDialog.prototype._generatePreview = function EditDialog$_generatePreview(e)
{
	var p = this.properties;


	var item = $display.getItem();

	var thumbnail = String.format("{0}?target=view&maxwidth=320&maxheight=200&uri={1}&mode=thumb",
	$display.getMultimediaHandlerPath(),
	encodeURIComponent(item.getId()));

	/*
	var modifiedDate = item.getLastModifiedDate() || item.getStaticLastModifiedDate();
	if (Type.isDate(modifiedDate))
	{
		thumbnail += "&modified={0}".format(modifiedDate.isoString());
	}*/


	if (thumbnail)
	{
		if (p.thumbnailImage)
		{
			$evt.removeEventHandler(p.thumbnailImage, "load", this.getDelegate(this.onThumbnailLoad));
		}
		p.thumbnailImage = new Image();
		$evt.addEventHandler(p.thumbnailImage, "load", this.getDelegate(this.onThumbnailLoad));
		$evt.addEventHandler(p.thumbnailImage, "error", this.getDelegate(this.onThumbnailLoadFailed));
		p.thumbnailImage.src = thumbnail;
	}
};

Alchemy.Popups.EditDialog.prototype.disposeInterface = Tridion.OO.nonInheritable(function EditDialog$disposeInterface()
{

});