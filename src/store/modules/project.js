import * as util from '../../utils/util'
import * as types from '../mutation-types'
import router from '../../router'
import axios from 'axios'
import store from '../../store'
import { Toast, Indicator, MessageBox } from 'mint-ui';

const state = {
    queryMeber: '', //查询团队成员
    createGroup: '', //创建团队
    confirmAdd: '', //添加成员保存
    addClass: '', //添加班组
    updateClass: '', //修改班组
    queryPosition: '', //查询职位 以及工种
    updateMember: '', //更新成员信息
    disable: '', //删除团队成员的
    queryClass: '', //查询all 班组
    delete: '', //删除班组
}

const getters = {
    getQueryMeber: state => state.queryMeber,
    getCreateGroup: state => state.createGroup,
    getConfirmAdd: state => state.confirmAdd,
    getAddClass: state => state.addClass,
    getUpdateClass: state => state.updateClass,
    getQueryPosition: state => state.queryPosition,
    getUpdateMember: state => state.updateMember,
    getDisable: state => state.disable,
    getQueryClass: state => state.queryClass,
    getDelete: state => state.detele

}

const actions = {
    actionsQueryMeber({ commit }, data) {
        axios.post('query/member', data)
            .then((r) => {
                commit('QUERYMEMBER', r.data)
            }).catch((e) => {
                console.log(e, 'e')
            })
    },
    actionsCreateGroup({ commit }, data) {
        axios.post('add/team', data).then((r) => {
            commit('CREATEGROUP', r)
        }).catch((e) => {
            console.log(e, 'e')
        })
    },
    actionsConfirmAdd({ commit }, data) {
        axios.post('add/member', data)
            .then((r) => {
                commit('CONFIRMADD', r)
            }).catch((e) => {
                console.log(e, 'e')
            })
    },
    actionsAddClass({ commit }, data) {
        axios.post('add/class', data)
            .then((r) => {
                console.log(r.data, '88888888888888888888')
                commit('ADDCLASS', r.data)
            }).catch((e) => {
                console.log(e, 'e')
            })
    },
    actionsUpdateClass({ commit }, data) {
        axios.post('update/class', data)
            .then((r) => {
                commit('UPDATECLASS', r.data)
            }).catch((e) => {
                console.log(e, 'e')
            })
    },
    actionsQueryPosition({ commit }, data) {
        axios.post('query/table', data)
            .then((r) => {
                commit('QUERYPOSITION', r.data)
            }).catch((e) => {
                console.log(e, 'e')
            })
    },
    actionsUpdateMember({ commit }, data) {
        axios.post('update/member', data)
            .then((r) => {
                commit('UPDATEMEMBER', r.data)
            }).catch((e) => {
                console.log(e, 'e')
            })
    },
    actionsDisable({ commit }, data) {
        axios.post('disable', data).then((r) => {
            commit('DISABLE', r.data)
        }).catch((e) => {
            console.log(e, 'e')
        })
    },
    actionsQueryClass({ commit }, data) {
        axios.post('query/class', data).then((r) => {
            commit('QUERYCLASS', r.data)
        }).catch((e) => {
            console.log(e, 'e')
        })
    },
    actionsDetele({ commit }, data) {
        axios.post('delete', data).then((r) => {
            console.log(r.data, 'delete')
            commit('DELETE', r.data)
        }).catch((e) => {
            console.log(e, 'e')
        })
    }
}

const mutations = {
    [types.QUERYMEMBER](state, d) {
        state.queryMeber = d;
    },
    [types.CREATEGROUP](state, d) {
        state.createGroup = d;
    },
    [types.CONFIRMADD](state, d) {
        state.confirmAdd = d
    },
    [types.ADDCLASS](state, d) {
        state.addClass = d
    },
    [types.UPDATECLASS](state, d) {
        state.updateClass = d
    },
    [types.QUERYPOSITION](state, d) {
        state.queryPosition = d
    },
    [types.UPDATEMEMBER](state, d) {
        state.updateMember = d
    },
    [types.DISABLE](state, d) {
        state.disable = d
    },
    [types.QUERYCLASS](state, d) {
        state.queryClass = d
    },
    [types.DELETE](state, d) {
        state.delete = d
    }

}
export default {
    state,
    getters,
    actions,
    mutations
}