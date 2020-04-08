<template>
  <div>
    <mt-navbar v-model="selected" :fixed="true">
      <mt-tab-item id="1" @click.native="httpList(4)">销量</mt-tab-item>
      <mt-tab-item id="2" @click.native="httpList(5)">新品</mt-tab-item>
      <mt-tab-item id="3" @click.native="handlerChange">价格</mt-tab-item>
    </mt-navbar>


    <!--占位符-->
    <div style="height: 50px;"></div>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <det  :list="list"></det>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <det  :list="list"></det>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <det  :list="list"></det>
      </mt-tab-container-item>
    </mt-tab-container>

    <!--购物车-->
    <div class="option">
      <router-link tag="a" class="num" to="/shopping">
        <i>0</i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { instance } from "@/utils/http";
  import { mapState } from "vuex";
  import det from "@/components/Det"
  export default {
    name: "index",
    components:{
      det
    },
    data(){
      return {
        selected: "",
        list:[],
        flag: false
      }
    },
    created() {
    },
    computed: {
      ...mapState("details",["id"]),
      ...mapState("home", ["ctiy"])
    },
    methods: {
      handlerChange(){
        this.flag = !this.flag;
        if (this.flag) {
            this.httpList(2)
        } else {
          this.httpList(1)
        };
      },
      httpList(num){
        instance.post('/api/commodityapi/Commodity/GetSearchList',{
          Head: {
            Token: "",
            LoginToken: "",
            CityId: this.ctiy.cityId,
            CityCode: this.ctiy.AreaCode,
            DistrictId: this.ctiy.districtId,
            DeviceId: "01e176b22701db6e63214f6e78479bc6",
            MobileOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
          },
          Body: {
            Keyword: "",
            CategoryId: this.id,
            CategoryCode: "",
            PageIndex: 1,
            Sort: num
          }}).then((res) => {
          console.log(res.data.Data);
          this.list = res.data.Data.CommodityList
          console.log(this.list);
        })
      },
    },
    mounted(){
      this.selected = "1"
      this.httpList(4)
    },
    updated(){
    }
  };
</script>

<style scoped lang="scss">
.option {
  position: fixed;
  bottom: 1rem;
  right: .5rem;
  z-index: 100;
  height: 2.93rem;
  a {
    z-index: 100;
    position: relative;
    display: block;
    width: 1.1rem;
    height: 1.1rem;
    background: url(//img05.yiguoimg.com/d/web/180508/01311/150610/cart1.png) no-repeat;
    background-size: 100%;

    i {
      position: absolute;
      right: -.3rem;
      top: -.3rem;
      min-width: .3rem;
      height: .5rem;
      padding: 0 .1rem;
      border: 1px solid #fff;
      border-radius: .25rem;
      background: #ff6353;
      line-height: .5rem;
      font-size: .3rem;
      font-style: normal;
      color: #fff;
      text-align: center;
    }
  }
}

</style>