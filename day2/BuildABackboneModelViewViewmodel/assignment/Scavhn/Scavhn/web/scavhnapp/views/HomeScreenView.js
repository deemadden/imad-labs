define(

  'views/HomeScreenView',

  [ 'App',
    'views/BaseView',
    'text!partials/home-screen_LAST_STEP_BIND_TEMPLATE_DATA_TO_THIS_PARTIAL.html',
    'utils/Debug' ],

  function(App, BaseView, template, Debug)
  {
    return BaseView.extend({

      // TODO: Implement HomeScreenView - subclasses BaseView, which in turn subclasses Backbone.View
      // TODO: See other views for examples to help with the TODOs below

      cachedTemplate: _.template(template),

      // TODO: Add a property for scavCollection.

      scavCollection: null,

      // TODO: Implement events.
      // TODO: Create a begin scav binding to the beginScavClick method
      // TODO: Create a scav level binding to the selectScavClick method
      events: {
      },

      onInitialize: function(opts)
      {
      },

      activate: function(data)
      {
        Debug.log('HomeScreenView -> activate()');

        // TODO: If you set your viewData up correctly in your viewmodel, you should have a dictionary with a single key and
        // TODO: and a value that is the array of data objects that the view can bind to.
        // TODO: Set that key's value to the scavCollection property you created above.


        // TODO: Now that you have data to play with, make a call to .render()

      },

      deactivate: function()
      {
        // TODO: Make a call to Backbone.View's .undelegateEvents() method to clear out all event bindings.
        // TODO: This view already indirectly inherits from Backbone.View, so it'll be hanging off of 'this'
      },

      render: function()
      {
        // TODO: Call this.$el's .html() method (which is actaully jQuery, as .$el is a handle to jQuery that is local to
        // TODO: the parent element you are injecting your partial into), handing it the .cachedTemplate, and passing a
        // TODO: dictionary of data into .cachedTemplate.  The dictionary should look something like:
        // TODO: {
        // TODO:    title: 'Select Difficulty',
        // TODO:    buttonLabel: 'Begin',
        // TODO:    scavCollection: this.scavCollection
        // TODO:  }
        // TODO: As with much of the code you are writing, check other view's .render() methods for
        // TODO: examples.

        // TODO: Implement the method below.  It uses jQuery to
        // TODO: gather up all of the Scav level 'highlighted' elements,
        // TODO: hides them, and then gathers up all of the Scav level
        // TODO: span elements and removes the .highlight-cta-text CSS class
        // TODO: if it exists on the element
        this.resetHighlightedScavItems();

        // TODO: Call Backbone.View's .delegateEvents() to bind everything.  Like undelegate() above,
        // TODO: It will already be hanging off of 'this'

      },

      selectScavClick: function(e)
      {
        e.preventDefault();

        Debug.log('selectScavClick');

        // TODO: Another usage of the reset method above.  Needs to be implemented.
        this.resetHighlightedScavItems();

        // TODO: Implement the method below
        // TODO: This needs to do some jQuery work
        // TODO: to do the inverse of the work that is done by resetHighlightedScavItems().
        // TODO: See method declaration for instructions
        this.highlightSelectedItem(e);

        this.updateBeginButtonState();

        // TODO: Call Backbone's .trigger on the '...selected:' click event you created in the HomeScreenViewModel
        this.trigger('scav-selected:click', $(e.currentTarget).data('scavid'));
      },

      beginScavClick: function(e)
      {
        e.preventDefault();

        // If the button is currently in a disabled state, we're not going to start the game.
        // So kick out
        if(this.isBeginButtonDisabled(e))
          return;

        // Do a Backbone.trigger on the 'begin-scav:click' event to start the game
        this.trigger('begin-scav:click');
      },

      // Helper methods
      resetHighlightedScavItems: function()
      {
        // TODO: gather up all of the Scav level 'highlighted' elements,
        // TODO: hint: $('div[class$=\'highlighted\']')

        // TODO: hide them ($.hide())

        // TODO: Gather up all of the Scav level span elements
        // TODO: hint: $('div[class$=\'item\'] a span')

        // TODO: And removes the .highlight-cta-text CSS class
        // TODO: if it exists on the element (you'll need to use $.hasClass() and $.removeClass())

      },

      highlightSelectedItem: function(e)
      {
        // TODO: Get the Scav level 'highlighted' element by looking for it on $(e.currentTarget)
        // TODO: hint: .siblings('div[class$=\'highlighted\']')

        // TODO: hide them ($.show())
        $highlightedElementForScavTouched.show();

        // TODO: Get the Scav level span element using $(e.currentTarget)

        // TODO: And toggles the .highlight-cta-text CSS class
        // TODO: if it DOESN'T exist on the element (you'll need to use "if(!$().hasClass())" and $.toggleClass())
        if(!$ctaText.hasClass('highlight-cta-text'))
          $ctaText.toggleClass('highlight-cta-text');
      },

      updateBeginButtonState: function()
      {
        var $beginButton = $('.begin-scav-action a');

        if ($beginButton.hasClass('ui-cta-large-disabled'))
          $beginButton.toggleClass('ui-cta-large-disabled');
      },

      isBeginButtonDisabled: function(e)
      {
        return $(e.currentTarget).hasClass('ui-cta-large-disabled');
      }
    });
  }
);
