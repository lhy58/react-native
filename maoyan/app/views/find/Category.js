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

import Swiper from 'react-native-swiper';

//取到屏幕的宽、高
let {width, height} = Dimensions.get('window');

//组件名可以省略
export default class extends Component{
    //定义类型
    static PropTypes = {
        data:PropTypes.array,
    };
    static defaultProps = {
        data:[],
    };
    render(){
        /**
         * data = [data1,data2,data3,.......]
         *
         * [
         *      [item1,item2,item3,...],
         *      [item1,item2,item3,...],
         * ]
         *
         */


        var views = [];
        var items = null;
        //1.循环数组
        this.props.data.forEach(function(item,index){

            //2.为数组中的元素 创建一个视图
            //TouchableHighlight 按钮 子标签只有一个 必须有onPress
            let itemElement = (
                <TouchableHighlight style={styles.Opacity} key={item.title}
                 underlayColor={'red'} onPress={()=>{}}
                >
                    <View style={{justifyContent:'center', alignItems:'center',}}>
                        <Image style={styles.img} source={{uri:item.img}} />
                        <Text>{item.title}</Text>
                    </View>
                </TouchableHighlight>
            );
            //10个元素为一组
            if(index % 10 == 0){
                items = [];
                views.push(items);
            }
            items.push(itemElement);
        });
        /**
         *[
         * <View>
         *     [
         *      itemElement,
         *      itemElement,
         *      ...
         *     ]
         * </View>,
         * <View>
         *     [
         *      itemElement,
         *      itemElement,
         *      ...
         *     ]
         * </View>
         *]
         */

        let viewsElement = views.map(function(item,index){
            return <View style={styles.styleView} key={index}>
                    {item}
                   </View>

        });


        /*******轮播图********/
        /**
         * onMomentumScrollEnd 翻页时调用的函数
         * horizontal   是否水平方向滑动
         * showsButtons 是否显示翻页按钮
         * loop 是否循环滑动
         * autoplay 是否自动翻页
         * showsPagination 是否显示分页组件
         * dot          分页组件的圆点定义
         * activeDot   选中的分页圆点
         * paginationStyle 分页组件的样式
         */

         return(
             <Swiper
                 height={210}
                 onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                 horizontal={true}
                 showsButtons={false}
                 loop={true}
                 autoplay={false}
                 showsPagination={true}
                 dot={<View style={{backgroundColor: '#C4C4C4', width: 17, height: 2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                 activeDot={<View style={{backgroundColor: 'red', width: 20, height: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                 paginationStyle={{
                     bottom: 5, left: null, right: width/3
                 }}
             >
                 {viewsElement}
             </Swiper>
         )

    }
}
const styles = StyleSheet.create({
    Opacity:{
        width:width/5,
        height:75,
        marginTop:10,
    },
    img:{
        width:50,
        height:50,
        borderRadius:25,
        marginBottom:10,
    },
    styleView:{
        width:width,
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap',
    }
})