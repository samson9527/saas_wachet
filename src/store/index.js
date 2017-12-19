import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import * as types from './mutation-types'

import login from './modules/login'
import project from './modules/project'
import workRecord from './modules/workRecord'
Vue.use(Vuex)

export default new Vuex.Store({
    getters,
    actions,
    modules: {
        login,
        project,
        workRecord,
    },
    mutations
})