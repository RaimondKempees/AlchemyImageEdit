/**
 * Creates an anguilla command using a wrapper shorthand. The command will communicate with the web service
 * to return a message.
 *
 * Note the ${PluginName} will get replaced by the actual plugin name.
 */
Alchemy.command("${PluginName}", "HelloWorld", {
	/**
     * Whether or not the command is enabled for the user (will usually have extensions displayed but disabled).
     * @returns {boolean}
     */
	_isEnabled: function (selection)
	{
		var item = selection && (selection.getCount() != 1) && selection.getItem(0);
		return (Type.implementsInterface(item, "Tridion.ContentManager.Component") && item.isMultimedia());
	},

	/**
     * Whether or not the command is available to the user.
     * @returns {boolean}
     */
	_isAvailable: function ()
	{
		return true;
		// Disable so far, but base command should be called to check if items is readonly
		//return this.callBase("Tridion.Cme.Command", "_isAvailable", [selection]);
	},

	/**
     * Executes your command. You can use _execute or execute as the property name.
     */
	execute: function () {

		var popupUri = "${ViewsUrl}Views/Popups/EditDialog.aspx?item=" + selectedItem + "&r=" + new Date().getTime();

		var modalPopup = $popupManager.createExternalContentPopup(
			popupUri,
			{ width: 400, height: 600 },
			{
				itemIds: selection.getItems().slice(),
				popupType: Tridion.Controls.Popup.Type.MODAL_IFRAME
			});
		
			function Alchemy$_execute$onCreationOptionsLoaded_closePopup(event)
			{
				modalPopup.close();
			};

			function Alchemy$_execute$onCreationOptionsLoaded_disposePopup(event)
			{
				(event && event.source) && event.source.dispose();
			};

			$evt.addEventHandler(modalPopup, "update", function Alchemy$_execute$onCreationOptionsLoaded$_onAddToExisting(event)
			{
				var item = Selection.getItem(0);
				var data = event.data;

				//var progress = $messages.registerProgress("Getting api version...", null),
				//    userName = "rai";

				//// This is the error first callback pattern that the webapi proxy js exposes. Look at another example to
				//// see how the promise pattern can also be used.

				//// The call back must go as last parameter of action method.
				//Alchemy.Plugins.${PluginName}.Api.Service.helloWorld(userName, function (error, message) {
				//	progress.finish({ success: true });
				//	if (error) {
				//		// error will only exist if there was an error, otherwise it'll be null.
				//		$messages.registerError("There was an error", error.message);
				//	}
				//	$messages.registerGoal(message, null);
				//});

				Alchemy$_execute$onCreationOptionsLoaded_closePopup();
		});

			$evt.addEventHandler(modalPopup, "closed", Alchemy$_execute$onCreationOptionsLoaded_disposePopup);
			$evt.addEventHandler(modalPopup, "cancel", Alchemy$_execute$onCreationOptionsLoaded_closePopup);

			modalPopup.open();
	}

});