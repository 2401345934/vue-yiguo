<template>
  <div class="product">

    <!--轮播-->
    <div class="banner">
      <i @click="$router.back()"></i>
      <van-swipe class="productswipe" :autoplay="3000" indicator-color="green">
        <van-swipe-item v-for="item in dataList.CommodityInfo.Pictures" :key="item">
          <img :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--信息-->
    <div class="info">
      <p class="title"> {{dataList.CommodityInfo.CommodityName}}</p>
      <p class="subhead">
        <span>{{dataList.CommodityInfo.SubTitle}}</span>
      </p>
      <div class="price">
        <p class="in">
          <span>
            <i>¥</i>
            {{dataList.CommodityInfo.SellPrice}}
          </span>
        </p>
        <p class="area">
          产地
          <span>
          {{dataList.CommodityInfo.PlaceOfOrigin}}
          </span>
        </p>
      </div>
    </div>

    <!--退货信息-->
    <div class="back">
      <span class="dian"></span>
      {{dataList.CommodityInfo.CanNoReasonToReturnText}}
    </div>

    <!--规格-->
    <div class="norms">
      <div class="norms-t">
        规格
        <span v-for="item in dataList.CommodityInfo.Speces" :key="item.CommodityId" @click="event($event)">
          {{item.Spec}}
        </span>
      </div>
      <!--数量-->
      <div class="norms-b">
        数量
        <van-stepper v-model="value" min="1" :max="dataList.CommodityInfo.MaxLimitCount"/>
      </div>
    </div>


    <!--地址-->
    <div class="address">
      <p class="tit">送至</p>
      <div>
        <p class="add">
          <span></span>
          {{dataList.CommodityInfo.ShippingAddress}}
        </p>
        <div class="infor">
          <span>有货</span>
          {{dataList.CommodityInfo.DeliveryTips}}
        </div>
      </div>
    </div>


    <!--评论-->
    <div class="evaluate">
      <p class="evaluate-t">
        <span class="count">评价({{commentList.VoteCount}})</span>
        <span class="number">查看全部
        <i></i>
        </span>
      </p>
      <div class="evaluate-b" v-for="item in commentList.VoteList.slice(0,1)">
        <div class="txt">
          <div class="left" >
            <img :src="item.UserPic" alt="">
            <p class="userName" >
              {{item.UserName}}
            </p>
            <div class="stars">
              <span></span>
            </div>
            <span class="span4">{{item.CreateTime}}</span>
          </div>
        </div>
        <p class="classp">{{item.CommentContent}}</p>
      </div>
    </div>

    <!--图文详情-->
    <div class="detail">
      <a href="javascript:;" @click="$router.push('/bigimg')">查看图文详情</a>
    </div>

    <!--底部-->
    <van-goods-action>
      <van-goods-action-icon color="#07c160" icon="chat-o" text="首页" @click="onClickIcon" to="/homePage"/>
      <van-goods-action-icon color="#07c160" badge="0" icon="cart-o" text="购物车" @click="onClickIcon" to="/shopping"/>
      <van-goods-action-button color="#FB3D3D" type="warning" text="加入购物车" @click="onClickButton"/>
    </van-goods-action>
  </div>

</template>

<script>
  import { instance } from "@/utils/http";
  import { mapGetters, mapActions } from "vuex";
  import Vue from "vue";
  import { Toast } from "vant";

  export default {
    name: "index",
    data() {
      return {
        value: "",
        valueState:0,
        plList:[]
      };
    },
    methods: {
      event(e){
        e.target.classList.add('active')
      },
      onClickIcon() {
      },
      onClickButton() {
      },
      ...mapActions("product", ["getData", "getCommentList"])
    },
    computed: {
      ...mapGetters("product", ["dataList", "commentList"])
    },
    mounted() {
      this.getData();
      this.getCommentList();
      console.log(this.commentList.VoteList.slice(0,1));
      const tost = Toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        overlay: true,
        duration: 1000
      });
    },
  };
</script>

<style scoped lang="scss">

  .detail {
    padding: .7rem 0 2.35rem;
    background: #FFF;
    a {
      display: block;
      width: 4rem;
      padding: .22rem .28rem;
      border: 1px solid #aaa;
      color: #999;
      font-size: .46rem;
      margin: 0 auto;
      border-radius: 3px;
      text-align: center;
    }

  }

  .evaluate {
    overflow: hidden;
    background: #fff;
    .evaluate-t {
      position: relative;
      padding: .45rem .53rem;
      font-size: .43rem;
      color: #999;
      overflow: hidden;
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

      .count {
        float: left;
      }

      .number {
        float: right;
        padding-right: .6rem;
        color: #666;
        i {
          position: absolute;
          right: .32rem;
          top: 50%;
          margin-top: -.23rem;
          display: inline-block;
          width: .24rem;
          height: .47rem;
          background: url(//img05.yiguoimg.com/d/web/170830/00911/152542/arrow.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }

    .evaluate-b {
      position: relative;
      padding: .34rem .53rem .53rem;

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
      .txt {
        padding: .62rem 0 0rem;

        &::after{
          content: ' ';
          display: block;
          height: 0;
          clear: both;
        }
        .left {
          position: relative;
          padding-left: 1.37rem;
          box-sizing: border-box;
          img {
            position: absolute;
            left: 0;
            top: -.62rem;
            width: 1.07rem;
            height: 1.07rem;
            border-radius: 20px;
            display: inline-block;
          }

          p {
            position: absolute;
            left: 1.1rem;
            top: -.62rem;
            padding-left: .3rem;
          }
          .stars {
            background-position: 0 -17px;
            width: 103px;
            overflow: hidden;

            span {
              display: inline-block;
              height: 18px;
              background: url(//img07.yiguoimg.com/d/web/180313/01314/114248/stars.png) no-repeat;
              background-size: auto 35px;
              width: 100%;
            }
          }

          .span4 {
            line-height: 18px;
            position: absolute;
            top: -.62rem;
            right: .32rem;
            color: #808080;
          }
        }
      }

      .classp {
        font-size: .46rem;
        color: #333;
        line-height: .6rem;
        margin: 0;
        padding-top: .33rem;
        margin-left: 1.37rem;

      }


    }
  }

  .address {
    background: #fff;
    padding: .45rem .53rem;
    margin-bottom: .3rem;
    overflow: hidden;
    .tit {
      float: left;
      color: #999999;
      font-size: .43rem;
      padding-right: .4rem;
      line-height: .5rem;
    }

    div {
      float: left;
      .add {
        position: relative;
        padding-left: .4rem;
        font-size: .46rem;
        color: #333;
        line-height: .5rem;
        width: 9.5rem;
        padding-bottom: .4rem;
        span {
          position: absolute;
          top: .03rem;
          left: 0;
          display: inline-block;
          width: .33rem;
          height: .39rem;
          background: url(//img05.yiguoimg.com/d/web/170830/00916/154520/dw.png) no-repeat;
          background-size: 100% 100%;
        }
      }

      .infor {
        line-height: .7rem;
        color: #333;
        font-size: .4rem;
        span {
          color: #01B27A;
          padding-right: .2rem;
        }
      }
    }
  }

  .norms-b {
    position: relative;
    color: #999999;
    font-size: .43rem;
    line-height: 1.2rem;
    padding: .35rem .53rem;
  }

  .norms {
    background: #fff;
    margin-bottom: .3rem;
    .norms-t {
      position: relative;
      color: #999999;
      font-size: .43rem;
      line-height: 1.2rem;
      padding: .35rem .53rem;
      span {
        color: #999999;
        font-size: .46rem;
        padding: .23rem .53rem .23rem .49rem;
        box-sizing: border-box;
        border: 1px solid #aaaaaa;
        border-radius: .92rem;
        margin: 0 .05rem;
        margin-left: .4rem;

      }

    }
  }

  .active {
    color: #01B27A !important;
    font-size: .46rem !important;
    padding: .23rem .5rem !important;
    box-sizing: border-box !important;
    border: 1px solid #01B27A !important;
    margin-left: .4rem !important;
    height: .47rem !important;
    line-height: .47rem !important;
  }

  .back {
    position: relative;
    height: 1.67rem;
    line-height: 1.67rem;
    padding: 0 .53rem;
    color: #aaaaaa;
    background: #fff;
    font-size: .4rem;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      background: #ddd;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
    }
    .dian {
      display: inline-block;
      width: .33rem;
      height: .33rem;
      border-radius: 50%;
      margin-right: .2rem;
      border: 1px solid;
      &::after {
        content: '\FF01';
        position: absolute;
        left: 0.62rem;
        top: .4rem;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }
    }
  }

  .info {
    padding: .45rem 0 0.4rem 0rem;
    background: #fff;
    padding-bottom: 0;
    .title {
      line-height: .8rem;
      padding-right: .53rem;
      font-size: .53rem;
      font-weight: 500;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      padding-left: .53rem;
    }
    .subhead {
      padding-right: .53rem;
      font-size: .38rem;
      color: #808080;
      line-height: .8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      padding-left: .53rem;
      height: .8rem;
      span {
        font-size: .46rem;
        color: #666;
      }
    }
    .price {
      position: relative;
      padding: 0rem 0 0rem;
      overflow: hidden;
      padding: .4rem 0 .39rem;
      padding-left: .53rem;
      padding-right: .53rem;
      .in {
        float: left;
        span {
          font-size: .66rem;
          color: #EB3939;
          i {
            padding-bottom: 0.12rem;
            padding-right: .1rem;
          }
        }
      }
      .area {
        float: right;
        font-size: .4rem;
        color: #999999;
        margin-top: .22rem;
        span {
        }
      }
    }
  }

  .banner {
    position: relative;
    z-index: 10;
    min-height: 10rem;
    background: #fff;
    i {
      position: absolute;
      top: .3rem;
      left: .32rem;
      display: inline-block;
      width: 1.12rem;
      height: 1.12rem;
      background: url(//img06.yiguoimg.com/d/web/180530/01261/141440/goback.png) no-repeat;
      background-size: 100% 100%;
      z-index: 100;
    }

    .productswipe {

      img {
        width: 100%;
      }
    }
  }
</style>