import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ListView,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';


class MyListView extends Component {

    constructor(props) {
        super(props);
        //1.初始化ListView.DataSource数据源
        var data = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //返回数据
        this.state = {
            //传入我们需要展示的数据
            data: data.cloneWithRows(this.getArrays()),
        }
    }

    //动态获取item内容
    getArrays() {
        var list = [];
        for (var i = 0; i < 20; i++) {
            list.push(
                new this.ItemData('我是标题' + '---' + i, '我是内容' + '---' + i, i)
            );
        }
        return list;
    }

    //存储每个item对象的数据
    ItemData(title, content, position) {
        this.position = position;
        this.title = title;
        this.content = content;
    }

    render() {
        return (
            <ListView
                //设置数据源
                dataSource={this.state.data}
                //相当于Android中Adapter的getView 渲染每一个Item
                renderRow={this.getView}/>
        )
    }

    /**
     * renderRow中可以使用的参数(rowData, sectionID, rowID, highlightRow)
     * @param rowData
     * @returns {XML}
     */
    getView(rowData) {
        //这里返回的就是每个Item
        return (
            <TouchableOpacity activeOpacity={0.5}
                              onPress={() => ToastAndroid.show(rowData.position + '', ToastAndroid.SHORT)}>
                <View style={styles.item}>
                    <Text>{rowData.title}</Text>
                    <Text style={{marginTop: 5, fontSize: 12}}>{rowData.content}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#dddddd',
        height: 60,
    }
});
module.exports = MyListView;
