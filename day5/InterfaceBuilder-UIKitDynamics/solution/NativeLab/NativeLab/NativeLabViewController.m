//
//  NativeLabViewController.m
//  NativeLab
//
//  Created by User on 9/27/13.
//  Copyright (c) 2013 SoftSource. All rights reserved.
//

#import "NativeLabViewController.h"

@interface NativeLabViewController()

@property (nonatomic, strong) UIDynamicAnimator* animator;
@property (nonatomic, strong) UIGravityBehavior* gravity;
@property (nonatomic, strong) UICollisionBehavior* collision;

@end

@implementation NativeLabViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)goButtonTapped:(UIButton *)sender
{
    _helloWorldLabel.text = @"I've Fallen and I Can't Get Up.";

    dispatch_queue_t queue = dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0);

    dispatch_async(queue, ^
    {
        CGRect frame = _fallingSquareView.frame;
        frame.origin.x = 86.0;
        frame.origin.y = 87.0;
      
        _fallingSquareView.frame = frame;
      
        NSLog(@"I'm in a background thread now.");

        _animator = [[UIDynamicAnimator alloc] initWithReferenceView:self.view];
        _gravity = [[UIGravityBehavior alloc] initWithItems:@[_fallingSquareView]];
        _collision = [[UICollisionBehavior alloc] initWithItems:@[_fallingSquareView]];
        _collision.translatesReferenceBoundsIntoBoundary = YES;
        UIDynamicItemBehavior* itemBehaviour = [[UIDynamicItemBehavior alloc] initWithItems:@[_fallingSquareView]];
        itemBehaviour.elasticity = 0.6;

        dispatch_async(dispatch_get_main_queue(), ^(void)
        {
            [_animator addBehavior:_gravity];
            [_animator addBehavior:_collision];
            [_animator addBehavior:itemBehaviour];

            NSLog(@"I'm back on the main thread!");
            _helloWorldLabel.text = @"I'm back the main thread!";
        });
    });
}

@end
