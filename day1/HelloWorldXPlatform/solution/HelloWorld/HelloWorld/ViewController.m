//
//  ViewController.m
//  HelloWorld
//
//  Created by Dee Madden on 12/12/13.
//  Copyright (c) 2013 SoftSource Consulting. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
  [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
  self.webView.delegate = self;
  self.webView.scrollView.showsHorizontalScrollIndicator = NO;
  self.webView.scrollView.showsVerticalScrollIndicator = NO;
  
  NSString* htmlPath = [[NSBundle mainBundle] pathForResource:@"web/index" ofType:@"html"];
  [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:htmlPath isDirectory:NO]]];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Optional UIWebViewDelegate delegate methods
- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
  NSString* requestAbsoluteString = [[request URL] absoluteString];
  NSLog(@"request: %@", [[request URL] absoluteString]);

  if([requestAbsoluteString rangeOfString:@"index.html"].location != NSNotFound)
    return YES;

  NSLog(@"Request intercepted!  Not going to google!");

  if(self.helloWorldLabel.alpha == 0)
  {
    [UIView animateWithDuration:0.5
                          delay:0
                        options:UIViewAnimationOptionCurveEaseIn
                     animations:^{ self.helloWorldLabel.alpha = 1; }
                     completion:nil];
  }
  else
  {
    self.helloWorldLabel.textColor = [UIColor blueColor];
  }

  return NO;
}

-(IBAction)helloWorldButtonTapped:(UIButton*)sender
{
  [self.webView stringByEvaluatingJavaScriptFromString:@"helloFromNativeCommand()"];
}

@end