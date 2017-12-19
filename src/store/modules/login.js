import * as util from '../../utils/util'
import * as types from '../mutation-types'
import router from '../../router'
import axios from 'axios'
import store from '../../store'
import {Toast, Indicator ,MessageBox } from 'mint-ui';

const state = {
  login: {},
}
const getters = {
  getLogin: state => state.login,
}

const actions = {
  //帐号登录
  doLogin({ commit }, data) {
    var userDate = data;
    if (data.type == "login") {
      Indicator.open({
        text: '登录中...',
        spinnerType: 'fading-circle'
      });
      userDate = data.userDate;
    }
    axios.post('login',userDate).then((r)=> {
        if (data.type == "login") {
          //为了永久登陆制定了缓存账户密码~！
          localStorage.setItem('userDate', util.aes_encrypt(data));
        }
        commit('LOGIN', r.data);
        Indicator.close();
      }).catch((e)=> {
        Indicator.close();
      })
  },
  //退出注销
  doLoginOut({ commit }, data) {
      commit('LOGINOUT');
  },
  //刷新的时候重新赋予值
  doInformation({ commit }, data) {
      commit('LOGIN_TWO',data);
  },
  //注册账户
  doRegister({ commit }, data) {
    Indicator.open({
        // text: '登录中...',
        spinnerType: 'fading-circle'
    });
    axios.post('reg',data).then((r)=> {
        store.dispatch('doLogin',{type:'login',userDate:{login:data.login,password:data.password}});
    }).catch((e)=> {
        Indicator.close();
    })
  },
  // 找回密码 和 修改密码
  doPassWord({ commit }, data) {
    Indicator.open({
        // text: '登录中...',
        spinnerType: 'fading-circle'
    });
    console.log(data)
    var _data = data.callBack ? data.data : data;
    axios.post('update/password',_data).then((r)=> {
       //找回密码
       if (data.valid_code) {
          store.dispatch('doLogin',{type:'login',userDate:{login:data.login,password:data.new_password}});
       }else{
           //修改密码
           Indicator.close();
           Toast({message:"密码修改成功！"});

            //登录信息的内容
            let userDate = localStorage.getItem('userDate');
            if (userDate && typeof userDate == "string") {
                var _userDate = util.aes_decrypt(userDate);
                _userDate.userDate.password=data.new_password;
                //为了永久登陆制定了缓存账户密码~！
                localStorage.setItem('userDate',util.aes_encrypt(_userDate));
            }
       }
       if (data.callBack) {
          data.callBack();
       }
    }).catch((e)=> {
        Indicator.close();
    })
  },  
  //发送验证码
  doGetCode({ commit }, data) {
    //name为注册 就是注册验证  为 重置密码 就为密码修改验证
    axios.post('send/valid_code',data).then((r)=> {}).catch((e)=> {})
  },
  //修改姓名
  doUpdataUser({ commit }, data) {
    var _data =data.callBack ? data.data : data;
    console.log(_data)
    axios.post('update/user',_data).then((r)=> {
          if (data.callBack) {
             data.callBack();
          }
          commit('USERMODIFY',_data);
    }).catch((e)=> {})
  },
  //修改手机号码
  doUpdataMobile({ commit }, data) {
    var _data =data.callBack ? data.data : data;
    console.log(_data)
    axios.post('update/login',_data).then((r)=> {
          if (data.callBack) {
             data.callBack();
          }
          commit('USERMODIFY',_data);
    }).catch((e)=> {})
  },
}
const mutations = {
  [types.LOGIN](state, d){
    var _d = d;
    _d.isLogin = true;
    state.login = _d;
    //刷新页面的时候保持
    sessionStorage.setItem('user_login', util.aes_encrypt(_d));
    util.pushRouter('/homePage','replace');
  },
  [types.LOGIN_TWO](state, d){
    var _d = d;
    _d.isLogin = true;
    state.login = _d;
  },
  [types.LOGINOUT](state, d){
    localStorage.removeItem('userDate');
    sessionStorage.removeItem('user_login');
    state.login = {};
    util.pushRouter('/login');
  },
  [types.USERMODIFY](state, d){
    //登录信息的内容 和用户的信息内容 为了永久登录
    if (d.name) {
          let user_login = sessionStorage.getItem('user_login');
          if (user_login && typeof user_login == "string") {
              var _user_login = util.aes_decrypt(user_login);
              _user_login.name=d.name;
              sessionStorage.setItem('user_login',util.aes_encrypt(_user_login));
          }
          state.login.name=d.name;
    }
    if (d.login) {
          //登录信息的内容
          let user_login = sessionStorage.getItem('user_login'),userDate = localStorage.getItem('userDate');
          if (user_login && typeof user_login == "string") {
              _user_login = util.aes_decrypt(user_login);
              _user_login.login=d.login;
              sessionStorage.setItem('user_login',util.aes_encrypt(_user_login));
          }
          if (userDate && typeof userDate == "string") {
              var _userDate = util.aes_decrypt(userDate);
              _userDate.userDate.login=d.login;
              //为了永久登陆制定了缓存账户密码~！
              localStorage.setItem('userDate',util.aes_encrypt(_userDate));
          }
          state.login.login=d.login;
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
