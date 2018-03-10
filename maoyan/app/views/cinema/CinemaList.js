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
}from 'react-native';

import NavigatorBar from 'react-native-navbar';
import DataService from '../../service/DataService';
import Loading from '../../common/Loading';

export default class CinemaList extends Component{
    render(){
        return(
            <View style={{flex:1,}}>
                <NavigatorBar
                    title={{title:'影院',tintColor:'white'}}
                    tintColor="red"
                    statusBar={{
                        style:'light-content'
                    }}
                />
                <CinemaListView {...this.props} />
            </View>
        )
    }
}

class CinemaListView extends Component{
    //构造
    constructor(props){
        super(props);

        this.state={
            ds:new ListView.DataSource({
                rowHasChanged:(r1,r2)=>r1!==r2,
                sectionHeaderHasChanged:(h1,h2)=>h1!==h2,
            }),
            Loading:true,
        }
    }
    //渲染完成
    componentDidMount() {
        this.requestData();
    }

    //请求数据
    requestData(){
        //http://m.maoyan.com/cinemas.json
        let url = 'http://m.maoyan.com/cinemas.json';
        var params = {};
        DataService.get(url,params,(jsonData)=>{
            console.log(jsonData);
            let data = jsonData.data;
            let ds = this.state.ds;
            this.setState({
                ds:ds.cloneWithRowsAndSections(data),
                Loading:false,
            })

        })

    }

    render(){
        //加载
        if(this.state.Loading){
            return(
                <Loading />
            )
        }
        return(
            <ListView
                dataSource={this.state.ds}
                renderRow={this.renderRow.bind(this)}
                initialListSize={15}
                renderSectionHeader={this.renderSectionHeader.bind(this)}
                renderSeparator={this.renderSeparator.bind(this)}
            />
        )
    }

    //创建单元格
    renderRow(rowData,sectionId,rowId){

         return(
             <TouchableOpacity>
                 <View style={{flex:1,marginLeft:10}}>
                     <View style={{flexDirection:'row'}}>
                         <Text style={styles.title}>{rowData.nm}</Text>
                         <Text style={styles.sp}>{rowData.sellPrice}</Text>
                         <Text style={styles.come}>元起</Text>
                     </View>
                     <Text style={styles.come}>{rowData.addr}</Text>
                     <View style={{flexDirection:'row'}}>
                         <Text style={styles.come}>近期场数:</Text>
                         <Text style={styles.sp}>{rowData.referencePrice}</Text>
                     </View>

                 </View>
             </TouchableOpacity>
         )

    }

    //分模块头视图
    renderSectionHeader(sectionData,sectionId){
        return(
            <View style={{
                borderBottomWidth:0.5,
                borderBottomColor:"#CCCCCC",
                borderTopColor:'#CCCCCC',
                borderTopWidth:0.5,
                backgroundColor:'#EBEBEB',
            }}>
                <Text style={{padding:10,color:'black',fontSize:18,}}>{sectionId}</Text>
            </View>
        )
    }

    //分割线
    renderSeparator(sectionId,rowId){
        return(
            <View key={sectionId+rowId} style={{
                backgroundColor:'gray',
                height:0.5,
                margin:10,
            }} />
        )
    }

}

const styles = StyleSheet.create({
    title:{
        fontSize:16,
        color:'black'
    },
    sp:{
        marginLeft: 10,
        marginRight:5,
        color:'red'
    },
    come:{
        fontSize:14,
        color:'gray'
    }
})