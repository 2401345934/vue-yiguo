import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

import home from "./module/home"
import details from "./module/details"
import product from "./module/product"
import nav from "./module/nav"
import cart from "./module/cart"

export default new Vuex.Store({
  modules: {
    home,
    details,
    product,
    nav,
    cart
  },
  plugins: [createPersistedState()],
});
