import router from '../router'
export const API = 'http://192.168.4.199:5000/'
import { Toast } from 'mint-ui'


//服务器
// export const API = 'http://120.76.213.161:8888/api/'

Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


String.prototype.format = function() {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function(m, i) {
            return args[i];
        });
}

//加密
export const aes_encrypt = function aes_encrypt(s) {
    let encrypt = JSON.stringify(s);
    return '' + CryptoJS.AES.encrypt(encrypt, CryptoJS.enc.Utf8.parse("main__secret_key"), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding });
};
//解密
export const aes_decrypt = function aes_decrypt(s) {
    let decrypt = '' + CryptoJS.AES.decrypt(s, CryptoJS.enc.Utf8.parse("main__secret_key"), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding }).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypt);
};
//改变微信上面的名字
export const setTitle = function setTitle(text) {
    var $body = $('body');
    document.title = text;
    // hack在微信等webview中无法修改document.title的情况
    var $iframe = $('<iframe style="display:none;" src=""></iframe>').on('load', function() {
        setTimeout(function() {
            $iframe.off('load').remove();
        }, 0);
    }).appendTo($body);
};
//跳转路由事件
export const pushRouter = function pushRouter(url, type, query) {
    var _query = {},
        _date = new Date();
    if (query) { _query = query; }
    _query.nowDate = _date.format("yyyy-MM-dd hh:mm:ss").replace(/-/g, '').replace(/:/g, '').replace(" ", '');
    sessionStorage.setItem("routerNowDate", _query.nowDate);
    console.log(_query.nowDate)
    if (type == 'replace') {
        router.replace({ path: url, query: _query });
    } else {
        router.push({ path: url, query: _query });
    }
};
//倒计时的清空和开始
let _timer = null;
export const timer = function timer(num, time, callBack) {
    if (!num && !time && !callBack) { clearInterval(_timer) } else {
        _timer = setInterval(function() {
            if (callBack) { callBack.callBack() }
        }, time);
    }
};
//准确把握当前时间事件
let _dateTime = null;
export const getDateTime =function getDateTime(num) {
       var _this=this,data={M:'',d:'',h:0,m:0,s:0,q:'',S:'',w:'',Y:''};
       if (num!="clear") {
           _dateTime = setInterval(function(){
                 var _date =new Date();
                 data.Y=_date.getFullYear();   //年
                 data.M=_date.getMonth()+1; //月份
                 data.d=_date.getDate(); //日
                 data.h=_date.getHours(); //小时
                 data.m=_date.getMinutes(); //分
                 data.s=_date.getSeconds(); //秒
                 data.q=Math.floor((_date.getMonth()+3)/3); //季度
                 data.S=_date.getMilliseconds(); //毫秒
                 data.w=_date.getDay(); //获取当前星期X(0-6,0代表星期天)  
                 data.w = data.w==0?'星期天':data.w==1?'星期一':data.w==2?'星期二':data.w==3?'星期三':data.w==4?'星期四':data.w==5?'星期五':'星期六'
                 store.dispatch('doDateTime',data);
                 return data;
            },1000);
       }else{
          clearInterval(_dateTime)
          store.dispatch('doDateTime',data);
          return data;
       }
};
//关闭窗口
export const windowClose =function windowClose() {
    return;
    // window.opener = null;  
    // window.open('', '_self');  
    // window.close(); 
    // window.location.href="about:blank";
};

//提示框
export const toast = function toast(value) {
    Toast({
        message: value,
        position: 'bottom',
        duration: 1000
    });
}