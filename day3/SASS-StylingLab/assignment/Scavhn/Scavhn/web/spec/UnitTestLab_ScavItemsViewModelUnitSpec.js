define(

  [ 'App',
    'viewmodels/ScavItemsViewModel',
    'services/ServicesAdapter',
    'models/Scav',
    'helpers/CSSHelper',
    'utils/Debug' ],

  function (App, ScavItemsViewModel, ServicesAdapter, Scav, CSSHelper, Debug)
  {
    describe("ScavItemViewModel unit tests", function() {

      // Setup before each test
      beforeEach(function() {
        // TODO: Instantiate a Scav, giving it the data from the getVultureScavWithNoItemsForTest Test helper at construction time

        // TODO: Populate the scav items on the scav built above by calling the scav's setScavItems method, and pass it the scav items hanging off of the getScavItemsDataForTest method

        // TODO: Now set it as the selected scav on the ServicesAdapter

        // TODO: ...and set the ServiceAdapter's isDeviceRunningIOS7 to true

        // TODO: Setup a spy on CSSHelper's getBackgroundURLPathForAnchor method

      });

      // Teardown after each test
      afterEach(function() {
        // TODO: Set on the ServiceAdapter's selectedScav property to null

        // TODO: Reset the isDeviceRunningIOS7 property by setting it to false

        // TODO: Do a restore on the getBackgroundURLPathForAnchor that was setup in beforeEach

      });

      // TESTS
      it("Should build a view data package with only the data the view needs to display", function() {

        givenAViewDataCallAtActivateTime();
        whenViewDataIsCalled();
        thenDataNeededByViewIsReturned();

      });

    });

    function givenAViewDataCallAtActivateTime()
    {
      // TODO: Set expectedViewData to the "expected" helper method below.
      // TODO: If everything was setup correctly, this is what your .viewData() call should have produced.


    }

    function whenViewDataIsCalled()
    {
      // TODO: Call .viewData(), and return it to the actualViewData variable.


    }

    function thenDataNeededByViewIsReturned()
    {
      // TODO: The assert below should be coming back green once you've gotten this far.
      expect(JSON.stringify(actualViewData)).toEqual(JSON.stringify(expectedViewData));

      // TODO: Assert that CSSHelper's getBackgroundURLPathForAnchor method was called 21 times.

      // TODO: Assert that the first arg on the first call to getBackgroundURLPathForAnchor was 'scavitemsscreen'

      // TODO: Assert that the first arg on the second call to getBackgroundURLPathForAnchor was 'scavitemsscreen/itemstofind'

      // TODO: Assert that the first arg on the last call to getBackgroundURLPathForAnchor was 'scavitemsscreen/itemstofind'
      // TODO: We're doing this to establish that every other call past the first call happened in the for loop that begins on line 111 of the viewmodel.
    }

    // Global vars
    // TODO: Clear out the "foo" and the "bar" initial values on the variables below
    // TODO: They are stub values to get the test to run and fail
    var expectedViewData = "bar";
    var actualViewData = "foo";

    //Helpers
    function getExpectedViewData() {
      return {
        isDeviceRunningIOS7: true,
        scavId: '52f6d7f845617474b8fd4308',
        scavName: 'vulture',
        scavItems: [{
          id: '52f6d7f845617474b8fd430b',
          imageURLSm: 'background: url(\'resources/img/scavitemsscreen/itemstofind/shoes-sm.png\') center center no-repeat;',
          imageURLLg: 'background: url(\'resources/img/scavitemsscreen/itemstofind/shoes-lg.png\') center center no-repeat;',
          name: 'Old Shoe',
          points: '6',
          hint: 'You will find the item you see...',
          fullHint: 'You will find the item you seek in a car or under a creek'
        },
          {
            id: '52f6d7f845617474b8fd430c',
            imageURLSm: 'background: url(\'resources/img/scavitemsscreen/itemstofind/watch-sm.png\') center center no-repeat;',
            imageURLLg: 'background: url(\'resources/img/scavitemsscreen/itemstofind/watch-lg.png\') center center no-repeat;',
            name: 'Pocket Watch',
            points: '3',
            hint: 'You will find this watch on a ...',
            fullHint: 'You will find this watch on a fence, or in dire need to repent'
          },
          {
            id: '52f6d7f845617474b8fd430d',
            imageURLSm: 'background: url(\'resources/img/scavitemsscreen/itemstofind/typewriter-sm.png\') center center no-repeat;',
            imageURLLg: 'background: url(\'resources/img/scavitemsscreen/itemstofind/typewriter-lg.png\') center center no-repeat;',
            name: 'Typewriter',
            points: '2',
            hint: 'Look to the West, young one!',
            fullHint: 'Look to the West, young one!'
          },
          {
            id: '52f6d7f845617474b8fd430e',
            imageURLSm: 'background: url(\'resources/img/scavitemsscreen/itemstofind/toothbrushes-sm.png\') center center no-repeat;',
            imageURLLg: 'background: url(\'resources/img/scavitemsscreen/itemstofind/toothbrushes-lg.png\') center center no-repeat;',
            name: 'Cup of toothbrushes',
            points: '5',
            hint: 'It is under your nose',
            fullHint: 'It is under your nose'
          },
          {
            id: '52f6d7f845617474b8fd430f',
            imageURLSm: 'background: url(\'resources/img/scavitemsscreen/itemstofind/sock-sm.png\') center center no-repeat;',
            imageURLLg: 'background: url(\'resources/img/scavitemsscreen/itemstofind/sock-lg.png\') center center no-repeat;',
            name: 'Sweat sock',
            points: '1',
            hint: 'Not a Cuckoo clock, but a Cuck...',
            fullHint: 'Not a Cuckoo clock, but a Cuckoo Nest'
          },
          {
            id: '52f6d7f845617474b8fd4310',
            imageURLSm: 'background: url(\'resources/img/scavitemsscreen/itemstofind/necklace-sm.png\') center center no-repeat;',
            imageURLLg: 'background: url(\'resources/img/scavitemsscreen/itemstofind/necklace-lg.png\') center center no-repeat;',
            name: 'Silver Necklace',
            points: '6',
            hint: 'Standing on the edge of the un...',
            fullHint: 'Standing on the edge of the universe'
          },
          {
            id: '52f6d7f845617474b8fd4311',
            imageURLSm: 'background: url(\'resources/img/scavitemsscreen/itemstofind/lego-sm.png\') center center no-repeat;',
            imageURLLg: 'background: url(\'resources/img/scavitemsscreen/itemstofind/lego-lg.png\') center center no-repeat;',
            name: 'Lego House',
            points: '2',
            hint: 'Next to her cheating heart',
            fullHint: 'Next to her cheating heart'
          },
          {
            id: '52f6d7f845617474b8fd4312',
            imageURLSm: 'background: url(\'resources/img/scavitemsscreen/itemstofind/ribbon-sm.png\') center center no-repeat;',
            imageURLLg: 'background: url(\'resources/img/scavitemsscreen/itemstofind/ribbon-lg.png\') center center no-repeat;',
            name: 'Ribbon',
            points: '1',
            hint: 'It is leaving on a jet plane',
            fullHint: 'It is leaving on a jet plane'
          },
          {
            id: '52f6d7f845617474b8fd4313',
            imageURLSm: 'background: url(\'resources/img/scavitemsscreen/itemstofind/remote-sm.png\') center center no-repeat;',
            imageURLLg: 'background: url(\'resources/img/scavitemsscreen/itemstofind/remote-lg.png\') center center no-repeat;',
            name: 'TV Remote',
            points: '5',
            hint: 'Look no farther than Cobra',
            fullHint: 'Look no farther than Cobra'
          },
          {
            id: '52f6d7f845617474b8fd4314',
            imageURLSm: 'background: url(\'resources/img/scavitemsscreen/itemstofind/pen-sm.png\') center center no-repeat;',
            imageURLLg: 'background: url(\'resources/img/scavitemsscreen/itemstofind/pen-lg.png\') center center no-repeat;',
            name: 'Ballpoint Pen',
            points: '3',
            hint: 'You will find it where parkers...',
            fullHint: 'You will find it where parkers like to park and breakers like to break'
          }],
        recentItem: 'No recent item',
        pointTotal: 0,
        duration: '04:30:00',
        expiryDate: null,
        scavItemsFound: 0,
        scavItemsLeft: 10,
        thumbnailImageURL: 'background-color: #ffffff; background-image: url(\'resources/img/scavitemsscreen/scavhn-headsup-vulture.png\'); background-position: center center; background-repeat: no-repeat',
        buildHref: ScavItemsViewModel.getBuildHref
      }
    }
  }
);
