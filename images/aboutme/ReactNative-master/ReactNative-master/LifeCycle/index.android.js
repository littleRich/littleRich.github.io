/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 组件的生命周期分成三个状态：
 * Mounting：已插入真实 DOM
 * Updating：正在被重新渲染
 * Unmounting：已移出真实 DOM
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

var Life = require("./src/js/LifeCycle");

export default class LifeCycle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            remove: false,
        }

    }

    render() {
        //模拟组件的装载和卸载 生命周期
        var view = this.state.remove ? null : <Life/>;
        var text = this.state.remove ? "(点击装载)已被卸载" : "(点击卸载)已被装载";
        return (
            <View style={styles.container}>
                {view}
                <Text onPress={() => {
                    this.setState({
                        remove: !this.state.remove,
                    })
                }} style={{marginTop: 15}}>{text}</Text>
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

});
AppRegistry.registerComponent('LifeCycle', () => LifeCycle);
