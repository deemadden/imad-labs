//
//  REMDViewController.m
//  REMD-Sample
//
//  Created by User on 11/11/13.
//  Copyright (c) 2013 SoftSource. All rights reserved.
//

#import "REMDViewController.h"

@interface REMDViewController ()

@end

@implementation REMDViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    self.webView.scrollView.showsHorizontalScrollIndicator = NO;
    self.webView.scrollView.showsVerticalScrollIndicator = NO;
    
    // LOAD THE PAGE!!!
    NSString* htmlPath = [[NSBundle mainBundle] pathForResource:@"web/index" ofType:@"html"];
    [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:htmlPath isDirectory:NO]]];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
