/**
 * Created by Administrator on 2016/10/28.
 */

import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
}from 'react-native';

//导入 react-native-tab-navigator 组件 (选项卡)
import Tabbar from 'react-native-tab-navigator';
//导入界面
import MyNavigator from './MyNavigator';
import MovieList from './movie/MovieList';
import CinemaList from './cinema/CinemaList';
import FindList from './find/FindList';
import Me from './me/Me';

export default class TabbarView extends Component{

    constructor(props){
        super(props);
        this.state={
            selectedIndex : 0
        }
    }

    render(){
        return(
            /**
             tabBarStyle : tabbar的样式属性
             selected : 是否是选中状态
             title : 显示的标题
             selectedTitleStyle : 选中状态title的样式
             renderIcon : function   指定一个返回组件的函数,组件作为图标显示
             renderSelectedIcon : function  选中的图标
             onPress : function 点击事件函数
             **/
            <View style={styles.container}>
                {/*选择卡*/}
                <Tabbar tabBarStyle={styles.tabbar}>

                    <Tabbar.Item
                        title="电影"
                        selected={this.state.selectedIndex==0}
                        selectedTitleStyle={{color:'red'}}
                        renderSelectedIcon={()=>{
                            return <Image style={styles.icon} source={require('../../images/movie_on.png')} />
                        }}
                        renderIcon={()=>{
                            return <Image style={styles.icon} source={require('../../images/movie.png')} />
                        }}
                        onPress={()=>{
                            this.setState({
                                selectedIndex : 0
                            });
                        }}
                    >
                        {/*封装导航切换页面*/}
                        <MyNavigator component={MovieList} />
                    </Tabbar.Item>


                    <Tabbar.Item
                        title="影院"
                        selected={this.state.selectedIndex==1}
                        selectedTitleStyle={{color:'red'}}
                        renderSelectedIcon={()=>{
                            return <Image style={styles.icon} source={require('../../images/cinema_on.png')} />
                        }}
                        renderIcon={()=>{
                            return <Image style={styles.icon} source={require('../../images/cinema.png')} />
                        }}
                        onPress={()=>{
                            this.setState({
                                selectedIndex : 1
                            });
                        }}
                    >
                        <MyNavigator component={CinemaList} />
                    </Tabbar.Item>


                    <Tabbar.Item
                        title="发现"
                        selected={this.state.selectedIndex==2}
                        selectedTitleStyle={{color:'red'}}
                        renderSelectedIcon={()=>{
                            return <Image style={styles.icon} source={require('../../images/forum_on.png')} />
                        }}
                        renderIcon={()=>{
                            return <Image style={styles.icon} source={require('../../images/forum.png')} />
                        }}
                        onPress={()=>{
                            this.setState({
                                selectedIndex : 2
                            });
                        }}
                    >
                        <MyNavigator component={FindList} />
                    </Tabbar.Item>


                    <Tabbar.Item
                        title="我的"
                        selected={this.state.selectedIndex==3}
                        selectedTitleStyle={{color:'red'}}
                        renderSelectedIcon={()=>{
                            return <Image style={styles.icon} source={require('../../images/mine_on.png')} />
                        }}
                        renderIcon={()=>{
                            return <Image style={styles.icon} source={require('../../images/mine.png')} />
                        }}
                        onPress={()=>{
                            this.setState({
                                selectedIndex : 3
                            });
                        }}
                    >
                        <MyNavigator component={Me} />
                    </Tabbar.Item>

                </Tabbar>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    tabbar:{
        backgroundColor:'white',
        height:49,
        borderTopColor:'#E3E3E3',
        borderTopWidth:0.5
    },
    icon:{
        width:25,
        height:25
    }
});