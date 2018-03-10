/**
 * Created by Administrator on 2016/10/31.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import NavigatorBar from 'react-native-navbar';

export default class Search extends Component{
    render(){
        return(
            <View style={{flex:1}}>
                <NavigatorBar
                    tintColor="white"
                    style={{
                        borderBottomColor:'gray',
                        borderBottomWidth:0.5,
                    }}
                    statusBar={{
                        style : 'light-content'
                    }}
                    leftButton={
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={()=>{
                                  this.props.navigator.pop();
                            }}
                        >
                            <Image source={require('../../../images/btn_backItem.png')}
                                   style={{width:11, height:22, margin:10}}
                            />
                        </TouchableOpacity>
                    }
                />
                <Text>搜索界面</Text>
            </View>
        )
    }
}