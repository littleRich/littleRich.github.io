import React, {Component} from 'react';

import {
    Image,
} from 'react-native';

//引入react-navigation依赖库
import {
    TabNavigator,
} from 'react-navigation';

//展示的页面
import Home from './src/Home';
import Type from './src/Type';
import ShopCar from './src/ShopCar';
import Mine from './src/Mine';

//Tab
export default Tab = TabNavigator({
    //每一个页面的配置
    Home: {
        screen: Home,//当前选项卡加载的页面
        //配置每一个选项卡的样式
        navigationOptions: {
            tabBarLabel: '首页',//显示的标签文字
            //显示的图片
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./images/ic_home.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}
                />
            ),
        },
    },
    Type: {
        screen: Type,
        navigationOptions: {
            tabBarLabel: '分类',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./images/ic_type.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}/>
            ),
        }
    },
    ShopCar: {
        screen: ShopCar,
        navigationOptions: {
            tabBarLabel: '购物车',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./images/ic_shop_car.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}/>
            ),
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./images/ic_me.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}/>
            ),
        }
    },

}, {
    //设置TabNavigator的位置
    tabBarPosition: 'bottom',
    //是否在更改标签时显示动画
    animationEnabled: true,
    //是否允许在标签之间进行滑动
    swipeEnabled: true,
    //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    backBehavior: "none",
    //设置Tab标签的属性

    tabBarOptions: {
        //Android属性
        upperCaseLabel: false,//是否使标签大写，默认为true
        //共有属性
        showIcon: true,//是否显示图标，默认关闭
        showLabel: true,//是否显示label，默认开启
        activeTintColor: '#EB3695',//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
        style: { //TabNavigator 的背景颜色
            backgroundColor: 'white',
            height: 55,
        },
        indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            height: 0,
        },
        labelStyle: {//文字的样式
            fontSize: 13,
            marginTop: -5,
            marginBottom: 5,
        },
        iconStyle: {//图标的样式
            marginBottom: 5,
        }
    },
});
