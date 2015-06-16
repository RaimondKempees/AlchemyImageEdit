<%@ Page Language="C#" AutoEventWireup="true" Inherits="Tridion.Web.UI.Editors.CME.Views.Page" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html class="tridion popupdialog" id="EditDialog" xmlns="http://www.w3.org/1999/xhtml" xmlns:c="http://www.sdltridion.com/web/ui/controls">
<head>
	<title>Image Edit</title>
	<cc:tridionmanager runat="server" editor="CME" isstandaloneview="false">
			<dependencies runat="server">		
				<dependency runat="server">Tridion.Web.UI.Editors.CME</dependency>
				<dependency runat="server">Alchemy.Plugins.ImageEdit.Resources.ImageEditResourceGroup</dependency>
			</dependencies>
		</cc:tridionmanager>
</head>
<body id="Stack" class="stack horizontal fixed">
	<div class="dialogtitle stack-elem" id="DialogTitle">Image Edit</div>
	<div class="stack-calc form fieldgroup line fieldbuilder">
		<div class="field">
			<div id="ElementsSelectedLabel"></div>
		</div>

		<div class="sub-header">Edit Image</div>

		<div class="field">
			<div>
				<input id="ColorRed" name="ColorRed" type="range" min="0" max="360" step="10" />
				<label for="ColorRed">Red</label>
			</div>
		</div>		
		
		<div class="field">
			<div>
				<input id="ColorGreen" name="ColorGreen" type="range" min="0" max="360" step="10" />
				<label for="ColorGreen">Green</label>
			</div>
		</div>		
		
		<div class="field">
			<div>
				<input id="ColorBlue" name="ColorBlue" type="range" min="0" max="360" step="10" />
				<label for="ColorBlue">Blue</label>
			</div>
		</div>

		<div class="sub-header" id="Preview-Area-Section">Preview</div>
		
		<div class="field" id="PreviewArea">
			<img id="MultimediaImage" alt="image preview" src="data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=" />
		</div>

	</div>
	<div class="BtnWrapper touchButtonWrapper stack-elem">
		<div class="rightbuttons">
			<c:button id="Edit" class="button2013 touchButton green" runat="server" label="Edit" />
			<c:button id="Cancel" class="button2013 touchButton gray" runat="server" label="<%$ Resources: Tridion.Web.UI.Strings, Cancel %>" />
		</div>
	</div>
	<script type="text/javascript">

		$display.registerView(Alchemy.Popups.EditDialog);
	</script>
</body>
</html>
