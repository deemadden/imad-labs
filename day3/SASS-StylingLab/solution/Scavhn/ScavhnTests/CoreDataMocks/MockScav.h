//
// Created by Dee Madden on 11/4/13.
// Copyright (c) 2013 SoftSource. All rights reserved.
//


#import <Foundation/Foundation.h>

@class MockScavsDownload;
@class MockScavItem;

@interface MockScav : NSObject

@property (nonatomic, retain) NSString * scavId;
@property (nonatomic, retain) NSString * image;
@property (nonatomic, retain) NSString * imageType;
@property (nonatomic, retain) NSString * level;
@property (nonatomic, retain) NSString * name;
@property (nonatomic, retain) NSString * duration;
@property (nonatomic, retain) NSString * thumbnail;
@property (nonatomic, retain) NSString * thumbnailType;
@property (nonatomic, retain) NSString * scavDescription;
@property (nonatomic, retain) MockScavsDownload *scavsDownloadParent;
@property (nonatomic, retain) NSSet *scavItems;

- (void)addScavItemsObject:(MockScavItem *)value;
- (void)removeScavItemsObject:(MockScavItem *)value;
- (void)addScavItems:(NSSet *)values;
- (void)removeScavItems:(NSSet *)values;

@end