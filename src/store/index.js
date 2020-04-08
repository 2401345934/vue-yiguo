import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

import home from "./module/home"
import details from "./module/details"

export default new Vuex.Store({
  modules: {
    home,
    details
  },
  plugins: [createPersistedState()],
});
