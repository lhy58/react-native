/**
 * Created by Administrator on 2016/10/29.
 */
import React,{Component} from 'react';
import{
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ListView,
}from 'react-native';

import NavigatorBar from 'react-native-navbar';

import Loading from '../../common/Loading';

//取到屏幕的宽、高
let {width,height} = Dimensions.get('window');

export default class MovieDetail extends Component{
    render(){
        return(
            <View style={{flex:1,backgroundColor:'white'}}>
                <NavigatorBar
                     title={{ title:this.props.title,tintColor:'white' }}
                     tintColor="red"
                     statusBar={{
                         style:'light-content'
                     }}
                     leftButton={
                         <TouchableOpacity
                             activeOpacity={0.6}
                             onPress={()=>{
                                 this.props.navigator.pop();
                             }}
                         >
                             <Image source={require('../../../images/btn_backItem_original.png')}
                                    style={{ width:11, height:22, margin:10}}
                             />
                         </TouchableOpacity>
                     }
                />

                <MovieDetailList {...this.props} />
            </View>
        )
    }

}

class MovieDetailList extends Component{
    constructor(props){
        super(props);
        this.state={
            ds: new ListView.DataSource({
                rowHasChanged:(r1,r2)=>r1!==r2,
                sectionHeaderHasChanged:(h1,h2)=>h1!==h2,
            }),
            loading:true,
            movie:{},
        }
    }
    //渲染完成 请求数据
    componentDidMount() {
        this.fetchData();
    }

    fetchData(){
        //this.props.movieId 电影列表id
        let url = "http://m.maoyan.com/movie/" + this.props.movieId + ".json";
        fetch(url).then((responseData)=>responseData.json())
                  .then((jsonData)=>{
                      console.log(jsonData);
                      //电影头部数据
                      let movie = jsonData.data.MovieDetailModel;
                      //短评 热评
                      let cmts = jsonData.data.CommentResponseModel.cmts;
                      let hcmts = jsonData.data.CommentResponseModel.hcmts;

                      let cms = [cmts,hcmts];
                      let ds = this.state.ds;
                      this.setState({
                          movie:movie,
                          ds:ds.cloneWithRowsAndSections(cms),
                          loading:false,
                      })
                  })
    }


    render(){
        if(this.state.loading){
            return(
                <Loading />
            )
        }
        return(
            <ListView
                dataSource={this.state.ds}
                renderRow={this.renderRow.bind(this)}
                renderHeader={this.renderHeader.bind(this)}
                renderSectionHeader={this.renderSectionHeader.bind(this)}
                renderSeparator={this.renderSeparator.bind(this)}
            />

        )
    }

    //创建单元
    renderRow(rowData,sectionId,rowId){
        return(
            <View style={{flexDirection:'row',padding:10}}>
                <Image source={{uri:rowData.avatarurl}} style={{
                    width:30,
                    height:30,
                    borderRadius:15,
                }} />
                <View style={{flex:1,marginLeft:5}}>
                    <Text style={styles.nickName}>{rowData.nickName}</Text>
                    <Text style={styles.content}>{rowData.content}</Text>
                    <Text style={styles.nickName}>{rowData.time}</Text>
                </View>
            </View>
        )
    }

    //分块列表
    renderSectionHeader(sectionData,sectionId){
        if(sectionId == 0){
            var title = '短评';
        }else if(sectionId == 1){
            var title = '热门短评';
        }
        return(
            <View style={{
                   borderBottomWidth:0.5,
                   borderBottomColor:"#CCCCCC",
                   borderTopColor:'#CCCCCC',
                   borderTopWidth:0.5,
                   backgroundColor:'#EBEBEB',
            }}>
                <Text style={{padding:10}}>{title}</Text>
            </View>
        )
    }

    //创建头
    renderHeader(){
        let m = this.state.movie;
        return(
            <View style={{flex:1}}>
                {/*1.电影信息*/}
                <View style={styles.movie}>
                    <Image source={{uri:m.img}} style={styles.img} />
                    <View style={styles.info}>
                        <Text style={{color:'white',fontSize:16}}>{m.nm}</Text>
                        <Text>
                            <Text style={styles.ver}>{m.ver}</Text>
                        </Text>
                        <Text style={{color:'#FFA500', fontSize:14}}>{m.sc}分({m.snum}人评分)</Text>
                        <Text style={styles.cd}>{m.cat}</Text>
                        <Text style={styles.cd}>{m.src}/{m.dur}</Text>
                        <Text style={styles.cd}>{m.rt}大陆上映</Text>
                    </View>
                </View>

                {/*1.剧情*/}
                <View style={{
                    padding:10,
                    borderBottomColor:'#EBEBEB',
                    borderBottomWidth:10,}}>
                    <Text style={styles.dra}>剧情:{m.dra}</Text>
                </View>

                {/*1.演员*/}
                <View style={{padding:10}}>
                    <Text style={styles.dra}>演员表:{m.star}</Text>
                </View>


            </View>
        )
    }

    //分割线
    renderSeparator(sectionId,rowId){
        return(
            <View key={sectionId+rowId} style={{
                backgroundColor:'gray',
                height:0.5,
                marginLeft:45,
            }} />
        )
    }
}

const styles = StyleSheet.create({
    movie:{
        padding:10,
        flex:1,
        flexDirection:'row',
        backgroundColor:'black',
    },
    img:{
        width:95,
        height:130,
        borderWidth:1,
        borderColor:'white',
    },
    info:{
        marginLeft:10,
        flex:1,
        justifyContent:'space-between'
    },
    ver:{
        color:'white',
        backgroundColor:'#00B2EE',
        fontSize:12,
        borderRadius:2.5,
    },
    cd:{
        color:'white',
        fontSize:14
    },
    dra:{
        fontSize:15,
        color:'black',
        lineHeight:25,
    },
    nickName:{
        fontSize:13,
        color:'gray',
    },
    content:{
        color:'black',
        lineHeight:17,
        marginTop:15,
        marginBottom:10,
    },



});