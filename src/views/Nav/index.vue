<template>
  <div id="nav">
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="green" v-show="isNav">
        <van-tabbar-item to="/homepage" icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item to="/classification" icon="apps-o" >分类</van-tabbar-item>
        <van-tabbar-item to="/shopping" icon="shopping-cart-o" :badge="allLength">购物车</van-tabbar-item>
        <van-tabbar-item to="/my" icon="manager-o" >我的易果</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
  import Vue from "vue";
  import { Tabbar, TabbarItem } from "vant";
  import { mapState  , mapGetters} from "vuex";

  Vue.use(Tabbar);
  Vue.use(TabbarItem);
  export default {
    name: "index",
    data() {
      return {
        navList: [
          { txt: "首页", icon: "wap-home", path: "homepage", name: "home" },
          { txt: "分类", icon: "apps-o", path: "classification", name: "classification" },
          { txt: "购物车", icon: "shopping-cart-o", path: "shopping", name: "shopping" },
          { txt: "我的易果", icon: "manager-o", path: "my", name: "my" }
        ],
        active: "home"
      };
    },
    methods: {

      handlerLink(path) {
        this.$router.push(path);
      }
    },
    created(){
      console.log(this.isNav);
    },
    computed:{
      ...mapGetters("cart", ["allLength"]),
      ...mapState("nav",["isNav"])
    }
  };
</script>

<style scoped lang="scss">

  #nav {
  }
</style>