/**
 * Created by deemadden on 9/11/13.
 */
(function()
{

  var id = 'viewmodels/HomeScreenViewModel';

  define(

    id,

    [ 'App',
      'services/ServicesAdapter',
      'mediator/RouteMediator',
      'helpers/CSSHelper',
      'utils/Debug' ],

    function(App, ServicesAdapter, RouteMediator, CSSHelper, Debug)
    {
      var HomeScreenViewModel = Backbone.Model.extend({

        defaults: {
          view: null
        },

        initialize: function()
        {
          App.getInstance().registerDep(id, this);
        },

        activateWithData: function()
        {
          // TODO: Make the method call to setup your bindings here.  See ScavItemsViewModel for examples.

          // TODO: Make the ServicesAdapter call to get data.  You will need to bind success/failure methods to the events you setup in there.  See examples in other viewmodels.
          // TODO: The data parameter getting passed in is merely a convention for the purposes of this viewmodel and lab.  We're asking the REST server for all scavs and doing no
          // TODO: filtering, so there is nothing to do with it for the purposes of this lab.

        },

        deactivate: function()
        {
          // Called when the user navigates away from this view
          // TODO: Call .unbindObservers and Unbind everything that was setup in the .bindObservers method
          this.unbindObservers();

          // TODO: Get a handle to the view that was set on the viewmodel by the RouteMediator,
          // TODO: hint: this is a Backbone.Model at the end of the day, so use this.get([property we're getting])

          // TODO: call the view's deactivate() method to (unload) it

          // TODO: Clear out the viewmodel's view property hint: this.set([property we're setting], null)

        },

        bindObservers: function()
        {
          // TODO: Wire up begin scav click event to to a beginScav method you will need to write and implement.
          // TODO: See ScavItemsViewModel's bindObservers method for examples

          // TODO: Wire up begin scav click event to to a setCurrentScav method you will need to write and implement.
          // TODO: See ScavItemsViewModel's bindObservers method for examples

          // setup some callback events to bind to for the web service request
          // TODO: Subscribe to the ServicesAdapter's success and fail events for getScavs()
          // TODO: and bind them to a local success and failure callback

          ServicesAdapter.on('getCurrentHTML5GeolocationPosition:success', this.getPositionSuccess, this);
          ServicesAdapter.on('getCurrentHTML5GeolocationPosition:failure', this.getPositionFailure, this);
        },

        unbindObservers: function()
        {
          // TODO: Unbind click events and unsubscribe from ServicesAdapter events
          // TODO: that were setup above. This gets called when leaving the view,
          // TODO: so all of the bindings need to be cleaned up.

          ServicesAdapter.off('getCurrentHTML5GeolocationPosition:success', this.getPositionSuccess, this);
          ServicesAdapter.off('getCurrentHTML5GeolocationPosition:failure', this.getPositionFailure, this);
        },

        // ServicesAdapter callbacks

        // TODO: Write a getScavsSuccess callback.  The failing koans should help with what needs to be done here.
        // TODO: hint: we're stringing an asynchronous RESTful call together with a HTML5 geolocation call,
        // TODO: which is also asynchronous, so the getScavsSuccessCallback needs to call ServicesAdapter's
        // TODO: getCurrentHTML5GeolocationPosition method.  The callback bindings are already setup for this.

        // TODO: Write a getScavsFailure callback.  Check the koans to see what they expect to happen.


        getPositionSuccess: function()
        {
          Debug.log('HomeScreenViewModel > getPositionSuccess!');

          this.get('view').activate(this.viewData());
        },

        getPositionFailure: function()
        {
          Debug.log('HomeScreenViewModel > getPositionFailure: an error occurred retrieving the current geolocation info.');
        },

        // TODO: Write a click event method for setting the user-selected scavid on the viewmodel's currentScavId property here
        setCurrentScav: function(selectedScavId)
        {
          ServicesAdapter.set('currentScavId', selectedScavId);
        },

        // TODO: Write a click event method for starting the game and navigating into the ScavItems view.
        // TODO: within this, you will need to:
        // TODO: 1. Get a local instance of ServiceAdapter's 'currentScavId'
        // TODO: 2. use currentScavId to get a local instance of the associated Scav object
        // TODO:    from ServiceAdapter's 'scavs' accessor
        // TODO: 3. Call RouteMediator's navigateTo method, passing it the route entry you created in the RouteStore class


        // TODO: The viewData() method is required convention in all Scavhn viewmodels.
        // TODO: It should return a dictionary of any data the view will need at render time
        // TODO: key: this.getSomeSortOfData() - good pattern for testability
        // TODO: somewhere in the success callback on the last service call needed, you'll do something like
        //
        // TODO: this.get('view').activate(this.viewData());
        //
        // TODO: the failing koan will provide a description of what needs to happen
        viewData: function() {

          // TODO: Get the scavs on the ServicesAdapter

          // TODO: Start the work to get the data the view needs.  You will need to build a javascript array, set the array
          // TODO: as a value on a dictionary, and return it.
          // TODO: NOTE: If you'd prefer to build the data collection as a dictionary, be aware that your koan will fail.
          // TODO: You might want to update the expected return product to get your koan green again,
          // TODO: and review your changes with the Instructor.
          //var scavCollectionForView = [];
          //
          //for(var i = 0; i < scavs.length; i++)
          //{
          //  var scavImageUrl = CSSHelper.getBackgroundURLPathForAnchor('homescreen', scavs.at(i).get('image'), scavs.at(i).get('imageType'), false, null, null);

          //  var scavDataForView = {
          //    'id': scavs.at(i).get('_id'),
          //    'name': scavs.at(i).get('name'),
          //    'level': scavs.at(i).get('level'),
          //    'backgroundImageURL': scavImageUrl
          //  };

          // scavCollectionForView.push(scavDataForView);
          //}

          //return { 'scavViewData': scavCollectionForView };

          // TODO: Remove this once implemented
          return { 'scavViewData' : null };
        }
      });

      return new HomeScreenViewModel();
    }
  );
})();
