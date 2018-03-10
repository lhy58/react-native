/**
 * Created by Administrator on 2016/10/29.
 */

/***封装请求数据**/
class DataService {
    //给他一个静态方法 用类DataService才能调用
    static get(url,params,callback){    //callback以函数传进来

        //1.判断url后面是拼接 ? 还是 &   indexOf()查找字符串是否有'?' 没有返回-1
         if(params){
             url += (url.indexOf('?')>-1? "&":"?")
         }
         /*
          *  params = {
                type : "hot",
                offset : '0',
                limit : '1000',
            };
         */
         //2.将参数&拼接起来
        let paramUrl = [];
        for(let attr in params) {
            let value = params[attr];
            let item = attr + '=' + value;
            paramUrl.push(item);
        }
        url += paramUrl.join('&');
        console.log(url);

        //3.请求数据(所有的手机app都不存在跨域请求)
        fetch(url)
            .then((response)=>response.json())   //json()转换json对象
            .then((responsejson)=> {
                 //返回回调函数
                 callback(responsejson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

}
//导出
export default  DataService;