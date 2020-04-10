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
    <mt-tab-container v-model="selected" v-if="list.length > 0">
      <mt-tab-container-item id="1">
        <det :list="list" @addData="handlerAddData" :parmas="setParams"></det>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <det :list="list" @addData="handlerAddData"></det>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <det :list="list" @addData="handlerAddData"></det>
      </mt-tab-container-item>
    </mt-tab-container>
    <div v-else class="noList">
      <img src="//img07.yiguoimg.com/d/web/180315/013111/212501/noting@3x.png" alt="">
      <p>抱歉，没有找到您要的商品</p>
    </div>

    <!--购物车-->
    <div class="option">
      <router-link tag="a" class="num" to="/shopping">
        <i>{{allLength}}</i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { instance } from "@/utils/http";
  import { mapState, mapMutations , mapGetters } from "vuex";
  import det from "@/components/Det";
  import { Toast } from "vant";
  import Vue from "vue";

  Vue.use(Toast);

  export default {
    name: "index",
    components: {
      det
    },
    data() {
      return {
        selected: "",
        list: [],
        flag: false,
        params: {}
      };
    },
    beforeCreate() {
      const tost = Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        overlay: true,
        duration: 1000
      });
    },
    created() {
    },
    computed: {
      ...mapState("details", ["id"]),
      ...mapState("home", ["ctiy"]),
      ...mapGetters("cart", ["allLength"]),

    },
    methods: {
      setParams(val) {
        this.params = val;
        this.setCarts(this.params);
      },
      ...mapMutations("product", ["setproductObj"]),
      ...mapMutations("cart", ["setCarts"]),
      handlerChange() {
        this.flag = !this.flag;
        if (this.flag) {
          this.httpList(2);
        } else {
          this.httpList(1);
        }
        ;
      },
      handlerAddData(data) {
        //传数据到详情页面
        let params = {
          cityId: this.ctiy.cityId,
          districtId: this.ctiy.districtId,
          AreaCode: this.ctiy.AreaCode,
          name: this.ctiy.name,
          CommodityCode: data.CommodityCode,
          CommodityId: data.CommodityId
        };
        this.setproductObj(params);
        this.$router.push("/product");

      },
      httpList(num) {
        const tost = Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          overlay: true,
          duration: 1000
        });
        instance.post("/api/commodityapi/Commodity/GetSearchList", {
          Head: {
            Token: "",
            LoginToken: "",
            CityId: this.ctiy.cityId,
            CityCode: this.ctiy.AreaCode,
            DistrictId: this.ctiy.districtId,
            DeviceId: "01e176b22701db6e63214f6e78479bc6",
            MobileOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
          },
          Body: {
            Keyword: "",
            CategoryId: this.id,
            CategoryCode: "",
            PageIndex: 1,
            Sort: num
          }
        }).then((res) => {
          tost.clear();
          console.log(res.data.Data);
          this.list = res.data.Data.CommodityList;
          console.log(this.list);
        });
      }
    },
    mounted() {
      this.selected = "1";
      this.httpList(4);
    },

  };
</script>

<style scoped lang="scss">

  .noList {
    padding-top: 3rem;

    img {
      width: 3.6rem;
      height: 3.6rem;
      display: block;
      margin: 0 auto
    }

    p {
      font-size: .46rem;
      color: #808080;
      text-align: center;
      padding: 1rem 1.25rem 1.9rem;
      line-height: .6rem;
    }
  }

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