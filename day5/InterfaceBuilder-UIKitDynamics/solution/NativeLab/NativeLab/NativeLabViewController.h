//
//  NativeLabViewController.h
//  NativeLab
//
//  Created by User on 9/27/13.
//  Copyright (c) 2013 SoftSource. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface NativeLabViewController : UIViewController

@property (nonatomic, weak) IBOutlet UIView* fallingSquareView;
@property (nonatomic, weak) IBOutlet UILabel* helloWorldLabel;

-(IBAction)goButtonTapped:(UIButton*)sender;

@end
