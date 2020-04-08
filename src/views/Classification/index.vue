<template>
  <div class="category">
    <!--搜索-->
    <div class="search">
      <div class="search-c">
        <i class="i1"></i>
        <input type="text" v-model="value">
        <i class="i2" v-show="value" @click="handlerValue"></i>
      </div>
      <span class="txt">搜索</span>
    </div>
    <!--遮罩层-->
    <van-overlay :show="show" @click="value = '' " v-show="value ? show= true : show=false"/>
    <!--分类-->
    <div class="wrap">
      <van-tree-select
              :items="items"
              :active-id.sync="activeId"
              :main-active-index.sync="activeIndex"
      >
        <template #content>
          <ul class="list">
            <li>
              <div class="list-c">
                <a href="javascript:;" v-for="item in list[activeIndex]" :key="item.CategoryId"
                   @click="handlerChange(item)">
                  <img :src="item.PictureUrl" alt="">
                  {{item.CategoryName}}
                </a>
              </div>
            </li>
          </ul>
        </template>
      </van-tree-select>
    </div>
  </div>
</template>

<script>
  import { instance } from "@/utils/http";
  import Vue from "vue";
  import { TreeSelect, Toast } from "vant";
  import { mapGetters, mapState, mapMutations } from "vuex";

  Vue.use(Toast);
  Vue.use(TreeSelect);
  export default {
    name: "index",
    data() {
      return {
        value: "",
        show: true,
        list: [],
        items: [],
        activeId: 1,
        activeIndex: 0
      };
    },
    methods: {
      ...mapMutations("details", ["setId"]),
      handlerValue() {
        this.value = "";
      },
      handlerChange(data) {
        this.setId(data);
        this.$router.push("/details");
      }
    },
    computed: {
      ...mapGetters("home", ["getCity"]),
      ...mapState("home", ["ctiy"])
    },
    beforeCreate() {
      const tost = Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        overlay: true,
        duration: 1500
      });
    },
    mounted() {
      instance.post("/api/commodityapi/Commodity/GetAllCategory", {
        Head: {
          token: "",
          loginToken: "",
          CityId: this.ctiy.cityId,
          CityCode: this.ctiy.AreaCode,
          DistrictId: this.ctiy.districtId,
          DeviceId: "01e176b22701db6e63214f6e78479bc6",
          MobileOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
        },
        Body: ""
      }).then((res) => {
        res.data.Data.CategoryList.forEach((item, index) => {
          this.items.push({
            text: item.CategoryName,
            children: []
          });
          this.list.push(item.Childs);
        });
      });
    }
  };
</script>

<style scoped lang="scss">

  .list {

    li {

      div {
        width: 100%;
        padding: .5rem .3rem 50px .3rem;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
        a {
          float: left;
          display: inline-block;
          width: 2.46rem;
          height: 3.18rem;
          position: relative;
          padding-top: 2rem;
          text-align: center;
          box-sizing: border-box;
          font-size: .38rem;
          color: #808080;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 1.89rem;
            height: 1.89rem;
            margin: 0 .43rem;
          }
        }
      }
    }
  }

  .wrap {
    margin-top: 1.2rem;
  }

  .my-class {

  }

  .search {
    position: fixed;
    top: 0;
    left: 0;
    height: 1.35rem;
    width: 100%;
    background: #fff;
    padding: .25rem .32rem;
    box-sizing: border-box;
    z-index: 102;
    .search-c {
      position: relative;
      height: .9rem;
      width: 10.2rem;
      background: #f4f4f4;
      border-radius: 20px;
      padding: 0 .7rem 0 1.05rem;
      box-sizing: border-box;

      .i1 {
        position: absolute;
        left: .38rem;
        top: 50%;
        margin-top: -.215rem;
        display: inline-block;
        width: .43rem;
        height: .43rem;
        background: url(//img05.yiguoimg.com/d/web/170830/00913/153914/search.png);
        background-size: 100% 100%;
      }

      .i2 {
        position: absolute;
        right: .28rem;
        top: 50%;
        margin-top: -.2rem;
        display: inline-block;
        width: .40rem;
        height: .40rem;
        background: url(//img05.yiguoimg.com/d/web/170830/00913/153914//icon-close.png);
        background-size: 100% 100%;
      }

      input {
        width: 8rem;
        height: 100%;
        background: #f4f4f4;
        border: none;
        border-radius: 20px;
        font-size: .4rem;
        line-height: .4rem;
        padding-top: .05rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

    }
    .txt {
      position: absolute;
      right: 0;
      top: 0;
      padding-right: .32rem;
      display: block;
      height: 1.35rem;
      width: 1.3rem;
      text-align: center;
      line-height: 1.35rem;
      font-size: .46rem;
      color: #11B57C;
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: #ddd;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
    }
  }
</style>