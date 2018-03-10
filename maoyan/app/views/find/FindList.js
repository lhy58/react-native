/**
 * Created by Administrator on 2016/10/28.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    TouchableOpacity,
    Image,
    TextInput,
}from 'react-native';

import NavigatorBar from 'react-native-navbar';
//导入json数据
import CategoryData from './category.json';
import Category from './Category';
import FoodSection from './FoodSection';
import DataService from '../../service/DataService';
import NewGird from './NewGrid';
import Loading from '../../common/Loading';
import Search from './Search';

export default class FindList extends Component{
    render(){
        /**
         * onFocus点击聚焦跳转页面
         */
        return(
            <View style={{flex:1}}>
                <NavigatorBar
                    //title={{title:'发现',tintColor:'white'}}
                    tintColor="#48D1CC"
                    statusBar={{
                        style:'light-content'
                    }}
                    title={
                        <TextInput
                           placeholder='搜索商家、品类或商圈'
                           underlineColorAndroid='transparent'
                           style={{
                               width: 200,
                               height: 30,
                               borderRadius : 20,
                               marginTop:5,
                               paddingLeft:20,
                               paddingRight:20,
                               backgroundColor:'white',
                               paddingBottom: 5,
                           }}
                           onFocus={()=>{
                               this.props.navigator.push({
                                       item : Search
                               });
                           }}

                        />
                    }
                />
                <FindView {...this.props} />
            </View>
        )
    }
}

class  FindView extends Component{
    constructor(props){
        super(props);
        let dataSource = new ListView.DataSource({
            rowHasChanged:(r1,r2)=>r1!==r2,
        });
        this.state={
            ds:dataSource,
            Loading:true,
            headerData1:[],
            headerData2:[],
        }
    }

    componentDidMount() {
        this.responseData();
    }
    //请求数据
    responseData(){
        //请求url
        let url1 = 'http://aop.meituan.com/api/entry/topic2';
        //请求参数
        let params = {
            uuid:'35907A2436D257F90370E49A7CDFAE73678ABD5806B0029DFB83362199EEDAE',
            utm_source:'AppStore',
            utm_term:'7.4.0',
            latlng:'22.658886%2C114.038819',
            rn_package_version:'0',
            userid:'207705088',
            utm_content:'35907A2436D257F90370E49A7CDFAE73678ABD5806B0029DFB83362199EEDAE4',
            utm_medium:'iphone',
            version_name:'7.4.0',
            movieBundleVersion:'100',
            utm_campaign:'AgroupBgroupD100H0',
            __reqTraceID:'845EDE56-BBC2-4D0B-A33D-8969A5C28ECE',
            js_patch_version:'2',
            ci:'30',
            msid:'76EC06AA-D076-4229-A3B2-4627B12F95BB2016-10-21-18-47424',
        };
        //1.名店抢购、折扣美食
        DataService.get(url1,params,function(jsonData){
            console.log(jsonData);
            var resource = jsonData.data.resource;
            this.setState({
                headerData1:resource,
                Loading:false,
            })
        }.bind(this));

        //2.人气外卖、...
        let url2 = "http://aop.meituan.com/api/entry/discountNew?uuid=35907A2436D257F90370E49A7CDFAE73678ABD5806B0029DFB83362199EEDAE4&utm_source=AppStore&utm_term=7.4.0&latlng=22.658886%2C114.038819&rn_package_version=0&userid=207705088&utm_content=35907A2436D257F90370E49A7CDFAE73678ABD5806B0029DFB83362199EEDAE4&utm_medium=iphone&version_name=7.4.0&movieBundleVersion=100&utm_campaign=AgroupBgroupD100H0&__reqTraceID=33F8EAE5-287C-4757-A905-EFF85DF93071&js_patch_version=2&ci=30&msid=76EC06AA-D076-4229-A3B2-4627B12F95BB2016-10-21-18-47424";
        DataService.get(url2,null,function(jsonData){
            console.log(jsonData);
            var resource = jsonData.data.resource;
            this.setState({
                headerData2:resource,
                Loading:false,
            })
        }.bind(this));

        //3.猜你喜欢列表
        let url3 = "http://api.meituan.com/group/v2/recommend/homepage/city/30?msid=76EC06AA-D076-4229-A3B2-4627B12F95BB2016-10-21-18-47424&userid=207705088&__vhost=api.mobile.meituan.com&position=22.658886%2C114.038819&movieBundleVersion=100&utm_term=7.4.0&limit=40&wifi-mac=d4%3Aee%3A07%3A01%3A3c%3A98&ci=30&__skcy=2IoKHuPXQiBmt0Oz3UDDgIyij20%3D&__skck=3c0cf64e4b039997339ed8fec4cddf05&__skua=d64d6feffae1ef2e9dbbe402605681c1&wifi-name=HiWiFi_zningning&client=iphone&uuid=35907A2436D257F90370E49A7CDFAE73678ABD5806B0029DFB83362199EEDAE4&__skts=1477047109.656306&__skno=864E8F69-9C54-48DE-B871-A50C847F1E55&utm_content=35907A2436D257F90370E49A7CDFAE73678ABD5806B0029DFB83362199EEDAE4&utm_source=AppStore&utm_medium=iphone&version_name=7.4.0&wifi-cur=0&wifi-strength=&offset=0&supportId=1&__reqTraceID=F099390D-2405-4DA9-8134-752ADBEB1116&js_patch_version=2&rn_package_version=0&utm_campaign=AgroupBgroupD100H0&userId=207705088";
        DataService.get(url3,null,function(jsonData) {
            let data = jsonData.data;
            let dataSource = this.state.ds;
            this.setState({
                ds:dataSource.cloneWithRows(data),
                Loading:false,
            })
        }.bind(this))


    }


    render(){
        //加载...
        if(this.state.Loading){
            return <Loading />
        }

        return(
            <ListView
                dataSource={this.state.ds}
                renderRow={this.renderRow.bind(this)}
                renderHeader={this.renderHeader.bind(this)}
                renderSeparator={this.renderSeparator}
            />
        )
    }
    renderRow(rowData,sectionId,rowId){
        let msg = '';
        if(rowData.mainMessage !==undefined && rowData.mainMessage2 !==undefined ){
            msg = rowData.mainMessage + rowData.mainMessage2;
        }

        let imgUrl = rowData.imageUrl;
        imgUrl = imgUrl.replace('w.h','100.100');

        return(
            <TouchableOpacity style={{
                flex:1,
                height:120,
                padding:10,
                flexDirection:'row',
            }}>
                <Image source={{uri:imgUrl}} style={styles.img}
                  resizeMode={Image.resizeMode.contain}
                />
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{
                        fontSize:18, color:'black',
                    }}>{rowData.title}</Text>
                    <View style={{
                        flexDirection:'row',
                        marginTop:5,
                        marginBottom:10,
                    }}>
                        <Text style={styles.text1}>{rowData.subTitle}</Text>
                        <Text style={styles.text2}>{rowData.bottomRightInfo}</Text>
                    </View>
                    <Text style={styles.msg}>{msg}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    renderHeader(){
        return(
            <View style={{flex:1}}>
                <Category data={CategoryData} />
                <FoodSection data={this.state.headerData1} style={{
                    height:140,
                    borderTopColor:'#EBEBEB',
                    borderTopWidth:10,
                }}/>
                <NewGird data={this.state.headerData2} style={{
                    height:260,
                    borderTopColor:'#EBEBEB',
                    borderTopWidth:10,
                }} />
                <View style={{
                    borderTopColor:'#EBEBEB',
                    borderTopWidth:10,
                    height:40,
                    borderBottomWidth:0.5,
                    borderBottomColor:'#EBEBEB',
                    flex:1,
                }}>
                    <Text style={{
                        flex:1,
                        textAlign:'center',
                        lineHeight:25,
                    }}>— 猜你喜欢 —</Text>
                </View>
            </View>

        )
    }
    //分割线
    renderSeparator(sectionId,rowId){
        return(
            <View key={sectionId+rowId}
                  style={{backgroundColor:'lightgray', height:0.5}}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    img:{
        width:100,
        height:100,
        marginRight:10,
    },
    text1:{
        fontSize:14,
        color:'gray',
    },
    text2:{
        fontSize:14,
        color:'orange',
        marginLeft:10,

    },
    msg:{
        fontSize:22,
        color:'green',
        fontWeight:'bold',
    }

})