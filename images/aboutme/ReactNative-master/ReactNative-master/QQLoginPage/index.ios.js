
import React, {Component} from 'react';

import {
    AppRegistry,

} from 'react-native';

//引入外部的js文件
var LoginView = require('./src/js/loginView');

class QQLoginPage extends Component {
    render() {
        return (
            //字母必须大写开头
            <LoginView/>
        );
    }
}

AppRegistry.registerComponent('QQLoginPage', () => QQLoginPage);
