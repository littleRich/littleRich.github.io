/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

/**
 * 组件的生命周期
 */
class LifeCycle extends Component {

    //1.构造函数 数据的初始化
    constructor(props) {
        super(props);
        console.log('--constructor--');
        this.state = {
            count: 0
        }
    }

    //2.在初始化渲染执行（render()）之前立刻调用
    componentWillMount() {
        console.log('--componentWillMount--');
    }

    //3.渲染组件
    render() {
        console.log('--render--');
        return (
            <View style={styles.container}>
                {/*模拟组件状态被改变（state）*/}
                <Text onPress={() => {
                    this.setState({
                        count: this.state.count + 1,
                    })
                }}>有本事你打我呀</Text>
                <Text>被打了{this.state.count}次</Text>
            </View>
        );
    }

    //4.组件第一次（也就是初始化）渲染完成 适合做网络请求 数据操作
    componentDidMount() {
        console.log('--componentDidMount--');
    }

    //5.当state中的状态被改变是 组件会更新
    shouldComponentUpdate(nextProps, nextState) {
        console.log('--shouldComponentUpdate--');
        return true;
    }

    //6.组件马上就要更新了 > 又回到 第3步 开始重新渲染 在执行 第7步 完成渲染
    componentWillUpdate(nextProps, nextState) {
        console.log('--componentWillUpdate--');
    }

    //7.组件更新完成
    componentDidUpdate(nextProps, nextState) {
        console.log('--componentDidUpdate--');
    }

    //8.组件被卸载时调用
    componentWillUnmount(nextProps, nextState) {
        console.log('--componentWillUnmount--');
    }

    //在组件接收到新的 props 的时候调用。在初始化渲染的时候，该方法不会调用。
    componentWillReceiveProps(nextProps) {
        console.log('--componentWillReceiveProps--');
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});

module.exports = LifeCycle;