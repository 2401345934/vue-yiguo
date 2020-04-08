<template>
  <div id="my" v-if="list">
    <!--头部-->
    <div class="top">
      <div class="headerImg">
        <span>
          <img src="//img02.yiguo.com/e/web/150703/00781/140145/no-pic.jpg" alt="">
        </span>
        <a href="javascript:;">
          <p v-show="user" style="color: orangered">{{user}}</p>
          <p @click="$router.push('/login')" v-show="isLogin">登录/注册</p>
          <p @click="handlerClick" v-show="!isLogin">退出</p>
        </a>
      </div>
      <div class="account">
        <p v-for="item in list.BalanceAndCoupons" :key="item.id">
          <span class="span1">{{item.Number}}</span>
          <span class="span2">{{item.Text}}</span>
        </p>
      </div>
    </div>
    <!--订单部分-->
    <div class="listTab">
      <ul class="line-bottom">
        <li v-for="i in list.OrderIcons" :key="i.id">
          <a href="javascript:;">
            <i>
              <img :src="i.IconUrl" alt="">
            </i>
            {{i.IconText}}
          </a>
        </li>
        <li class="line-r">
          <span></span>
          <a href="javascript:;">
            <i class="i1">
            </i>
            全部订单
            <i class="i2"></i>
          </a>
        </li>
      </ul>
    </div>
    <!--testList-->
    <div class="testList">
      <div class="list" v-for="item in list.IconList" :key="item.IconId">
        <a href="javascript:;">
          <img :src="item.IconUrl" alt="">
          {{item.IconName}}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import { instance } from "@/utils/http";

  export default {
    name: "index",
    data() {
      return {
        list: null,
        isLogin: true,
        user: null
      };
    },
    methods: {
      handlerClick(){
        localStorage.clear()
        this.isLogin = true
        this.user = null
      }
    },
    created() {
      instance.post("/api/user/User/GetUserInfo", {
        "Head": {}
      }).then((res) => {
        console.log(res.data.Data.UserInfo.IconList);
        this.list = res.data.Data.UserInfo;
      });

      if (localStorage.getItem('token')) {
        this.isLogin = false
      } else {
        this.isLogin = true
      };

      if (localStorage.getItem('username')) {
        this.user = JSON.parse(localStorage.getItem('username'))
      }



    }
  };
</script>

<style scoped lang="scss">

  .testList {
    position: relative;
    width: 100%;
    background: #fff;
    margin-bottom: .3rem;
    overflow: hidden;

    .list {
      position: relative;
      float: left;
      width: 25%;
      height: 2.7rem;

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

      a {
        position: relative;
        font-size: .36rem;
        display: inline-block;
        width: 100%;
        height: 100%;
        padding-top: 1.7rem;
        text-align: center;
        box-sizing: border-box;
        color: #333;
        img {
          width: 1.08rem;
          height: 1.08rem;
          margin-left: -.504rem;
          display: inline-block;
          position: absolute;
          top: .6rem;
          left: 50%;
        }
      }
    }

  }

  #my {
    height: 100% !important;
    width: 100% !important;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .listTab {
    position: relative;
    width: 100%;
    background: #fff;
    height: 2.7rem;
    margin: .3rem 0;

    ul {
      position: relative;
      width: 100%;
      height: 100%;
      li {
        position: relative;
        float: left;
        width: 20%;
        height: 100%;
        a {
          display: inline-block;
          font-size: .36rem;
          color: #333;
          width: 100%;
          height: 100%;
          text-align: center;
          padding-top: 1.73rem;
          box-sizing: border-box;
          i {
            width: .74rem;
            height: auto;
            margin-left: -.37rem;
            position: absolute;
            left: 50%;
            top: .8rem;
            display: inline-block;
            vertical-align: middle;
            background-size: 100% 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      .line-r {
        position: relative;
        float: left;
        width: 20%;
        height: 100%;
        span {
          position: absolute;
          top: 0.05rem;
          left: 0;
          display: inline-block;
          width: .16rem;
          height: 100%;
          background: url(//img07.yiguoimg.com/d/web/180313/01318/155922/xian.png) no-repeat;
          background-size: 100% 100%;
        }
        a {
          display: inline-block;
          font-size: .36rem;
          color: #333;
          width: 100%;
          height: 100%;
          text-align: center;
          padding-top: 1.73rem;
          box-sizing: border-box;
          .i1 {
            width: .9rem;
            height: .9rem;
            background: url(//img07.yiguoimg.com/d/web/180315/01315/162344/allorder.png) no-repeat;
            margin-left: -.45rem;
            background-size: 100% 100%;
          }

          .i2 {
            display: inline-block;
            width: .15rem;
            height: .24rem;
            background: url(//img05.yiguoimg.com/d/web/180313/01318/155922/gopage2.png) no-repeat;
            background-size: .15rem .24rem;
            vertical-align: middle;
            margin-left: .1rem;
            position: absolute !important;
            left: 2.1rem;
            top: 1.9rem;
          }

        }

      }

    }
  }

  .account {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.78rem;
    background: white;
    padding: .3rem .3rem .3rem .3rem;
    box-sizing: border-box;
    p {
      float: left;
      width: 50%;
      height: 100%;
      text-align: center;
      border: none;
      .span1 {
        font-size: .4rem;
        color: #0e9f4e;
        display: block;
      }
      .span2 {
        font-size: .3rem;
        color: #333333;
        display: block;
      }
    }
  }

  .headerImg {
    position: relative;
    display: inline-block;
    height: 2.26rem;
    margin-top: .9rem;
    padding: 0 .32rem 0 2.85rem;
    box-sizing: border-box;
    span {
      display: inline-block;
      position: absolute;
      left: 0.5rem;
      top: 0;
      border: .13rem solid rgba(255, 255, 255, .5);
      width: 2.26rem;
      height: 2.26rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, .5);
      img {
        position: absolute;
        top: -0.2rem;
        left: -0.1rem;
        width: 2.26rem;
        height: 2.26rem;
        border-radius: 50%;
      }
    }

    a {
      p {
        display: inline-block;
        text-align: left;
        color: #fff;
        font-size: .52rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.7rem;
        padding: .34rem 0 0 .8rem;
      }
    }
  }

  .top {
    position: relative;
    width: 100%;
    height: 6.44rem;
    background: #2dd282 url(//img06.yiguoimg.com/d/web/180517/01262/143351/bgimg.jpg) 100% 100%;
    background-size: 100% 100%;
    padding: 0 0rem 1.2rem 0rem;
    box-sizing: border-box;
  }
</style>