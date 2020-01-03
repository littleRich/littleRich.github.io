/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';

var List = require('./src/listView');
var Grid = require('./src/gridView');
var ZhiHu = require('./src/zhihu');

export default class UseListView extends Component {
    render() {
        return (
            <View>
              <ZhiHu/>
            </View>
        );
    }
}


AppRegistry.registerComponent('UseListView', () => UseListView);
