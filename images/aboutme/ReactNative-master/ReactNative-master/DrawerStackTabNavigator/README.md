#### 关于StackNavigator、TabNavigator、DrawerNavigator三个同时使用注意事项： 
* 嵌套顺序为

* DrawerNavigator -> StackNavigator -> TabNavigator

#### DrawerNavigator跳转的页面 须要在StackNavigator这里注册
  
  ```
    Wallet: {
            screen: Wallet,
        },
        CardCoupons: {
            screen: CardCoupons,
        },
        Invite: {
            screen: Invite,
        },
  ```
  
#### 效果图：
<img src="http://img.blog.csdn.net/20171014191729436" width="600">

