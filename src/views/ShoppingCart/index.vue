<template>
  <div>
    <!--购物车-->
    <div class="goods">
      <div class="group">
        <div class="group-t">
          <div class="group-c" v-for="(item,index) in carts" :key="item.CommodityId">
            <div class="check" @click="isChangeFlag(index)"><i :class="{active:item.flag}"></i></div>
            <div class="img"><img :src="item.SmallPic" @click="detailAdd(item)"></div>
            <div class="text">
              <h2 class="elli2">{{item.CommodityName}}</h2>
              <div class="tag"></div>
              <p><strong class="red">￥<b>{{item.SellPrice}}</b></strong></p>
            </div>
            <div class="del" @click="removeCart(item)"><i></i></div>
            <div class="limit"></div>
            <div class="num">
              <span class="cut" @click="cutNum(index)"> <i></i></span>
              <span class="input">{{item.num}}</span>
              <span class="add" @click="addNum(index)"><i></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--猜你喜欢-->
    <div class="guess">
      <div class="title">
        <h2>猜你喜欢</h2>
      </div>
      <div class="list">
        <div class="one" v-for="item in youLike" :key="item.CommodityId" @click="detailAdd(item)">
          <div class="one-t">
            <img :src="item.SmallPic" alt="">
          </div>
          <div class="one-c">
            <h2>{{item.CommodityName}}</h2>
            <p><strong>
              ￥<b>{{item.SellPrice}}0</b></strong></p>
          </div>
          <div class="one-b">
            <a href="javascript:;" @click.stop="handlerAdd(item)"></a>
          </div>
        </div>
      </div>
    </div>


    <!--结算-->
  <div class="cart-total">
    <div class="check" @click="changeAll">
      <i :class="{active:allFlag}"></i>
      全选
    </div>
    <div class="text">
      <p>合计(不含运费):
        <b>￥{{allPrice}}</b></p>

      <span>已优惠: ￥0.00</span>
    </div>
    <div class="btn">
      <a href="javascript:;">去结算({{flagLength}})</a>
    </div>
  </div>
    <!--占位符-->
    <div style="height: 50px;"></div>
  </div>
</template>

<script>

  import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
  import { Dialog } from "vant";
  import Vue from "vue";

  Vue.use(Dialog);

  export default {
    name: "index",
    data() {
      return {
        value: ""
      };
    },
    computed: {
      ...mapGetters("cart", ["carts","allFlag","allPrice","flagLength","allLength"]),
      ...mapGetters("product", ["youLike"]),
      ...mapState("home", ["ctiy"]),
    },
    methods: {
      changeAll(){
        this.allSelect()
      },
      isChangeFlag(i){
        this.isFlag(i)
      },
      addNum(i){
        this.addN(i)
      },
      cutNum(i){
        this.cutN(i)
      },
      ...mapMutations("cart", ["removeCarts", "setCarts","addN","cutN","isFlag","allSelect"]),
      ...mapActions("product", ["getYouList"]),
      ...mapMutations("product", ["setproductObj"]),
      removeCart(params) {
        Dialog.confirm({
          title: "确认不要了！！！",
          message: "请想好"
        }).then(() => {
          // on close
          this.removeCarts(params);
        }).catch(() => {
          // on cancel
        });
        ;
      },
      handlerAdd(data) {
        this.setCarts(data);
      },
      detailAdd(data) {
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
      }
    },

    mounted() {
      console.log(this.carts);
      this.getYouList();
    }
  };
</script>

<style scoped lang="scss">

  .cart-total {
    position: fixed;
    left: 0;
    bottom: 1.53rem;
    width: 100%;
    height: 1.6rem;
    padding: 0 3.9rem 0 0;
    box-sizing: border-box;
    background: #fff;
    .check {
      position: absolute;
      top: 0;
      left: 0;
      width: 3.1rem;
      height: .54rem;
      padding: .53rem 0 .53rem 1.36rem;
      font-size: .38rem;

      i {
        display: inline-block;
        width: .6rem;
        height: .6rem;
        margin: 0 .18rem 0 0;
        background: url(//img06.yiguoimg.com/d/web/180119/01641/141347/check1.png) no-repeat;
        background-size: 100%;
        vertical-align: -4px;
      }
    }

    .text {
      padding: .2rem 0;
      line-height: .6rem;
      font-size: 11px;
      text-align: right;
      .p {

        b {
          font-size: .46rem;
          color: #fb3d3d;
        }
      }
      span {
        color: #999;
      }
    }

    .btn {
      position: absolute;
      right: 0;
      top: 0;
      width: 3.6rem;
      height: 1.6rem;
      a {
        display: block;
        width: 3.6rem;
        height: 1.6rem;
        background: #fb3d3d;
        line-height: 1.6rem;
        font-size: .5rem;
        color: #fff;
        text-align: center;
      }
    }
  }

  .active {
    background-image: url(//img06.yiguoimg.com/d/web/180508/01316/175209/check2.png) !important;
  }

  .guess {
    position: relative;
    margin: 0 0 .3rem;
    background: #fff;
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
    .title {
      position: relative;
      height: 1.65rem;
      line-height: 1.65rem;
      font-size: .48rem;
      color: #000;
      text-align: center;

      h2 {
        position: relative;
        display: inline-block;
        padding: 0 .18rem;
        font-size: .48rem;
        font-weight: normal;
        color: #333;

        &::before {
          content: "";
          display: block;
          width: .7rem;
          height: .09rem;
          position: absolute;
          top: 50%;
          margin-top: -.04rem;
          background: url(//img05.yiguoimg.com/d/web/180508/01318/181423/decoration-left@3x.png) top left no-repeat;
          background-size: auto 100%;
          left: -.7rem;
        }

        &::after {
          right: -.7rem;
          transform: rotate(180deg);
          content: "";
          display: block;
          width: .7rem;
          height: .09rem;
          position: absolute;
          top: 50%;
          margin-top: -.04rem;
          background: url(//img05.yiguoimg.com/d/web/180508/01318/181423/decoration-left@3x.png) top left no-repeat;
          background-size: auto 100%;
        }
      }

    }
    .list {
      position: relative;
      padding: .1rem .19rem .74rem;

      .one {
        float: left;
        position: relative;
        width: 50%;
        padding: .16rem .53rem;
        box-sizing: border-box;
        .one-t {
          width: 4.96rem;
          height: 4.96rem;
          img {
            display: block;
            width: 4.96rem;
            height: 4.96rem;
          }
        }
        .one-c {
          h2 {
            height: 1.12rem;
            line-height: .56rem;
            font-size: .42rem;
            font-weight: normal;
          }
          p {
            height: .8rem;
            line-height: .8rem;
            font-size: 11px;
            color: #808080;
            strong {
              color: #fb3d3d;
            }
            b {
              font-size: .42rem;
            }
          }
        }
        .one-b {
          position: absolute;
          right: .53rem;
          bottom: .16rem;
          a {
            display: block;
            width: .8rem;
            height: .8rem;
            background: url(//img05.yiguoimg.com/d/web/180508/01311/150610/add.png) no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }

  .group-c {
    position: relative;
    padding: .42rem 0 .42rem 1.22rem;

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

    .check {
      position: absolute;
      top: .32rem;
      left: 0;
      width: 1.22rem;
      height: .54rem;
      padding: 1.08rem 0;
      text-align: center;
      i {
        display: inline-block;
        width: .6rem;
        height: .6rem;
        background: url(//img06.yiguoimg.com/d/web/180119/01641/141347/check1.png) no-repeat;
        background-size: 100%;
      }
    }

    .img {
      position: absolute;
      left: 1.22rem;
      top: .32rem;
      width: 2.7rem;
      height: 2.7rem;
      img {
        display: block;
        width: 2.7rem;
        height: 2.7rem;
      }
    }
    .text {
      padding: 0 1.9rem 0 3rem;
      h2 {
        height: 1.12rem;
        line-height: .56rem;
        font-size: .42rem;
        font-weight: normal;
      }
      .tag {
        height: .56rem;
        padding: .2rem 0 .1rem;
      }

      p {
        height: .72rem;
        line-height: .72rem;
        font-size: .34rem;
        color: #ccc;

        .red {
          color: #fb3d3d;
          b {
            font-size: .42rem;
          }
        }
      }
    }
    .del {
      position: absolute;
      right: .5rem;
      top: .42rem;
      width: 1.2rem;
      height: 1.2rem;

      i {
        display: block;
        width: 1.2rem;
        height: 1.2rem;
        background: url(//img07.yiguoimg.com/d/web/180119/01642/141511/del.png) center right no-repeat;
        background-size: 0.48rem 0.5rem;
      }
    }

    .limit {
      position: absolute;
      right: .5rem;
      top: 1.8rem;
      line-height: .4rem;
      font-size: 11px;
      color: #fb3d3d;
    }

    .num {
      position: absolute;
      right: .5rem;
      top: 2rem;
      width: 3.6rem;
      height: .72rem;

      .cut {
        float: left;
        position: relative;
        width: .72rem;
        height: .72rem;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 200%;
          height: 200%;
          border: 1px solid #ddd;
          box-sizing: border-box;
          border-radius: 8px 0 0 8px;
          transform: scale(0.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
        }
        i {
          position: absolute;
          left: .21rem;
          top: .21rem;
          width: .33rem;
          height: .33rem;
          background: url(//img06.yiguoimg.com/d/web/180226/01311/172807/cut2.png) no-repeat;
          background-size: 100%;
        }
      }

      .add {
        float: left;
        position: relative;
        width: .72rem;
        height: .72rem;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 200%;
          height: 200%;
          border: 1px solid #ddd;
          box-sizing: border-box;
          border-radius: 0 8px 8px 0;
          transform: scale(0.5);
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
        }
        i {
          position: absolute;
          left: .21rem;
          top: .21rem;
          width: .33rem;
          height: .33rem;
          background: url(//img07.yiguoimg.com/d/web/180119/01642/141511/add2.png) no-repeat;
          background-size: 100%;
        }
      }

      .input {
        float: left;
        position: relative;
        width: 1.96rem;
        height: .72rem;
        line-height: .72rem;
        color: #333;
        text-align: center;

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
        &::before {
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
      }
    }


  }

  .goods {
    padding: 0 0 0px;
    color: #333;
    .group {
      position: relative;

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

      .group-t {
        position: relative;
        margin-bottom: .3rem;
        background: #fff;
      }
    }
  }

</style>