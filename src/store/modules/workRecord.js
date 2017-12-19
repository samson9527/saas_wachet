import * as util from '../../utils/util'
import * as types from '../mutation-types'
import router from '../../router'
import axios from 'axios'
import store from '../../store'
import {Toast, Indicator ,MessageBox } from 'mint-ui';

const state = {
  dateTime: {M:'',d:'',h:'00',m:'00',s:'00',q:'',S:'',w:'',Y:''},
}
const getters = {
  getDateTime: state => state.dateTime,
}

const actions = {
  //获取时时更新事件细节
  doDateTime({ commit }, data) {
      commit('DATETIME', data);
  },
  //点击打卡
  doClick({ commit }, data) {
      axios.post('add/sign_record',data).then((r)=> {
          Indicator.close();
      }).catch((e)=> {
          Indicator.close();
      })
  },
}
const mutations = {
  [types.DATETIME](state, d){
     state.dateTime=d;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
