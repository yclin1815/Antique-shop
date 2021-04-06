import Vue from 'vue'
import Vuex from 'vuex'
import alertMessageModules from './modules/alertMessage'
import cartModules from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // 嚴謹模式

  state: {
    isLoading: false
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    }
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    }
  },
  getters: {
    isLoading: (state) => state.isLoading
  },
  modules: {
    alertMessageModules,
    cartModules
  }
})
