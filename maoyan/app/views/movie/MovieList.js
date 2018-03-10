/**
 * Created by Administrator on 2016/10/28.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ListView,
    ActivityIndicator,
    RefreshControl,
    Dimensions,
}from 'react-native';

//导入导航栏组件
import NavigatorBar from 'react-native-navbar';

//两个开源的分页组件
import Swiper from 'react-native-swiper';
import ViewPager from 'react-native-viewpager';

import MovieDetail from './MovieDetail';
import Loading from '../../common/Loading';
import DataService from '../../service/DataService';

//取到屏幕的宽、高
let {width, height} = Dimensions.get('window');

export default class MovieList extends Component{
    render(){
        return(
            /**
             * statusBar : 这是设置ios下状态栏的颜色 light-content 白色，默认是黑色
             */
            <View style={{flex:1}}>
                <NavigatorBar
                    title={{title:'电影',tintColor:'white'}}
                    tintColor="red"
                    statusBar={{
                        style:'light-content'
                    }}
                    rightButton={
                        <TouchableOpacity>
                            <Image source={require('../../../images/ic_nav_search.png')}
                                   style={{
                                       width:20,
                                       height:20,
                                       marginTop:10,
                                       marginRight:10
                                   }}/>
                        </TouchableOpacity>
                    }
                />
                <List {...this.props} />
            </View>
        )
    }
}

class List extends Component{
    constructor(props){
        super(props);
        //创建列表视图数据源对象
        let dataSource = new ListView.DataSource({
            rowHasChanged:(r1,r2)=>r1!==r2
        });
        //创建轮播图组件的数据源对象
        let pageDataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2
        });
        this.state={
            ds:dataSource,
            pageds:pageDataSource,
            isLoading:true,
            isRefreshing:false,
        };
        //请求数据不要写在构造函数中
    }

    //界面渲染完成之后调用，然后请求数据
    componentDidMount() {
        //用类去调用  this指的是List
        this.requestData();

        this.requestImage();
    }
    //请求电影数据
    requestData(){
        /*
        var url = 'http://m.maoyan.com/movie/list.json?type=hot&offset=0&limit=1000';

        //调用内部函数请求数据(所有的app都不存在跨域请求)
        fetch(url)
            .then((response)=>response.json())   //json()转换json对象
            .then((responsejson)=> {
                let movies = responsejson.data.movies;

                //克隆到数据源
                let dataSource = this.state.ds.cloneWithRows(movies);
                this.setState({
                    ds: dataSource,
                    isLoading:false,
                    isRefreshing:false,
                })
            })
            .catch((error) => {
                console.error(error);
            });
            */

        var url = 'http://m.maoyan.com/movie/list.json';
        var params = {
            type:'hot',
            offset:'0',
            limit:'1000',
        };
        //调用封装方法get()请求数据
        DataService.get(url,params,(jsonData)=>{
            let movies =jsonData.data.movies;
            //克隆到数据源
            let dataSource = this.state.ds.cloneWithRows(movies);
            this.setState({
                ds: dataSource,
                isLoading:false,
                isRefreshing:false,
            })
        })
    }


    //请求头图片
    requestImage(){
        let url="http://ads.wepiao.com/advertisement/adlist";
        fetch(url,{
            method:'POST',  //请求方式
            headers:{     //请求头
                'Accept' : 'application/json',
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            //请求体
            body:'advertisingId=33&city=196&ua=WTICKET_IOS%2F6.3.0'

        })
          .then((responseData)=>responseData.json())
          .then((jsondata)=>{
              let data = jsondata.advertising.advertisements;
              let pageDataSource = this.state.pageds;

              this.setState({
                  pageds:pageDataSource.cloneWithPages(data),
                  isLoading:false,
                  isRefreshing:false,
              })
          })
    }

    render(){
        //Loading封装加载的组件
        if(this.state.isLoading){
            return(
                <Loading />
            )
        }
        /**
         * RefreshControl 上拉刷新
         * */
        return(
            <View style={{flex:1}}>
                {/*列表*/}
                <ListView
                    dataSource={this.state.ds}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={this.renderSeparator}
                    initialListSize={15}
                    renderHeader={this.renderHeader.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="white"
                        />
                    }
                />
            </View>
        );
    }

    //上拉刷新
    onRefresh(){
        this.setState({
            onRefresh:true,
        })
        this.requestData();
        this.requestImage();
    }

    //分割线
    renderSeparator(sectionId,rowId){
        return(
            <View key={sectionId+rowId}
                  style={{backgroundColor:'#333',
                         height:0.5 ,
                         margin:5
                   }}

            />
        )
    }
    //创建行
    renderRow(rowData,sectionId,rowId){
        return(
            //按钮 点击显示透明度activeOpacity
            <TouchableOpacity style={{flex:1,flexDirection:'row', padding:10}}
               activeOpacity={0.6}
               onPress={()=>{
                   this.props.navigator.push({
                       item:MovieDetail,
                       movieId:rowData.id,
                       title:rowData.nm,
                   })
               }}
            >
                  {/*1.电影图片*/}
                  <Image source={{uri:rowData.img}} style={{width:70,height:90}}/>
                  {/*2.中间信息*/}
                  <View style={{flex:2,marginLeft:10}}>
                      <Text style={{fontWeight:'700'}}>{rowData.nm}</Text>
                      <Text>
                          <Text style={styles.text}>观众</Text>
                          <Text style={{fontSize:16,color:'orange'}}>{rowData.sc}</Text>
                      </Text>
                      <Text style={styles.text}>{rowData.scm}</Text>
                      <Text style={styles.text}>{rowData.showInfo}</Text>
                  </View>
                  {/*3.购票按钮*/}
                  <View style={{flex:1,
                                justifyContent:'center',
                                alignItems:'flex-end'
                   }}>
                      <TouchableOpacity style={rowData.preSale?[styles.button,{borderColor:'#63B8FF'}]:styles.button}>
                          <Text style={rowData.preSale?{color:'#63B8FF'}:{color:'red'}}>
                              {rowData.preSale?'预售':'购票'}</Text>
                      </TouchableOpacity>
                  </View>

            </TouchableOpacity>
        )
    }

    //轮播图的每一页界面的创建
    renderPage(pageData,pageId){
        console.log(pageData.img);
        return(
            <Image source={{uri:pageData.img}}
                   style={{flex:1}}
            />
        )
    }

    //创建List头视图 显示轮播图
    renderHeader(){
        /**
         * 返回分页轮播图
         * renderPageIndicator : 分页的圆点是否显示
         */
        return(
            <View style={{height:120,width:width}}>
                <ViewPager
                   dataSource={this.state.pageds}
                   renderPage={this.renderPage}
                   isLoop={true}
                   autoPlay={true}
                />
            </View>

        )

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
        /*
        return(
            <Swiper
                height={120}
                onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                horizontal={true}
                showsButtons={false}
                loop={true}
                autoplay={true}
                showsPagination={true}
                dot={<View style={{backgroundColor: '#C4C4C4', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                activeDot={<View style={{backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                paginationStyle={{
                    bottom: 10, left: null, right: 20
                }}
            >
                  <View style={{flex:1,backgroundColor:'red'}}></View>
                  <View style={{flex:1,backgroundColor:'green'}}></View>
            </Swiper>
        )
         */
    }


}

const styles = StyleSheet.create({
    text:{
        fontSize:12,
        marginTop:5,
        color:'gray'
    },
    button:{
        borderColor:'red',
        borderWidth:1,
        borderRadius:2.5,
        padding:10,
        paddingTop:5,
        paddingBottom:5
    }
});