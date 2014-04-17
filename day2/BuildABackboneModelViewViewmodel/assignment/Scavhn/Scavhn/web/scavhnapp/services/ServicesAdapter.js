/**
 * Created by deemadden on 9/11/13.
 */
define(

  'services/ServicesAdapter',

  [ 'services/ServicesManager',
    // TODO: You will need to replace the placeholder ScavCollection below with a real ScavCollection class, which will be a subclass of Backbone.Collection.
    'models/ScavCollection_REPLACE_THIS_FOR_STEP_3_KOANS',
    'models/ScavItemCollection',
    'helpers/DateFormatter',
    'utils/Debug'
  ],

  function(ServicesManager, ScavCollection_REPLACE_THIS_FOR_STEP_3_KOANS, ScavItemCollection, DateFormatter, Debug)
  {
    /**
     *  ServicesAdapter
     *  Main Web and Application Services layer
     *  Manages the server and JS <> iOS interactions through ServicesManager and IOSRouteMediatorBridge
     *  and the different Backbone Collections and data states.
     *
     *  [Events]
     *
     */
    var ServicesAdapter = Backbone.Model.extend({
      // TODO: defaults: are the Backbone equivalent of private members.
      // TODO: You will need to add one to store the Scavs backbone collection
      // TODO: You're going to write below.
      defaults:
      {
        currentScavId: null,
        selectedScav: null,
        selectedScavStartDateTimeObject: null,
        selectedScavExpiryDateTimeObject: null,
		    recentScavItem: null,

        // TODO: Add a scavs property here...

        player: null,
        isComingFromHomeScreen: false,
        isDeviceRunningIOS7: false
      },

      initialize: function()
      {
        ServicesManager.setServicesAdapterReference(this);

        // TODO: Once you have your real ScavCollection in place, you will need to replace the instantiation of the ScavCollection placeholder getting done here
        // this.set('scavs', new ScavCollection_REPLACE_THIS_FOR_STEP_3_KOANS(), { silent: true });
      },

      /**
       *
       * TODO: Scavhn Launch - You will need to setup an application services 'get' call in here that
       * TODO: in turn calls into the ServicesManager, with bindings to the service manager's
       * TODO: success and fail callbacks.
       *
       * TODO: The getScavItems... methods below should help give you some ideas as to what you need to do.
       * TODO: Use underscore's _.bind for the callbacks
       * TODO: and setup a Backbone event to trigger that your viewmodel can bind to
       *
       */

      /**
       *
       *
       * Scavhn Launch
       *
       *
       */

      // TODO: Drop your ServicesAdapter methods here.  The getScavs() method,
      // TODO: and its associated getScavsSuccess and getScavsFailure callbacks


      saveUserScavItemsForScav: function(scavName, scavID, startTime)
      {
        Debug.log('ServicesAdapter.getScavItemsForScav');

        ServicesManager.saveUserScavItemsForScav({ 'name': scavName, '_id': scavID, startTime: startTime },
          _.bind(this.saveUserScavItemsForScavSuccess, this), _.bind(this.saveUserScavItemsForScavFailure, this));
      },

      saveUserScavItemsForScavSuccess: function(json)
      {
        Debug.log('ServicesAdapter.saveUserScavItemsForScavSuccess');

        var scavName = this.get('selectedScav').get('name');

        this.getUserScavItemsForScav(scavName);
      },

      saveUserScavItemsForScavFailure: function(xhr, status, errorHolder)
      {
        Debug.log('ServicesAdapter.saveUserScavItemsForScavFailure');

        this.trigger('getUserScavItemsForScav:failure', [xhr, status, errorHolder]);
      },

      getUserScavItemsForScav: function(scavName)
      {
        Debug.log('ServicesAdapter.getUserScavItemsForScav');

        ServicesManager.getUserScavItemsForScav({
            'name': scavName
          },
          _.bind(this.getUserScavItemsForScavSuccess, this), _.bind(this.getUserScavItemsForScavFailure, this));
      },

      getUserScavItemsForScavSuccess: function(json)
      {
        Debug.log('ServicesAdapter.getUserScavItemsForScavSuccess', json);

        // Set Mongo's internally generated UserScavId on our
        // Scav's scavMongoId property
        this.get('selectedScav').set('scavMongoId', json._id);

        // Populate the ScavItems collection
        this._populateScavItems(json);

        // Let the consumer know we're done.
        this.trigger('getUserScavItemsForScav:success');
      },

      getUserScavItemsForScavFailure: function(xhr, status, errorHolder)
      {
        Debug.log('ServicesAdapter.getUserScavItemsForScavFailure');

        this.trigger('getUserScavItemsForScav:failure', [xhr, status, errorHolder]);
      },

      setRecentScavItem: function(id)
      {
      	this.set('recentScavItem', this.get('selectedScav').get('items').findWhere({ '_id': id }));
      },

      getRecentScavItem: function()
      {
      	return this.get('recentScavItem');
      },

      /**
       * HELPER FUNCTIONS
       */
      getCurrentHTML5GeolocationPosition: function()
      {
        if(navigator.geolocation)
          navigator.geolocation.getCurrentPosition(
            _.bind(this.getPositionSuccess, this),
            _.bind(this.getPositionFailure, this),
            { maximumAge:30000,
              timeout:10000,
              enableHighAccuracy:true }
          );
      },

      getPositionSuccess: function(position)
      {
        Debug.log('ServicesAdapter: Retrieved current location: ', position);

          this.trigger('getCurrentHTML5GeolocationPosition:success', position);
      },

      getPositionFailure: function(error)
      {
        Debug.log('There was a problem retrieving the current location.', error);

        this.trigger('getCurrentHTML5GeolocationPosition:failure', error);
      },

      verifyScavItemFound: function(data)
      {
        ServicesManager.verifyScavItemFound(data, _.bind(this.verifyScavItemFoundSuccess, this), _.bind(this.verifyScavItemFoundFailure, this));
      },

      verifyScavItemFoundSuccess: function()
      {
        Debug.log('ServicesAdapter > verifyScavItemFoundSuccess');

        // Do game accounting
        this._updateRecentScavItem('FOUND');

        this.trigger('verifyScavItemFound:success');
      },

      verifyScavItemFoundFailure: function(xhr, status, errorHolder)
      {
        Debug.log('ServicesAdapter > verifyScavItemFoundFailure: ', xhr, status, errorHolder);

        this._updateRecentScavItem('ACTIVE');

        this.trigger('verifyScavItemFound:failure');
      },

      saveScavItemPictureTakenByPlayer: function(data)
      {
        ServicesManager.saveScavItemPictureTakenByPlayer(data, _.bind(this.saveScavItemPictureTakenByPlayerSuccess, this), _.bind(this.saveScavItemPictureTakenByPlayerFailure), this);
      },

      saveScavItemPictureTakenByPlayerSuccess: function(json)
      {
        Debug.log('ServicesAdapter > saveScavItemPictureTakenByPlayerSuccess', json);

        this.trigger('saveScavItemPictureTakenByPlayer:success', json);
      },

      saveScavItemPictureTakenByPlayerFailure: function()
      {
        Debug.log('ServicesAdapter > saveScavItemPictureTakenByPlayerFailure');

        this.trigger('saveScavItemPictureTakenByPlayer:failure');
      },

      calculateScavExpiry: function () {
        var startDate = this.get('selectedScavStartDateTimeObject');
        var duration = this.get('selectedScav').get('duration');
        var durationInMilliseconds = this._getMilliseconds(duration);
        // For testing "GAME OVER" state.
        // var durationInMilliseconds = this._getMilliseconds('00:00:10');
        var startDateInMilliseconds = startDate.getTime();

        var expiryDate =  new Date(startDateInMilliseconds + durationInMilliseconds);

        Debug.log('EXPIRY TIME: ', expiryDate.toLocaleString());

        this.set('selectedScavExpiryDateTimeObject', expiryDate);
      },

      /**
       * PRIVATE FUNCTIONS
       */
      // TODO: Write a private helper method here
      // TODO: that populates the Scav model and collection you built.
      // TODO: See _populateScavItems as an example.

      // TODO: drop your _populateScavs method here...


      _populateScavItems: function(json)
      {
        Debug.log(json);
        this.get('selectedScav').setScavItems(json.items);
      },

      _updateRecentScavItem: function (status)
      {
        this.getRecentScavItem().set('status', status);
        this.getRecentScavItem().set('dateTimeFoundAttempt', new Date());
      },

      _getMilliseconds: function(durationString)
      {
        var durationCollection = durationString.split(':');
        var durationCollectionLength = durationCollection.length; // number of array items

        var millisecondsTotal = 0; // milliseconds result

        if(durationCollectionLength > 0) // seconds
        {
          var secondsMillisecondsCollection = durationCollection[durationCollectionLength-1].split('.');
          if(secondsMillisecondsCollection.length > 1)
          {
            var milliseconds = secondsMillisecondsCollection[1];
            while (milliseconds.length < 3) milliseconds += '0'; // ensure we deal with thousands
            millisecondsTotal += milliseconds - 0; // ensure we deal with numbers
          }
          millisecondsTotal += secondsMillisecondsCollection[0] * 1000;

          if(durationCollectionLength > 1) // minutes
          {
            millisecondsTotal += durationCollection[durationCollectionLength-2] * 60 * 1000;

            if(durationCollectionLength > 2) // hours
            {
              millisecondsTotal += durationCollection[durationCollectionLength-3] * 60 * 60 * 1000;
            }
          }
        }

        return millisecondsTotal;
      }
    });

    return new ServicesAdapter();
  }
);

