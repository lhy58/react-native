/**
 * Created by Administrator on 2016/10/31.
 */
import React,{Component,PropTypes} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    Image,

}from 'react-native';

//取到屏幕的宽、高
let {width, height} = Dimensions.get('window');

export default class NewGrid extends  Component {
    //设置属性的类型
    static PropTypes = {
        data: PropTypes.array,
    };
    //设置属性的默认值
    static defaultProps = {
        data: [],
    };

    render(){
        let items = this.props.data.map((item,index)=>{
            return(
                <TouchableOpacity style={{
                    width:width/3,
                    height:130,
                    justifyContent:'center',
                    alignItems:'center',
                    borderRightColor:'lightgray',
                    borderRightWidth:(index+1)%3==0? 0:0.5,
                    borderTopColor:'lightgray',
                    borderTopWidth:index>2?0.5:0,
                }} key={index}>
                    <Text style={{
                        fontSize:16,
                        fontWeight:'bold',
                        color:item.typefacecolor,
                    }}>{item.maintitle}</Text>
                    <Text style={{
                        fontSize:12,
                        color:item.deputytypefacecolor,
                    }}>{item.deputytitle}</Text>
                    <Image source={{uri:item.imgurlreward}}
                           style={{width:80, height:80}}
                           resizeMode={Image.resizeMode.contain}
                    />
                </TouchableOpacity>
            )
        })

        return(
            <View style={{
                ...this.props.style,
                flex:1,
                flexDirection:'row',
                flexWrap:'wrap',
            }}>
                {items}
            </View>
        )
    }


}
