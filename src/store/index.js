import Vue from 'vue'
import Vuex from 'vuex'
import alertMessageModules from './modules/alertMessage'
import paginationModules from './modules/pagination'
import productsModules from './modules/products'
import favoriteModules from './modules/favorite'
import cartModules from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
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
    paginationModules,
    productsModules,
    favoriteModules,
    cartModules
  }
})
