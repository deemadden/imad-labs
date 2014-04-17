using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace ScavhnService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract (Namespace="http://scavhn.sftsrc.com")]
    public interface IRestService
    {
		// OPTIONS Operation
		[OperationContract]
		[WebInvoke(UriTemplate = "*", Method = "OPTIONS", ResponseFormat = WebMessageFormat.Json)]
		bool Options();

        // GET Operation
        [OperationContract]
        [WebGet(UriTemplate="/scavs?withItems={withItems}", ResponseFormat = WebMessageFormat.Json)]
        Scav[] GetAll(string withItems);

        [OperationContract]
        [WebGet(UriTemplate = "/scavs/{name}", ResponseFormat = WebMessageFormat.Json)]
        ScavBase GetScav(string name);

        // PUT Operation
        [OperationContract]
        [WebInvoke(UriTemplate="/found/{id}", Method="PUT", ResponseFormat = WebMessageFormat.Json)]
        bool FoundScav(string id);

    }


    [DataContract (Namespace="http://scavhn.sftsrc.com/scav")]
    public class Scav : ScavBase
    {
        string _name;
        string _level;
        string _description;
        string _scavTimeLength;
		string _image;
		string _imageType;
		string _thumbnail;
		string _thumbnailType;

        [DataMember]
        public string name
        {
            get { return _name; }
            set { _name = value; }
        }

        [DataMember]
        public string level
        {
            get { return _level; }
            set { _level = value; }
        }

        [DataMember]
        public string description
        {
            get { return _description; }
            set { _description = value; }
        }

        [DataMember]
        public string scavTimeLength
        {
            get { return _scavTimeLength; }
            set { _scavTimeLength = value; }
        }

		[DataMember]
		public string image
		{
			get { return _image; }
			set { _image = value; }
		}

		[DataMember]
		public string imageType
		{
			get { return _imageType; }
			set { _imageType = value; }
		}

		[DataMember]
		public string thumbnail
		{
			get { return _thumbnail; }
			set { _thumbnail = value; }
		}

		[DataMember]
		public string thumbnailType
		{
			get { return _thumbnailType; }
			set { _thumbnailType = value; }
		}
    }

    [DataContract(Namespace = "http://scavhn.sftsrc.com/scavBase")]
    public class ScavBase
    {
        string _id;
        ScavItem[] _scavItems;

        [DataMember]
        public string id
        {
            get { return _id; }
            set { _id = value; }
        }

        [DataMember]
        public ScavItem[] scavItems
        {
            get { return _scavItems; }
            set { _scavItems = value; }
        }
    }

    [DataContract(Namespace = "http://scavhn.sftsrc.com/item")]
    public class ScavItem
    {
        string _id;
        string _itemName;
		string _image;
		string _imageType;
        string _pointValue;
        string _pointColor;
        string _hint;
        Coordinates _coordinates;


        [DataMember]
        public string id
        {
            get { return _id; }
            set { _id = value; }
        }

		[DataMember]
		public string itemName
		{
			get { return _itemName; }
			set { _itemName = value; }
		}

		[DataMember]
		public string image
		{
			get { return _image; }
			set { _image = value; }
		}

		[DataMember]
		public string imageType
		{
			get { return _imageType; }
			set { _imageType = value; }
		}

        [DataMember]
        public string pointValue
        {
            get { return _pointValue; }
            set { _pointValue = value; }
        }

        [DataMember]
        public string pointColor
        {
            get { return _pointColor; }
            set { _pointColor = value; }
        }

        [DataMember]
        public string hint
        {
            get { return _hint; }
            set { _hint = value; }
        }

        [DataMember]
        public Coordinates coordinates
        {
            get { return _coordinates; }
            set { _coordinates = value; }
        }
    }

    [DataContract(Namespace = "http://scavhn.sftsrc.com/coordinates")]
    public class Coordinates
    {
        string _latitude;
        string _longitude;

        [DataMember]
        public string latitude
        {
            get { return _latitude; }
            set { _latitude = value; }
        }
        [DataMember]
        public string longitude
        {
            get { return _longitude; }
            set { _longitude = value; }
        }
    }
}
