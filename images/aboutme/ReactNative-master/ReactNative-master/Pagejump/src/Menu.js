/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


class Main extends Component {

    //设置顶部导航栏的内容
    static navigationOptions = ({navigation, screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle: '我是带有菜单的页面',
        // 设置滑动返回的距离
        gestureResponseDistance: {horizontal: 300},

        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        headerBackTitle: null,
        //顶部标题栏的样式
        headerStyle: styles.headerStyle,
        //顶部标题栏文字的样式
        headerTitleStyle: styles.headerTitleStyle,
        //返回按钮的颜色
        headerTintColor: 'white',

        //设置顶部导航栏左边的视图
        headerLeft: (<View/>),

        //设置顶部导航栏左边的视图  和 解决当有返回箭头时，文字不居中
        headerRight: (
            <Text style={{color: 'white', marginRight: 13}}
                  onPress={() => navigation.state.params ? navigation.state.params.menuClick() : null}>添加
            </Text>),
    });

    componentDidMount() {
        // 通过在componentDidMount里面设置setParams
        this.props.navigation.setParams({
            menuClick: this.menuClick,
        });
    }

    menuClick = () => {
        alert('我是添加菜单');
    };

    render() {
        return (
            <View style={styles.container}>
                {/*页面跳转*/}
                <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => {
                    //返回至上一个页面
                    const {goBack} = this.props.navigation;
                    goBack();
                }}>
                    <Text style={{color: 'white'}}>返回至上一个页面</Text>
                </TouchableOpacity>
                <Text style={{marginTop: 10, color: 'black'}}>当前是Menu页面</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        width: 240,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
    },
    headerStyle: {
        backgroundColor: '#4398ff',
    },
    headerTitleStyle: {
        color: 'white',
        //设置标题的大小
        fontSize: 18,
        //居中显示
        alignSelf: 'center',
    },
});

module.exports = Main;
