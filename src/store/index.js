import Vue from 'vue'
import Vuex from 'vuex'
import persons from './modules/persons'

Vue.use(Vuex)
Vue.config.devtools = true

export const store = new Vuex.Store({
  modules: {
    persons
  }
})
