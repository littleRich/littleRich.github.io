/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    ToastAndroid,
    Image,
    TouchableOpacity,
    Text,
    View
} from 'react-native';


export default class App extends Component<{}> {

    static defaultProps = {
        url: 'https://news-at.zhihu.com/api/4/news/latest'
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],//存储列表使用的数据
            refreshing: false,//当前的刷新状态
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.getView}
                    ListHeaderComponent={this.header}
                    ListFooterComponent={this.footer}

                    //指定为GridView效果，需要下面两个属性同时设置，且numColumns必须大于1
                    // numColumns={2}
                    // columnWrapperStyle={{borderWidth: 2, borderColor: 'black'}}

                    //下拉刷新，必须设置refreshing状态
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshing}

                    //上拉加载
                    // onEndReachedThreshold={0}
                    // onEndReached={this.onEndReached}
                />
            </View>
        );
    }

    /**
     * item
     * @returns {XML}
     */
    getView({item}) {
        //这里返回的就是每个Item
        return (
            <TouchableOpacity activeOpacity={0.5}
                              onPress={() => ToastAndroid.show(item.title, ToastAndroid.SHORT)}>
                <View style={styles.item}>
                    {/*左边的图片*/}
                    <Image source={{uri: item.images[0]}} style={styles.image}/>
                    <View style={styles.left}>
                        {/*右边的View*/}
                        <Text style={{marginTop: 15, color: '#333333'}}>{item.title}</Text>
                        <View style={styles.content}>
                            <Text style={{flex: 1, textAlign: 'right'}}>{item.id + ''}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    /**
     * 给列表设置id
     * @param item
     * @param index
     */
    keyExtractor = (item, index) => item.id;

    /**
     * 头布局
     */
    header = () => {
        return (
            <Text style={{
                backgroundColor: '#4398ff',
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
                textAlignVertical: 'center',
                height: 150,
            }}>我是头布局</Text>
        )
    };
    /**
     * 尾布局
     */
    footer = () => {
        return (
            <Text style={{
                marginTop: 10,
                backgroundColor: '#EB3695',
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
                textAlignVertical: 'center',
                height: 150,
            }}>我是尾布局</Text>
        )
    };

    count = 0;//下拉刷新的次数

    /**
     * 下拉属性
     */
    onRefresh = () => {
        //设置刷新状态为正在刷新
        this.setState({
            refreshing: true,
        });
        //延时加载
        const timer = setTimeout(() => {
            clearTimeout(timer);
            //往数组的第一位插入数据，模拟数据新增 , unshift()会返回数组的长度
            this.state.data.unshift(new this.ItemData('https://pic2.zhimg.com/v2-8f11b41f995ca5340510c1def1c003d1.jpg',
                '下拉刷新添加的数据——————' + this.count, 475843));
            this.count++;
            this.setState({
                refreshing: false,
            });
        }, 1500);
    };

    /**
     * 上拉加载
     * 2017.10.23 11:03 还有一些问题
     */
    onEndReached = (info: { distanceFromEnd: number }) => {
        ToastAndroid.show('正在加载中...', ToastAndroid.SHORT);

    };

    /**
     * json 数据实体类
     */
    ItemData(images, title, id) {
        this.images = new Array(images);
        this.title = title;
        this.id = id;
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
                    data: json,
                });
            })
            .catch((error) => {
                if (error) {
                    //网络错误处理
                    console.log('error', error);
                }
            });
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
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
