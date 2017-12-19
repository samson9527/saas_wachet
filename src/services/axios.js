import axios from 'axios'
import qs from 'qs'
import * as util from '../utils/util'
import store from '../store'
import {Toast,Indicator} from 'mint-ui'

axios.defaults.timeout=5000;                        //响应时间
// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';           //配置请求头
axios.defaults.headers.post['Content-Type']='text/plain';           //配置请求头
axios.defaults.baseURL=util.API;
axios.defaults.validateStatus=(status)=>{ return status>=0&&status<1000;}


//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) =>{
  var d=config.data
  console.log(config.data)
  config.data={}
  // if(config.url!=util.API+'login'){
    // config.data['headers']=util.aes_encrypt({token:store.state.dp.login.token,version:'0.1',platform:'app'})
  // }
  // config.data['data']=util.aes_encrypt(d);
  // config.data=qs.stringify(config.data);
  config['data']=d;     
  if(config.url!='login' && config.url!='reg' && config.url!='send/reg_valid_code' &&　config.url!='send/valid_code'){
    config['data'].token=store.state.login.login.token;
  }
  return config;
},(error) =>{
  //_.toast("错误的传参",'fail');
  return Promise.reject(error);
});
//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(res =>{
  // var data=util.aes_decrypt(res.data.data)
  // res.data=data
  console.log(res.data)
  if(res.status!=200){
    //res.data=JSON.parse(data)
    // if(res.data.error!='' && res.data.error.indexOf('该手机号已被另一商务经理添加')==-1 && res.data.error.indexOf('用户验证错误')==-1){
    //     if (res.data.error.indexOf('为保证报名人权益，修改该项目预计开始时间不能早于')==-1) {
    //         Toast({message:res.data.error})
    //     }else{
    //         document.getElementById("modifyWarning").style.display="block";
    //     }
    // }
    Indicator.close();
    if (res.status==450) {
        Toast({message:res.data.error});
    }   
    return Promise.reject(res);
  }
  return res;
},(error) =>{
  // var data=JSON.parse(util.aes_decrypt(error.config.data.data))
  // var data=util.aes_decrypt(error.config.data.data)
  return Promise.reject(error);
});
