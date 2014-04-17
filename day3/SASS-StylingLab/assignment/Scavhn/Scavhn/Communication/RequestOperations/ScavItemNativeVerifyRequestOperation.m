//
// Created by Dee Madden on 2/7/14.
// Copyright (c) 2014 SoftSource. All rights reserved.
//

#import "ScavItemNativeVerifyRequestOperation.h"
#import "JSONHelper.h"
#import "UIViewController+UIStoryboard.h"
#import "UIApplication+Scavhn.h"
#import "WebServicesManager.h"

// Drop the delegate for the custom view up here
@interface ScavItemNativeVerifyRequestOperation()

@property(nonatomic, strong) UIImagePickerController* pickerController;
// property for custom view's viewController
@property(nonatomic, strong) ScavhnViewController *scavhnViewController;
@property(nonatomic, strong) NSDictionary* scavItemInfo;
@property(nonatomic, strong) NSDictionary *locationManagerCurrentPosition;
@property(nonatomic, strong) NSError* scavItemWebServicePutError;

@end

@implementation ScavItemNativeVerifyRequestOperation

- (void)start
{
  if (![self startingExecution])
    return;

  NSError* error = nil;

  // Figure out which Scav the Player Picked
  NSString* decodedUrl = [self.request.URL.path stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
  NSRegularExpression* regex = [NSRegularExpression regularExpressionWithPattern:@".*users/([a-zA-Z-_]+)/scavs/([a-zA-Z0-9-_]+)/items/([a-zA-Z0-9-_]+)"
                                                                         options:NSRegularExpressionCaseInsensitive error:&error];

  NSString* playerName = [regex stringByReplacingMatchesInString:decodedUrl options:0 range:NSMakeRange(0, [decodedUrl length]) withTemplate:@"$1"];
  NSString* scavId = [regex stringByReplacingMatchesInString:decodedUrl options:0 range:NSMakeRange(0, [decodedUrl length]) withTemplate:@"$2"];
  NSString* scavItemId = [regex stringByReplacingMatchesInString:decodedUrl options:0 range:NSMakeRange(0, [decodedUrl length]) withTemplate:@"$3"];

  // Get the changes from the HTTP request body
  NSString* requestBodyJSONString = [[NSString alloc] initWithBytes:self.request.HTTPBody.bytes length:self.request.HTTPBody.length encoding:NSUTF8StringEncoding];
  NSDictionary* requestBodyJSONDict = [JSONHelper decodeJSON:requestBodyJSONString];

  NSString* scavItemName = requestBodyJSONDict[@"scavItemName"];
  NSString* scavItemThumbnail = requestBodyJSONDict[@"thumbnail"];
  NSString* scavItemThumbnailType = requestBodyJSONDict[@"thumbnailType"];
  UIImage* scavItemThumbnailImage = [self locateScavItemImageWithThumbnail:scavItemThumbnail andThumbnailType:scavItemThumbnailType];

  self.scavItemInfo = @{
      @"playerName": playerName,
      @"scavId": scavId,
      @"scavItemId": scavItemId,
      @"scavItemName": scavItemName,
      @"scavItemThumbnail": scavItemThumbnail,
      @"scavItemThumbnailType": scavItemThumbnailType,
      @"scavItemThumbnailImage": scavItemThumbnailImage
  };

  NSLog(@"Data dictionary to use for native Camera View %@", self.scavItemInfo);

  // Temporary kickout to give the JS call a callback.
  [self finishedWithSuccessStatusAndJSONResponseObject:@{ @"userCancelledDialog" : @"true" }];

  // Check for compatibility

  // Pop the camera view

}

- (void)checkDeviceCameraSupport
{
  if (![UIImagePickerController isSourceTypeAvailable:UIImagePickerControllerSourceTypeCamera])
  {
    UIAlertView* myAlertView = [[UIAlertView alloc] initWithTitle:@"Error"
                                                          message:@"Device has no camera"
                                                         delegate:nil
                                                cancelButtonTitle:@"OK"
                                                otherButtonTitles: nil];

    [myAlertView show];
  }
}

- (void)displayCameraDialogAsType:(UIImagePickerControllerSourceType)sourceType
{
  // grab the main nav controller to display workspace dialog in

  // Start looking for the current coordinates (location services)

  // Initialize into the pickerController property

  // Set the delegate

  // Turn allowsEditing on

  // Set the source type to the arg passed in

  // Hide all of the generic controls

  // Instantiate our custom camera view

  // Set the custom view on the UIImagePickerController's camera overlay

  // Present it

}

#pragma Helper Methods
// Find the scav item's image in the bundle, and build a UIImage based on it for our custom view
- (UIImage *)locateScavItemImageWithThumbnail:(NSString *)thumbnail andThumbnailType:(NSString *)thumbnailType
{
  NSString* path = [[NSBundle mainBundle]
                        pathForResource:[NSString stringWithFormat:@"web/resources/img/scavitemsscreen/itemstofind/%@-sm", thumbnail]
                                 ofType:[thumbnailType lowercaseString]];

  UIImage* scavItemImage = [[UIImage alloc] initWithContentsOfFile:path];

  return scavItemImage ?: nil;
}

#pragma UIImagePickerControllerDelegates
- (void)imagePickerController:(UIImagePickerController *)picker didFinishPickingMediaWithInfo:(NSDictionary *)info
{
  // Get the current geolocation

  // Cross fade the retake picture view in
}

- (void)imagePickerControllerDidCancel:(UIImagePickerController *)picker
{
  [picker dismissViewControllerAnimated:YES completion:^{
    [self finishedWithSuccessStatusAndJSONResponseObject:@{ @"userCancelledDialog" : @"true" }];
  }];
}

#pragma CameraViewControllerDelegates


@end