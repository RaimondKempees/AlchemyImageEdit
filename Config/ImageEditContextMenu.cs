using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace ImageEdit.Config
{
	public class ImageEditContextMenu : ContextMenuExtension
	{
		public ImageEditContextMenu()
		{
			// This is the id which gets put on the html element for this menu (to target with css/js).
			AssignId = "ImageEditContextMenu";
			// The name of the extension menu
			Name = "ImageEditContextMenu";
			// Where to add the new menu in the current context menu.
			InsertBefore = "cm_refresh";

			// Generate all of the context menu items...
//			AddSubMenu("cm_imageedit", "Edit Image") // creates a submenu item and returns it so you can chain items to it

			AddItem("cm_helloworld", "Edit Image", "HelloWorld");
			// We need to addd our resource group as a dependency to this extension
			Dependencies.Add<ImageEditResourceGroup>();

			// Actually apply our extension to a particular view.  You can have multiple.

			// TODO: see if we can apply it to the component view
			Apply.ToView(Constants.Views.DashboardView);
		}
	}

}
