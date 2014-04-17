#import <CoreData/CoreData.h>
#import "GetScavItemsRequestOperation.h"
#import "CoreDataContextSingleton.h"
#import "ScavItem.h"
#import "Scav.h"
#import "Player.h"
#import "PlayerLog.h"


@implementation GetScavItemsRequestOperation

- (void)start {
  if (![self startingExecution])
    return;


   // Setup a local error variable
  NSError* error = nil;
  
  // TODO: New up a Core Data NSManagedObjectContext

  // TODO: Set the context's persistentStoreCoordinator to the one hanging off of our CoreDataContextSingleton
  
  // Peel the URL out of the request.  To do this, we get the request's (NSURL*)URL.path property, then we scrub and convert
  // the property using NSString's stringByReplacingPercentEscapesUsingEncoding method, setting it to UTF8
  NSString* decodedUrl = [self.request.URL.path stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
  
  // Once we've done that, we need to peel the scav's name and the player's name out of the URL.  First we build up the RegEx to find it:
  NSRegularExpression* regex = [NSRegularExpression regularExpressionWithPattern:@".*users/([a-zA-Z-_]+)/scavs/([a-zA-Z-_]+)" options:NSRegularExpressionCaseInsensitive error:&error];

  // Next, we use the RegEx to search scrubbed/converted URL string.
  // NSMakeRange, which is used in concert with the RegEx object, is a bit like a substring method,
  // with the difference being that it returns location info, not the actual substring.
  // we're using $1 to get the player name, $2 to get the scav name.
  NSString* playerName = [regex stringByReplacingMatchesInString:decodedUrl options:0 range:NSMakeRange(0, [decodedUrl length]) withTemplate:@"$1"];
  NSString* scavName = [regex stringByReplacingMatchesInString:decodedUrl options:0 range:NSMakeRange(0, [decodedUrl length]) withTemplate:@"$2"];
  
  NSLog(@"Made it into GetScavsRequestOperation.  playerName %@ scavName %@", playerName, scavName);

  // TODO: Write an NSPredicate (WHERE clause) to find the last object stored for the player in the PlayerLog model,
  // TODO: To figure out if the player selected a scav and actually started a game
  
  // TODO: Use the predicate along with the pre-canned getEntityObjectsOfType:withPredicate:withContext: helper method
  // TODO: Hanging off of the CoreDataContextSingleton
  // TODO: to fetch the PlayerLog object the we're looking for
  // TODO: NOTE: getEntityObjectsOfType:withPredicate:withContext returns an NSArray, so to get the actual object,
  // TODO:       you can call the firstObject method on NSArray.

  // TODO: Do some error checking on the result
  // TODO: If there was an error, OR or if we found no objects meeting our criteria in the PlayerLog model,
  // TODO: raise it to the javascript by calling
  // TODO: finishedExecutionWithStatus:andJSONResponseObject: with a status code of 501
  // TODO: See the GetScavsRequestOperation for examples of how to do this.

  // TODO: If we did find a record, we can start working on fetching the Scav the user selected:
  // TODO: Write an NSPredicate (another WHERE clause) to find the selected Scav's object.
  // TODO: This one will need to look for any Scav objects matching the player's name AND a status of "INPROGRESS"

  // TODO: Feed the predicate to the getEntityObjectsOfType:withPredicate:withContext: helper method again
  // TODO: To fetch the Scav object

  // TODO: Now do the same error handling we did for the PlayerLog object, this time for the fetch
  // TODO: you just did.


  // TODO: The scavItems array we've got is an array of ScavItem NSManagedObjects,
  // TODO: So we need to convert the whole collection back to Objective-C
  // TODO: primitive objects before we can return it as JSON
  // TODO: to the javascript.  Leaving the helper method stubbed out
  // TODO: for you here.  Setting it to nil to allow it to be called.
  // TODO: you will need to pass a real Scav in and remove the nil check
  // TODO: within the method.
  [self convertScavsToJsonAndRespond:nil];
}

- (void)convertScavsToJsonAndRespond:(Scav *)scavWereLookingFor
{
  // TODO: First new up an NSMutableArray.  No need to alloc > init.
  // TODO: You can just use [NSMutableArray array]

  // TODO: Now do the Objective-C version of foreach (ex. for (TYPE*)obj in SOME_ARRAY_OF_OBJECTS{ })
  // TODO: and walk over the scavItems hanging off of the scav object you fetched
  if(scavWereLookingFor)
  {
    for (ScavItem* scavItem in scavWereLookingFor.scavItems)
    {
      // TODO: Within your loop, build up a regular immutable NSDictionary
      // TODO: consisting of the following ScavItem attributes:
      // TODO:
      // TODO: name, pointValue, pointColor, hint, level, thumbnail, thumbnailType, status, coordinates
      // TODO: and _id.
      // TODO:
      // TODO: pointValue is an NSNumber, so you will need to convert it
      // TODO: to an NSString. (hint: call stringValue)
      // TODO: To optimize memory usage, begin by wrapping this entire block in an @autoreleasepool.

      // TODO: Add the dictionary to the NSMutableArray you built up above

    };
  }

  // TODO: One last task.  In order to get parity between what we are going to
  // TODO: return to the JS and the JSON that the REST server returns, 
  // TODO: we need to wrap the items built up above into an NSDictionary
  // TODO: with the following keys (attributes): status, name, _id, and items.
  // TODO: set the MutableArray you built up as a value on the items key.


  // TODO: Call finishedExecutionWithStatus:andJSONResponseObject: with a status code of 200 and pass the dictionary 
  // TODO: you just created to the andJSONResponseObject: parameter. 
  [self finishedWithSuccessStatusAndJSONResponseObject:@{ @"nsdictionaryToReturnAsJson" : @"replace this dictionary with the one you are going to build." }];
}

@end