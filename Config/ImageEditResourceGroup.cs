using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Alchemy4Tridion.Plugins.GUI.Configuration;

namespace ImageEdit.Config
{
	public class ImageEditResourceGroup : ResourceGroup
	{
		public ImageEditResourceGroup()
		{
			// When adding files you only need to specify the filename and not full path

			AddFile("HelloWorldCommand.js");
			AddFile("EditDialog.css");
			AddFile("EditDialog.js");
			//AddFile("CanvasEditor.js");

			// AddFile("Hello.css");

			// When referencing commandsets you can just use the generic AddFile with your CommandSet as the type.
			AddFile<ImageEditCommandSet>();

			// The above is just a convinient way of doing the following...
			// AddFile(FileTypes.Reference, "Alchemy.Plugins.HelloWorld.Commands.HelloCommandSet");

			// If you want this resource group to contain the js proxies to call your webservice, call AddWebApiProxy()
			AddWebApiProxy();
			
		}
	}
}
