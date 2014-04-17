define(

  [ 'models/Scav',
    'models/ScavCollection',
    'utils/Debug' ],

  function(Scav, ScavCollection, Debug)
  {
    var scavCollection;

    describe("KOANS FOR STEP 3: Now that we have a Scav Model, we need to build a ScavCollection to unwind the /scavs JSON into.", function() {

      beforeEach(function() {
        scavCollection = new ScavCollection();
      });

      it("Should have a model override and a comparator definition", function() {

        expect(scavCollection.model).toBeDefined();
        expect(scavCollection.comparator).toBeDefined();

        // Asserting that the model is a Scav type
        scavCollection.add(TestHelper.getScavDataForTest()[0]);

        expect(scavCollection.at(0) instanceof Scav).toBeTruthy();

      });

      it("Should sort the collection by name", function() {

        var scavForComparator = new Scav(TestHelper.getScavDataForTest()[0]);
        var expectedComparatorField = 'vulture';

        var actualComparatorField = scavCollection.comparator(scavForComparator);

        expect(actualComparatorField).toEqual(expectedComparatorField);

      });

    });
  }
);