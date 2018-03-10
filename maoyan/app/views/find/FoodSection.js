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

export default class FoodSection extends  Component{
    //设置属性的类型
    static PropTypes = {
        data:PropTypes.array,
    };
    //设置属性的默认值
    static defaultProps = {
        data:[],
    };

    /**
     *resizeMode={Image.resizeMode.contain} 设置图片的:拉伸 ,原图 ,自适应
     */
    render(){
        let views = this.props.data.map((item,index)=>{
            return(
                <TouchableHighlight key={index}
                style={{flex:1,borderRightColor:'gray',
                         borderRightWidth:index==0? 0.5:0,
                         padding:10,
                }}
                >
                    <View style={{flex:1}}>
                        <Text style={styles.maintitle}>{item.maintitle}</Text>
                        <Text style={{color:'black',margin:2}}>{item.deputytitle}</Text>
                        <Text style={{color:item.rewardtypefacecolor}}>{item.rewardtitle}</Text>
                        <Image style={styles.img} source={{uri:item.imgurlreward}}
                               resizeMode={Image.resizeMode.contain}
                        />
                    </View>
                </TouchableHighlight>
            )
        });

        return(
            <View style={{
                ...this.props.style,   //将组件外部传入的样式复制给当前视图
                flex:1,
                flexDirection:'row'
            }}>
                {views}
            </View>
        )
    }
}

const styles  = StyleSheet.create({
    maintitle:{
        fontSize:16,
        color:'black',
        fontWeight:'bold',
    },
    img:{
        width:80,
        height:50,
        position:'absolute',  //使用绝对定位
        right:5,
    }

})