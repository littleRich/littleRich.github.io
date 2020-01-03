/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 打包步骤
 * 1.创建签名文件
 * 2.在build.gradle文件中配置jks信息
 * 3.在项目根目录下执行 cd android && ./gradlew assembleRelease
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NativeModules,
    DeviceEventEmitter,
} from 'react-native';

/**
 * 导入我们创建的Module
 */
const Android = NativeModules.AndroidModule;

export default class App extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} activeOpacity={0.5}
                                  onPress={() => this.toast()}>
                    <Text style={{color: 'white'}}>吐丝</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {marginTop: 10}]} activeOpacity={0.5}
                                  onPress={() => this.call()}>
                    <Text style={{color: 'white'}}>点我调起拨号界面</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {marginTop: 10}]} activeOpacity={0.5}
                                  onPress={() => this.sum()}>
                    <Text style={{color: 'white'}}>回调函数</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {marginTop: 10}]} activeOpacity={0.5}
                                  onPress={() => this.send()}>
                    <Text style={{color: 'white', textAlign: 'center'}}>Android往Rn发送事件</Text>
                </TouchableOpacity>
            </View>
        );
    }

    componentWillMount() {
        console.log(Platform.OS);
        DeviceEventEmitter.addListener('测试事件', function (e: Event) {
            Android.showToast(e['NAME']);
            // console.log(e);
            // console.log(e['NAME']);
        });
    }

    toast() {
        Android.showToast('调用成功');
    }

    call() {
        Android.callPhone(Android.TEL);
    }

    sum() {
        Android.haveCallback(10, 45, (sum) => {
            Android.showToast('结果为：' + sum);
        });
    }

    send() {
        Android.sendEvent()
    }

    /**
     *跳转至原生代码页面
     */
    startActivity() {
        Android.startDetailsActivity();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        width: 125,
        height: 45,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4398ff',
    }
});
