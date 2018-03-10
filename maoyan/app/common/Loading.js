/**
 * Created by Administrator on 2016/10/29.
 */
import React,{Component} from 'react';
import{
    View,
    Text,
    ActivityIndicator,
}from 'react-native';

export  default class Loading extends Component{
    render(){
        //开始页面加载 ActivityIndicator
        return(
            <View style={{
                flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
            }}>
                <ActivityIndicator animating={true} />
                <Text style={{margin:5}}>正在加载...</Text>
            </View>
        )
    }

}