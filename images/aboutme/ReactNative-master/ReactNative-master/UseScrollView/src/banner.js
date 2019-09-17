/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 使用ScrollView 打造一个Banner
 *
 * 1.安装第三放类库 npm react-time-mixin --save
 */

import React, {Component} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    Text,
} from 'react-native';

var banner = [
    'http://oweq6in8r.bkt.clouddn.com/about.jpg',
    'http://oweq6in8r.bkt.clouddn.com/liuliangqiu.jpg',
    'http://oweq6in8r.bkt.clouddn.com/rn.jpeg',
    'http://image.baidu.com/search/down?tn=download&word=download&ie=utf8&fr=detail&url=http%3A%2F%2Fwww.duoxinqi.com%2Fimages%2F2012%2F06%2F20120605_8.jpg&thumburl=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D2661383242%2C3400337239%26fm%3D27%26gp%3D0.jpg'
];
//屏幕信息
var dimensions = require('Dimensions');
//获取屏幕的宽度和高度
var {width} = dimensions.get('window');

class Banner extends Component {

    static defaultProps = {
        //定时器的间隔时间
        duration: 1000

    };

    constructor(props) {
        super(props);
        this.state = {
            //当前显示的下标
            position: 0,
        }
    }

    //绘制完成，开启定时器
    componentDidMount() {
        this.startTimer();
    }

    startTimer() {
        //1.拿到ScrollView
        var scrollView = this.refs.scrollView;
        this.timer = setInterval(() => {
            //设置圆点的下标
            var curr = this.state.position;
            if (curr + 1 > banner.length - 1) {
                curr = 0;
            } else {
                curr++;
            }
            //更新状态机，更新当前下标
            this.setState({
                position: curr,
            });
            //滚动ScrollView，1.求出水平方向的平移量  offsetX = curr * width
            scrollView.scrollTo({x: curr * width, y: 0, animated: true})
        }, this.props.duration);

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}//自动分页
                    //滚动动画结束时调用此函数。一帧滚动结束
                    onMomentumScrollEnd={(v) => this.onAnimationEnd(v)}
                    //手指按下的时候，停止计时器
                    onTouchStart={() => clearInterval(this.timer)}>

                    {/*显示轮播图的图片内容*/}
                    {this.getImages()}
                </ScrollView>
                {/*生成底部的圆点指示器*/}
                <View style={styles.indicator}>
                    {this.getIndicators()}
                </View>
            </View>

        );
    }

    //获取轮播图显示的图片
    getImages() {
        var images = [];
        for (var i = 0; i < banner.length; i++) {
            images.push(
                <View key={i}>
                    {<Image source={{uri: banner[i]}} style={styles.image}/>}
                </View>
            );
        }
        return images;
    }

    //获取左下角的4个圆点
    getIndicators() {
        var circles = [];
        for (var i = 0; i < banner.length; i++) {
            circles.push(
                <Text key={i}
                      style={i === this.state.position ? styles.selected : styles.unselected}>&bull;</Text>//&bull; html转义字符
            );
        }
        return circles;
    }

    //重写这个函数，系统已有的函数
    onAnimationEnd(v) {
        //1.求出水平方向的偏移量
        var offsetX = v.nativeEvent.contentOffset.x;
        //2.根据偏移量求出当前的页数  width为图片的宽度（banner的宽度 ）
        var position = Math.round(offsetX / width);
        //3.更新状态机, 刷新圆点
        this.setState({
            position: position
        });
        this.startTimer();
    }

    //结束计时器
    componentWillUnmount(nextProps, nextState) {
        clearInterval(this.timer);
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    //底部指示器的样式
    indicator: {
        width: width,
        height: 40,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: width,
        height: 240,
    },
    selected: {
        marginLeft: 10,
        fontSize: 40,
        color: '#5CB85C'
    },
    unselected: {
        marginLeft: 10,
        fontSize: 40,
        color: 'white'
    }
});

module.exports = Banner;