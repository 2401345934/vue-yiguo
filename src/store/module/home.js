import { instance } from "@/utils/http";

const module = {
  state: {
    dataList: [], //两排
    navBottomImg: [],  //椭圆图片
    news: [],   //文字轮播
    bannerList: [],    //轮播
    imgList: [],  //图片,
    ctiy: {
      cityId: "eabbe02f-59e0-46e6-90e7-cd8a89dbb98f",
      districtId: "928de107-52e3-4016-9ce1-afc0fb1532ae",
      name: "上海",
      AreaCode: "2"
    },
    resObj: [],  //每次请求回来带的下次请求的ID
    twoDataList: [] , //第二次请求回来的数据
    isFlag: false,  //默认不显示 等第二次数据请求回来在显示

  },
  getters: {
    dataList: state => state.dataList,
    navBottomImg: state => state.navBottomImg,
    news: state => state.news,
    bannerList: state => state.bannerList,
    imgList: state => state.imgList,
    getCity: state => state.ctiy,
    twoDataList: state => state.twoDataList,
    isFlag: state => state.isFlag
  },
  mutations: {
    setCtiy(state, data) {
      state.ctiy.cityId = data.CityId;
      state.ctiy.districtId = data.AreaId;
      state.ctiy.name = data.name;
      state.ctiy.AreaCode = data.AreaCode;
    },
    setDataList(state, data) {
      state.dataList = data;
    },
    setIsFlag(state, data) {
      state.isFlag = data;
    },
    setNavBottomImg(state, data) {
      state.navBottomImg = [];
      state.navBottomImg = data;
    },
    setNews(state, data) {
      state.news = [];
      state.news = data;
    },
    setBannerList(state, data) {
      state.bannerList = [];
      state.bannerList = data;
    },
    setImgList(state, data) {
      state.imgList = [];
      state.imgList.push(...data);
    },
    pushImgList(state, data) {
      state.imgList.push(data);
    },
    setResObj(state, data) {
      state.resObj = data;
    },
    setTwoList(state, data) {
      state.twoDataList = data;
    }
  },
  actions: {
    //第一次请求
    setDataList({ state, commit }) {
      instance.post("/api/home/TemplateComponent/GetTemplateComponentInfo", {
        "head": {
          version: "h5",
          cityCode: state.ctiy.AreaCode,
          cityId: state.ctiy.cityId,
          districtId: state.ctiy.districtId,
          token: "",
          loginToken: ""
        },
        body: { previewTime: "", operationType: 0 }
      }).then((res) => {
        //把每次请求回来带的下次的请求ID 存起来
        commit("setResObj", res.data.Data.commonInfo);
        //纵向文字轮播
        commit("setNews", res.data.Data.templateComponentList[0].fastReportsList);
        //椭圆图片
        if (res.data.Data.templateComponentList[0].adPictures) {
          commit("setNavBottomImg", res.data.Data.templateComponentList[0].adPictures[0]);
        } else {
          commit("setNavBottomImg", []);
        }
        //轮播图
        commit("setBannerList", res.data.Data.templateComponentList[0].carouselPictures);
        //两排8个
        commit("setDataList", res.data.Data.templateComponentList[0].navComponentList);
        //图片
        if (res.data.Data.templateComponentList[1].adPictures.length > 0) {
          commit("setImgList", [res.data.Data.templateComponentList[1].adPictures[0].pictureUrl, res.data.Data.templateComponentList[2].adPictures[0].pictureUrl, res.data.Data.templateComponentList[3].adPictures[0].pictureUrl]);
        } else {
          commit("setImgList", []);
        }

      });
    },
    //第二次请求
    setErDataList({ state, commit }) {
      commit("setIsFlag",false)
      instance.post("/api/home/TemplateComponent/GetTemplateComponentInfo", {
        "head": {
          version: "h5",
          cityCode: state.ctiy.AreaCode,
          cityId: state.ctiy.cityId,
          districtId: state.ctiy.districtId,
          token: "",
          loginToken: ""
        },
        body: {
          previewTime: "",
          operationType: 1,
          pageIndex: 1,
          homePageId: state.resObj.homePageId,
          publishTime: state.resObj.publishTime
        }
      }).then((res) => {

        //把剩余的图片继续添加到上一个数组中
        commit("pushImgList", res.data.Data.templateComponentList[0].adPictures[0].pictureUrl);

        //把第二次请求的数据返回出去
        commit("setTwoList", res.data.Data.templateComponentList);
        commit("setIsFlag",true)
      }).catch((err) => {

      });
    }
  },

  namespaced: true

};


export default module;