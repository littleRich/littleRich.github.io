import {
    StackNavigator,
} from 'react-navigation';

import React from 'react';

const Main = require('./Main');
const Detail = require('./Details');
const Menu = require('./Menu');

/*
 * 初始化StackNavigator
 */
export default App = StackNavigator({

    //默认加载第一个页面，这里用来注册需要跳转的页面 相当于Manifest.xml文件
    Main: {
        screen: Main,
    },
    Detail: {
        screen: Detail,
    },
    Menu: {
        screen: Menu,
    }
});

