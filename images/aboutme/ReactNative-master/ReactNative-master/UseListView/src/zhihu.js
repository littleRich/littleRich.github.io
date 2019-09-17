import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    ListView,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';


class zhiHuList extends Component {

    static defaultProps = {
        url: 'https://news-at.zhihu.com/api/4/news/latest'
    };

    constructor(props) {
        super(props);
        //1.初始化ListView.DataSource数据源
        this.state = {
            data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        }
    }

    //渲染完成，请求网络数据
    componentDidMount() {
        fetch(this.props.url)
            .then((response) => response.json())
            .then((response) => {
                //解析json数据
                var json = response['stories'];
                //更新状态机
                this.setState({
                    data: this.state.data.cloneWithRows(json),
                });
            })
            .catch((error) => {
                if (error) {
                    //网络错误处理
                    console.log('error', error);
                }
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.data}
                    //相当于Android中Adapter的getView 渲染每一个Item
                    renderRow={this.getView}/>
            </View>
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
                              onPress={() => ToastAndroid.show(rowData.title, ToastAndroid.SHORT)}>
                <View style={styles.item}>
                    {/*左边的图片*/}
                    <Image source={{uri: rowData.images[0]}} style={styles.image}/>
                    <View style={styles.left}>
                        {/*右边的View*/}
                        <Text style={{marginTop: 15, color: '#333333'}}>{rowData.title}</Text>
                        <View style={styles.content}>
                            <Text style={{flex: 1, textAlign: 'right'}}>{rowData.id + ''}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
    },
    item: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 8,
        marginLeft: 10,
        marginRight: 10,
    },
    image: {
        width: 90,
        height: 90,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,

    },
    left: {
        flex: 1,
        marginLeft: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    //让 Text 水平方向充满容器
    content: {
        bottom: 10,
        marginRight: 16,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }

});
module.exports = zhiHuList;
