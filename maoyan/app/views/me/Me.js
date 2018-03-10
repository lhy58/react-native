/**
 * Created by Administrator on 2016/10/28.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
}from 'react-native';

import NavigatorBar from 'react-native-navbar';

export default class MovieList extends Component{
    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <NavigatorBar
                    title={{title:'我',tintColor:'white'}}
                    tintColor="red"
                    statusBar={{
                        style:'light-content'
                    }}
                />
                <Text>个人中心</Text>
            </View>
        )
    }
}