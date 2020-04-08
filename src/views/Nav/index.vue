<template>
  <div id="nav">
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="green">
      <van-tabbar-item v-for="item in navList" :key="item.txt" :icon="item.icon" :name="item.name" @click="handlerLink(item.path)" >
        {{item.txt}}
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
  import Vue from 'vue';
  import { Tabbar, TabbarItem } from 'vant';

  Vue.use(Tabbar);
  Vue.use(TabbarItem);
  export default {
    name: "index",
    data(){
      return {
          navList:[
            {txt:'首页',icon:"wap-home", path:"homepage",name:"home"},
            {txt:'分类',icon:"apps-o", path:"classification",name:"classification"},
            {txt:'购物车',icon:"shopping-cart-o", path:"shopping",name:"shopping"},
            {txt:'我的易果',icon:"manager-o", path:"my",name:"my"},
          ],
        active: 'home'
      }
    },
    methods: {
      handlerLink(path){
        this.$router.push(path)
      }
    }
  };
</script>

<style scoped lang="scss">

  #nav {
  }
</style>