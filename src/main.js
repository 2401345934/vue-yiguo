import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入axios
import axios from "axios";
//引入Vant
import Vant from "vant";
import "vant/lib/index.css";

import _ from "lodash";

Vue.prototype._ = _

//引入 Mint ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)
//引入
import "./utils/http"

//引入全局样式
import "./styles/main.scss";

//引入 rem
import "./utils/rem"

Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
