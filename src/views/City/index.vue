<template>
  <div>
    <!--热门城市-->
    <h3>热门城市</h3>
    <div class="hot">
      <span v-show="hotList" v-for="item in hotList" :key="item.AreaId"
            @click="handlerHot(item)">{{item.AreaName}}</span>
    </div>
    <!--所有城市-->
    <template v-for="item in city">
      <h4 class="h4" :key="item.FirstLetter">{{item.FirstLetter}}</h4>
      <div class="div">
        <span v-for="i in item.CityList" :key="i.AreaName" @click="handlerHot(i)">
          {{i.AreaName}}
        </span>
      </div>
    </template>

    <!--地区-->
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" :round="false" :title="params.AreaName"/>
  </div>
</template>

<script>
  import { instance } from "@/utils/http";
  import Vue from "vue";
  import { ActionSheet, Toast } from "vant";
  import { mapMutations  , mapState} from "vuex";

  Vue.use(ActionSheet);
  export default {
    name: "index",
    data() {
      return {
        hotList: [],
        city: [],
        show: false,
        actions: [],
        params: "",
        currentCity: ""
      };
    },
    component: {
    },
    methods: {
      ...mapMutations("home", ["setCtiy"]),
      handlerHot(params) {
        const tost = Toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          overlay: true
        });
        this.show = true;
        this.params = params;
        this.actions = [];
        instance.post("/api/user/Area/GetDistrictList", {
          Head: {
            Token: "",
            LoginToken: "",
            DeviceId: "01e176b22701db6e63214f6e78479bc6"
          },
          Body: {
            CityId: params.AreaId
          }
        }).then((res) => {
          tost.clear();
          res.data.Data.DistrictList.forEach((item) => {
            this.actions.push({
              name: item.AreaName,
              AreaId: item.AreaId
            });
          });
        });
      },
      onSelect(item) {
        // 默认情况下点击选项时不会自动收起
        // 可以通过 close-on-click-action 属性开启自动收起
        this.show = false;
        this.currentCity = item;
        let params = {
          CityId: this.params.AreaId,
          name: this.params.AreaName,
          AreaId: this.currentCity.AreaId,
          AreaCode: this.params.AreaCode
        };
        this.setCtiy(params);
        this.$router.back()
      }
    },

    mounted() {
      instance.post("/api/user/Area/GetCityList", {
        Head: {
          Token: "",
          LoginToken: "",
          DeviceId: "01e176b22701db6e63214f6e78479bc6"
        },
        Body: {}
      }).then((res) => {
        this.city = res.data.Data.CityList;
        this.hotList = res.data.Data.HotCityList[0].CityList;
      });
    },
    created() {
    }
  };
</script>

<style scoped lang="scss">


  .h4 {
    position: relative;
    height: 1rem;
    padding: 0 .32rem;
    line-height: 1rem;
    font-size: .42rem;
    color: #385c9a;
  }

  .div {
    position: relative;
    padding: .32rem .64rem 0;
    background: #fff;
    overflow: hidden;

    span {
      float: left;
      width: 2.4rem;
      height: .9rem;
      margin: 0 1.97rem .32rem 0;
      line-height: .9rem;
      font-size: .38rem;
      color: #333;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span:nth-child(3n) {
      margin-right: 0;
    }
  }

  h3 {
    height: 1.32rem;
    padding: 0 .32rem;
    line-height: 1.32rem;
    font-size: .42rem;
    font-weight: 400;
    color: #333;
  }

  .hot {
    padding: 0 .64rem;
    overflow: hidden;

    span {
      position: relative;
      float: left;
      width: 2.4rem;
      height: .9rem;
      margin: 0 1.97rem .32rem 0;
      border-radius: 3px;
      background: #fff;
      line-height: .94rem;
      font-size: .38rem;
      color: #333;
      text-align: center;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        border: 1px solid #ddd;
        box-sizing: border-box;
        transform: scale(0.5);
        transform-origin: 0 0;
        border-radius: 6px;
        border-color: gray;
      }
    }
  }

  .hot span:nth-child(3n) {
    margin-right: 0;
  }
</style>