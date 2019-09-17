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
        //左侧标题
        headerTitle: '我是主页面',
        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        headerBackTitle: null,
        //顶部标题栏的样式
        headerStyle: styles.headerStyle,
        //顶部标题栏文字的样式
        headerTitleStyle: styles.headerTitleStyle,
    });

    render() {
        return (
            <View style={styles.container}>
                {/*页面跳转*/}
                <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => {
                    this.props.navigation.navigate('Detail', {key: '传递的标题'})
                }}>
                    <Text style={{color: 'white'}}>带参数 跳转至Details页面</Text>
                </TouchableOpacity>
                <Text style={{marginTop: 10, color: 'black'}}>当前是Main页面</Text>
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
        //标题的文字颜色
        color: 'white',
        //设置标题的大小
        fontSize: 18,
        //居中显示
        alignSelf: 'center',
    },
});

module.exports = Main;