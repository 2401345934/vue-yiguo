<template>
  <div>
    <div class="product" v-for="item in list" :key="item.CommodityId" @click="handlerC(item)">
      <div class="img">
        <img :src="item.SmallPic" alt="">
      </div>
      <div class="info">
        <p class="title">{{item.CommodityName}}</p>
        <p class="txt">{{item.SubTitle}}</p>
        <p class="price">
          <span class="span1">¥{{item.SellPrice}}</span>
          <span class="span2">{{item.Spec}}</span>
          <span class="span3" @click.stop="dataData(item)"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props:["list","parmas"],
    methods: {
      handlerC(item){
        this.$emit('addData',item)
      },
      dataData(item){
        this.parmas(item)
      },
    }
  };
</script>

<style scoped lang="scss">
  .product {
    z-index: 10;
    position: relative;
    padding: .5rem .32rem;
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
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
    .img {
      position: relative;
      float: left;
      width: 3.47rem;
      img {
        width: 3.47rem;
        height: 3.47rem;
      }

    }

    .info {
      float: right;
      width: 8rem;

      .txt {
        font-size: .36rem;
        color: #808080;
        padding: .3rem 0 .3rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .title {
        font-size: .46rem;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: .6rem;
      }

      .price {
        position: relative;
        height: .8rem;
        padding-top: .3rem;
        z-index: 10;

        .span1 {
          font-size: .46rem;
          color: #fd3d3d;
          padding-right: .45rem;
          line-height: .8rem;
        }

        .span2 {
          font-size: .34rem;
          color: #808080;
          line-height: .8rem;
          padding-right: .2rem;
        }

        .span3 {
          z-index: 100;
          position: absolute;
          right: .5rem;
          top: .3rem;
          width: .8rem;
          height: .8rem;
          background: url(//img05.yiguoimg.com/d/web/180508/01311/150610/add.png) no-repeat;
          background-size: 100% 100%;
        }
      }

    }
  }
</style>