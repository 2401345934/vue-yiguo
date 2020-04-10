<template>
  <div class="home">
    <!--顶部搜索-->
    <div class="search">
      <div class="search-r">
        <a href="javascript:;"></a>
        <span @click="$router.push('/classification')">
          请输入商品名称
        </span>
      </div>
      <a href="javascript:;" @click="$router.push('/city')">
        {{ctiy.name}}
        <i></i>
      </a>
    </div>
    <!--轮播图-->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="2500" indicator-color="white">
        <van-swipe-item v-show="bannerList" v-for="item in bannerList" :key="item.adPictureId"><img
                :src="item.pictureUrl" alt=""></van-swipe-item>
      </van-swipe>
    </div>

    <!--菜单-->
    <div class="menu">
      <a href="javascript:;" v-show="dataList" v-for="item in dataList" :key="item.navId">
        <i>
          <img :src="item.pictureUrl" alt="">
        </i>
        <p>{{item.navName}}</p>
      </a>
    </div>

    <!--椭圆图-->
    <div class="first-screen" v-if="navBottomImg.length > 0">
      <img :src="navBottomImg.pictureUrl" alt="">
    </div>


    <!--纵向滚动-->
    <div class="first-news">
      <i class="title"></i>
      <van-swipe style="height: 0.66rem;" vertical class="swipe" autoplay="3500" :show-indicators="false">
        <van-swipe-item v-show="news" v-for="item in news" :key="item.fastReportId">{{item.fastReportTitle}}
        </van-swipe-item>
      </van-swipe>
    </div>


    <!--图片-->
    <div class="wrap" v-if="imgList.length > 0">
      <div class="one-image" v-for="item in imgList">
        <a href="javascript:;">
          <img :src="item" alt="">
        </a>
      </div>
    </div>

    <!--大图片-->
    <div class="group" v-if="isFlag">
      <a href="javascript:;" class="group-t" >
        <img :src="twoDataList[1].adPictures[0].pictureUrl" alt="">
      </a>
      <div class="group-list">
        <div class="in">
          <div class="item" v-for="item in twoDataList[1].commoditysComponentList" :key="item.commodityComponentId">
            <div class="pic">
              <a href="javascript:;">
                <img :src="item.pictureUrl" alt="">
              </a>
            </div>
            <div class="info">
              <p class="name">
                <a href="javascript:;">{{item.commodityName}}</a>
              </p>
              <div class="price">
                <strong>¥{{item.commodityPrice}}</strong>
                <i></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!--占位符-->
    <div style="height: 50px;"></div>
  </div>

</template>

<script>
  import { instance } from "@/utils/http";
  import Vue from "vue";
  import { Swipe, SwipeItem, Toast } from "vant";
  import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

  Vue.use(Toast);
  Vue.use(Swipe);
  Vue.use(SwipeItem);
  export default {
    name: "index",
    data() {
      return {
        toDataList: [],

      };
    },
    methods: {
      ...mapActions("home", ["setDataList", "setErDataList"])
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
    computed: {
      ...mapState("home", ["ctiy"]),
      ...mapGetters("home", ["dataList", "navBottomImg", "news", "bannerList", "imgList", "twoDataList","isFlag"])
    },
    created() {
      this.setDataList();

      window.onscroll = () => {
        if (document.documentElement.scrollTop >= 100) {
          this.setErDataList();
          window.onscroll = null;
          console.log(this.twoDataList);
        };

      };
    }
  };
</script>

<style scoped lang="scss">

  .group {
    width: 100%;
    background: #fff;
    position: relative;
    .group-t {
      width: 100%;
      height: 7.2rem;
      img {
        width: 100%;
        height: 7.2rem;
      }
    }
    .group-list {
      overflow: hidden;
      width: 100%;
      .in {
        overflow-x: scroll;
        overflow-y: hidden;
        box-sizing: border-box;
        width: 100%;
        padding-bottom: .2rem;
        white-space: nowrap;
        padding-left: .53rem;
        .item {
          display: inline-block;
          background: #fff;
          margin-right: .33rem;
          border-radius: .2rem;
          box-shadow: 0 0 5px rgba(0, 0, 0, .1);
          vertical-align: middle;
          .pic {
            position: relative;
            a {
              display: inline-block;
              img {
                width: 4.11rem;
                height: 4.11rem;
                border-radius: .2rem .2rem 0 0;
              }
            }
          }
          .info {
            box-sizing: border-box;
            width: 4.11rem;
            text-align: left;
            padding-left: 0;
            padding: .27rem;
            .name {
              font-size: 11px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              a {
                color: #333;
              }
            }
            .price {
              margin-top: .13rem;
              height: .66rem;
              line-height: .66rem;
              font-size: 11px;
              strong {
                margin-right: .1rem;
                font-size: .36rem;
                font-weight: bold;
                color: #fb3d3d;
                font-size: .4rem;
              }
              i {
                width: .66rem;
                height: .66rem;
                background: url(//img07.yiguoimg.com/d/web/190514/00193/172123/ksgw.png) no-repeat;
                background-size: 100% 100%;
                float: right;
                border-radius: 50%;
                background-color: #01b27a;
              }
            }
          }
        }
      }
    }
  }

  .one-image {
    margin-top: -.3rem;
    a {
      display: inline-block;
      width: 100%;
      background: #d6d6d7 no-repeat 50%;
      img {
        width: 100%;
      }
    }
  }

  .first-news {
    position: relative;
    box-sizing: border-box;
    height: 1.1rem;
    padding: .22rem .32rem .22rem 3.35rem;
    background: #fff;
    overflow: hidden;
    margin-bottom: .2rem;
    .title {
      position: absolute;
      top: .35rem;
      left: .5rem;
      width: 2.26rem;
      height: .44rem;
      background: url(//img06.yiguoimg.com/e/web/161222/018522/134216/news.png) no-repeat;
      background-size: 100% 100%;

      &::after {
        position: absolute;
        top: -.12rem;
        left: 2.42rem;
        width: 1px;
        height: .66rem;
        content: "";
        -webkit-transform: scaleX(.5);
        transform: scaleX(.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        background: #e2e2e2;
      }

    }
    .swipe {
      width: 100%;
      height: .66rem;
      overflow: hidden;
    }

  }

  .first-screen {
    background: #d6d6d7 no-repeat 50%;

    img {
      display: block;
      width: 100%;
      height: 3.8rem;
    }
  }

  .menu {
    background: #fff;
    background-size: 100% 100%;
    padding: .27rem .53rem;
    overflow: hidden;

    a {
      float: left;
      width: 25%;
      padding: 0 0 .48rem;
      text-align: center;
      font-size: .36rem;
      color: #333;
      i {
        display: block;
        width: 3rem;
        padding: 0 0 .05rem;
        text-align: center;
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 1.6rem 1.6rem;
        img {
          display: inline-block;
          width: 2.05rem;
          height: 2.05rem;
        }
      }

      p {
        font-size: .43rem;
        color: rgb(51, 51, 51);
      }
    }
  }

  .banner {
    margin-top: 1.2rem;
    position: relative;
    width: 100%;
    height: 7.2rem;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .search {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 1.24rem;
    padding: .17rem .32rem .17rem 2.2rem;
    background: linear-gradient(90deg, #39da85, #01b27a);
    a {
      position: absolute;
      top: .32rem;
      left: 0;
      width: 2.2rem;
      height: .6rem;
      line-height: .64rem;
      text-align: center;
      font-size: .46rem;
      color: #fff;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      i {
        display: inline-block;
        width: .24rem;
        height: .13rem;
        margin: 0 0 0 .16rem;
        vertical-align: .09rem;
        background: url(//img05.yiguoimg.com/e/web/161222/01858/110628/arrow.png) no-repeat;
        background-size: 100% 100%;
      }

    }

    .search-r {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: .9rem;
      padding: 0 .4rem 0 1.06rem;
      border-radius: .45rem;
      background: #fff;
      a {
        position: absolute;
        top: .12rem;
        left: .18rem;
        width: .66rem;
        height: .66rem;
        background: url(//img07.yiguoimg.com/d/web/190515/00191/152133/home-search.png) no-repeat;
        background-size: 100% 100%;
      }

      span {
        position: absolute;
        top: .06rem;
        left: .9rem;
        width: 3rem;
        height: .8rem;
        line-height: .8rem;
        font-size: .4rem;
        color: #999;
      }

    }

  }

</style>