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

		$evt.addEventHandler(c.colorRed, "change", this.getDelegate(this._updateControlsState));
		$evt.addEventHandler(c.colorBlue, "change", this.getDelegate(this._updateControlsState));
		$evt.addEventHandler(c.colorGreen, "change", this.getDelegate(this._updateControlsState));

		c.previewArea = $("#PreviewArea");

		c.MultimediaImage = $("#PreviewArea");

		$controls.getControl($("#Stack"), "Tridion.Controls.Stack");

		c.BtnRename = $controls.getControl($("#Rename"), "Tridion.Controls.Button");
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
Tridion.Cme.Views.Component.prototype.onThumbnailLoadFailed = function Component$onThumbnailLoadFailed()
{
	var p = this.properties;

	// remove our eventhandler
	if (p.thumbnailImage)
	{
		$evt.removeEventHandler(p.thumbnailImage, "error", this.getDelegate(this.onThumbnailLoadFailed));
	}

	console.log("can not load image");

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
	}
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

$display.registerView(Alchemy.Popups.EditDialog);