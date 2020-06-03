import Vue from 'vue'
import Vuex from 'vuex'
import { GETLOGIN, LOGINTYPE } from './mutations-type'
import { getLogin } from '../api/user'
import { stringify } from 'querystring'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: true,
    userInfo: {
    }
  },
  mutations: {
    [GETLOGIN]: (state, obj) => {
      state.userInfo = obj
      state.isLogin = true
      localStorage.setItem("userInfo", JSON, stringify(obj))
    },
    [LOGINTYPE]: function (state, blog) {
      state.isLogin = blog
    }
  },
  actions: {
    getLogin({ commit }, { obj, callback }) {
      //发请求 返回数据
      getLogin(obj).then(({ data }) => {//解构data 拿数据 返回数据

        if (data.status == 0) {
          

          commit('GETLOGIN', data.data)//发请求
          // 全局存储 token
          window.localStorage['token'] = data.token
          // console.log(" window.localStorage['token']", window.localStorage['token']);
          
          callback && callback('success')
        } else {
          callback && callback('fail')
        }
      })
    }
  }
})
