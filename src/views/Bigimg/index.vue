<template>
  <div class="imgShow" v-if="msg">
    <div v-html="msg"></div>
    <div class="option" v-if="msg">
      <van-icon name="arrow-left" size="50" @click="$router.back()"/>
    </div>
  </div>

</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  import { instance } from "@/utils/http";

  export default {
    name: "index",
    data() {
      return {
        msg: null
      };
    },
    methods: {
      ...mapMutations("nav", ["setIsNav"])
    },
    destroyed(){
      this.setIsNav(true);
    },
    created() {
      this.setIsNav(false);
      instance.post("/api/commodityapi/Commodity/GetCommodityDetail", {
        Head: {
          Token: "",
          LoginToken: "",
          DeviceId: "01e176b22701db6e63214f6e78479bc6"
        },
        Body: {
          CommodityId: this.productObj.CommodityId
        }
      }).then((res) => {
        console.log(res.data.Data.CommodityRemark);
        this.msg = res.data.Data.CommodityRemark;
      });
    },
    computed: {
      ...mapGetters("product", ["productObj"])
    },
  };
</script>

<style scoped lang="scss">
  .imgShow {
    width: 100%;
    padding-left: -7.32rem;
    box-sizing: border-box;
    background: #fff;
    height: 100%;
    overflow-x: hidden;

    .option {
      position: fixed;
      top: .3rem;
      left: .3rem;
    }

  }

</style>