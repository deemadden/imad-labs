//
//  ViewController.h
//  HelloWorld
//
//  Created by Dee Madden on 12/12/13.
//  Copyright (c) 2013 SoftSource Consulting. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController <UIWebViewDelegate>

@property (nonatomic, strong) IBOutlet UIWebView* webView;
@property (nonatomic, weak) IBOutlet UILabel* helloWorldLabel;
@property (nonatomic, weak) IBOutlet UIButton* helloWorldButton;

-(IBAction)helloWorldButtonTapped:(UIButton*)sender;

@end