using Alchemy4Tridion.Plugins;
using System.Web.Http;

namespace ImageEdit.Controllers
{
    [AlchemyRoutePrefix(typeof(AlchemyPlugin), "Service")]
    public class ServiceController : AlchemyApiController
    {
        // GET /Alchemy/Plugins/YourPluginName/api/Service/Hello
        [HttpGet]
        [Route("Hello")]
        public string Hello()
        {
            return "Hello World";
        }



    }
}
