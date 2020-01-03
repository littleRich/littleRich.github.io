/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 学习使用ScrollView
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
//屏幕信息
var dimensions = require('Dimensions');
//获取屏幕的宽度和高度
var {width} = dimensions.get('window');

/**
 * horizontal={true} 横向滑动
 *
 * showsHorizontalScrollIndicator 当此属性为true的时候，显示一个水平方向的滚动条。
 *
 * pagingEnabled 当值为true时，滚动条会停在滚动视图的尺寸的整数倍位置。这个可以用在水平分页上。默认值为false。
 *
 * scrollEnabled 当值为false的时候，内容不能滚动，默认值为true
 */
class ScrollTest extends Component {
    render() {
        return (
            <ScrollView>
                {this.getView()}
            </ScrollView>
        );
    }

    getView() {
        var all = [];
        var colors = ['red', 'blue', 'green', 'black', 'gray'];
        for (var i = 0; i < colors.length; i++) {
            //往数组添加元素
            all.push(
                //往数组添加元素一定要加一个唯一标识
                <View key={i} style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors[i],
                    width: width,
                    height: 180
                }}>
                    <Text style={{color: 'white'}}>第{i + 1}个文本</Text>
                </View>
            );
        }
        //返回数据
        return all;
    }
}

module.exports = ScrollTest;