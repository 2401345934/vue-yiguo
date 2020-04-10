import { instance } from "@/utils/http";


const  module = {
  state: {
    productObj: {
      cityId: "93570b8c-0a0a-4818-8317-75a0d14093a5",
      districtId: "da222b9f-d63d-42f0-9fbd-4532f3424270",
      AreaCode: "8",
      name: "天津",
      CommodityCode: "6000039888",
      CommodityId: "6acf16df-8abe-48f7-aca7-61cf0b23754f"
    },
    dataList:"",
    commentList:[],
    youLike: []
  },
  getters: {
    dataList: state => state.dataList,
    commentList: state => state.commentList,
    productObj: state => state.productObj,
    youLike: state => state.youLike,
  },
  mutations: {
    setproductObj(state,data) {
      console.log(data);
      state.productObj = data
    },
    setDataList(state,data) {
      state.dataList = data
    },
    setCommentList(state,data) {
      state.commentList = data
    },
    setYouLike(state,data) {
      console.log(data);
      state.youLike = data
    },
  },
  actions: {
    //猜你喜欢
    getYouList( { commit , state } ){
      instance.post("/api/commodityapi/Commodity/GetGuessRecommentCommodity",{
        Head: {
          Token: "",
          LoginToken: "",
          CityId: state.productObj.cityId,
          CityCode: state.productObj.AreaCode,
          DistrictId: state.productObj.districtId,
          DeviceId: "01e176b22701db6e63214f6e78479bc6",
          MobileOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
        },
        Body: {GuessRecommendType: 1 }
      }).then((res) => {
        commit("setYouLike",res.data.Data.CommodityList)
      })
    },
    //商品信息
    getData( { commit , state } ){
      instance.post("/api/commodityapi/Commodity/GetCommodityInfo",{
        Head: {
          Token: "",
          LoginToken: "",
          CityId: state.productObj.cityId,
          CityCode: state.productObj.AreaCode,
          DistrictId: state.productObj.districtId,
          DeviceId: "01e176b22701db6e63214f6e78479bc6",
          MobileOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
        },
        Body: { CommodityCode: state.productObj.CommodityCode, CommodityId: "" }
      }).then((res) => {
        commit("setDataList",res.data.Data)
      })
    },
    //获取商品票
    getCommentList({commit,state}){
      instance.post("/api/commodityapi/Commodity/GetCommodityVote",{
        Head: {
          Token: "",
          LoginToken: "",
          CityId: state.productObj.cityId,
          CityCode: state.productObj.AreaCode,
          DistrictId: state.productObj.districtId,
          DeviceId: "01e176b22701db6e63214f6e78479bc6",
          MobileOS: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
        },
        Body: {
          CommodityId: state.productObj.CommodityId,
          VoteType: 0,
          IsContainSystem: true,
          PageIndex: 1,
        }
      }).then((res) => {
        commit("setCommentList",res.data.Data)
      })
    }
  },

  namespaced: true

}

export default module