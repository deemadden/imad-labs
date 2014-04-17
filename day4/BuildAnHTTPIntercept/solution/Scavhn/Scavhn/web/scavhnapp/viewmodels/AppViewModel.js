/**
 * Created by deemadden on 9/11/13.
 */
(function()
{

  var id = 'viewmodels/AppViewModel';

  define(

    id,

    [ 'App',
      'mediator/RouteMediator',
      'utils/Debug',
      'services/ServicesAdapter' ],

    function(App, RouteMediator, Debug, ServicesAdapter)
    {
      /**
       *  Model for the main "shell" (everything that happens at the parent level of view-root
       */
      return Backbone.Model.extend({
        defaults: {
          view: null
        },

        initialize: function()
        {
          Debug.log('AppViewModel.initialize()');

          RouteMediator.on('page-changed', this.onPageChange, this);

          Debug.log('App.getInstance()', App.getInstance().registerDep);

          App.getInstance().registerDep(id, this);
        },

        bindObservers: function() {
        },

        unbindObservers: function() {
        },

        deactivate: function()
        {
          this.unbindObservers();
          this.get('view').deactivate();
        },

        activate: function()
        {
          this.get('view').activate();
          this.bindObservers();
        },

        rerender: function()
        {
          this.bindObservers();
        },

        updateNavigation: function(updateNavigationString)
        {
          //this.get('view').headerView.updateNavigation(headerNavigationString);
        },

        /**
         *  showLoadIndicator
         *  Show the load indicator, blocking all interaction with the site
         */
        showLoadIndicator: function(callback)
        {
          this.get('view').loadIndicatorView.$el.show(0, callback);
        },

        /**
         *  hideLoadIndicator
         *  Hide the load indicator, enabling all interaction with site
         */
        hideLoadIndicator: function(callback)
        {
          this.get('view').loadIndicatorView.$el.hide(0, callback);
        },

        onPageChange: function(pageChangeString)
        {
          // Page change event that is wired up on initialize.
          // Not doing anything meaningful with it yet.
          Debug.log('AppViewModel > onPageChange');
        }
      });
    });
})();

