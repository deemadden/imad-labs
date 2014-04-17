using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;

namespace ScavhnService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.
    [AspNetCompatibilityRequirements(RequirementsMode=AspNetCompatibilityRequirementsMode.Allowed)]
    public class RestService : IRestService
    {
        private Scav[] _scavs;

        public Scav[] GetAll(string withItems)
        {
            if (withItems != null && withItems.ToUpper() == "Y")
            {
                LoadScavs(true);
            }
            else
            {
                LoadScavs(false);
            }
            return _scavs;
        }

		public bool Options()
		{
			return true;
		}

        public ScavBase GetScav(string name)
        {
            LoadScavs(true);
            var scav = _scavs.Where(x => x.name == name).FirstOrDefault();
            if (scav != null)
            {
                return new ScavBase() { id = scav.id, scavItems = scav.scavItems };
            }
            return new ScavBase();
        }

        public bool FoundScav(string id)
        {
            if (id == "5078ad1ada061b6ff15ca90f")
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.RequestedRangeNotSatisfiable;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = "Item is not found here.";
                return false;
            }
            else
            {
                WebOperationContext.Current.OutgoingResponse.StatusCode = HttpStatusCode.OK;
                WebOperationContext.Current.OutgoingResponse.StatusDescription = "Item is found.";
                return true;
            }
        }

        private void LoadScavs(bool withItems)
        {
            string json = File.ReadAllText(Path.Combine(System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath, "scavhn.json"));
            JavaScriptSerializer ser = new JavaScriptSerializer();
            dynamic obj = ser.DeserializeObject(json);
            List<Scav> scavs = new List<Scav>();

            foreach (var s in obj)
            {
                Scav scav = new Scav()
                {
                    id = s.ContainsKey("id") ? s["id"] : "",
                    description= s.ContainsKey("description") ? s["description"] : "",
                    name = s.ContainsKey("name") ? s["name"] : "",
                    level = s.ContainsKey("level") ? s["level"] : "",
                    image = s.ContainsKey("image") ? s["image"] : "",
                    imageType = s.ContainsKey("imageType") ? s["imageType"] : "",
					thumbnail = s.ContainsKey("thumbnail") ? s["thumbnail"] : "",
					thumbnailType = s.ContainsKey("thumbnailType") ? s["thumbnailType"] : "",
                    scavTimeLength = s.ContainsKey("scavTimeLength") ? s["scavTimeLength"] : ""
                };

                if (withItems && s.ContainsKey("scavItems"))
                {
                    List<ScavItem> scavItems = new List<ScavItem>();
                    foreach (var i in s["scavItems"])
                    {
                        scavItems.Add(new ScavItem()
                        {
                            id = i.ContainsKey("id") ? i["id"] : "",
							itemName = i.ContainsKey("itemName") ? i["itemName"] : "",
							image = i.ContainsKey("image") ? i["image"] : "",
							imageType = i.ContainsKey("imageType") ? i["imageType"] : "",
                            hint = i.ContainsKey("hint") ? i["hint"] : "",
                            pointColor = i.ContainsKey("pointColor") ? i["pointColor"] : "",
                            pointValue = i.ContainsKey("pointValue") ? i["pointValue"] : "",
                            coordinates = i.ContainsKey("coordinates") ? (new Coordinates() 
                            { 
                                latitude = i["coordinates"].ContainsKey("latitude") ? i["coordinates"]["latitude"] : "", 
                                longitude = i["coordinates"].ContainsKey("longitude") ? i["coordinates"]["longitude"] : ""
                            }) : new Coordinates() { latitude = "", longitude = "" }
                        });
                    }

                    scav.scavItems = scavItems.ToArray();
                }

                scavs.Add(scav);
            }

            _scavs = scavs.ToArray();
           
        }
	}
}
