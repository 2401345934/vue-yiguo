import { instance } from "@/utils/http";
import _ from "lodash";
import Vue from "vue";

const module = {
  state: {
    carts: [],   //购物车的数据
    allPrice: 0,  //全选价格
    allFlag: false,  //全选
    flagLength: 0,  //选中的终极个数
    allLength: 0 // 购物车中的总数量
  },
  getters: {
    allLength: (state) => {
      if (state.carts.length > 0) {
        return _.reduce(_.map(state.carts, (item) => item.num), (a, b) => a + b);
      } else {
        return 0
      }
    },
    flagLength: (state) => {
      let arr = state.carts.map((item) => {
        if (item.flag) {
          return item.num;
        }
      });

      if (_.compact(arr).length === 0) {
        return 0;
      } else {
        return _.reduce(_.compact(arr), (a, b) => a + b);
      }
    },
    carts: (state) => state.carts,
    allFlag: (state) => {
      if (state.carts.length === 0) {
        return false;
      }
      let flag = state.carts.every((item) => item.flag);
      return flag;
    },
    allPrice: (state) => {
      let arr = state.carts.map((item) => {
        if (item.flag) {
          return item.num * item.SellPrice;
        } else {
          return 0;
        }
      });

      if (arr.length > 0) {
        state.allPrice = arr.reduce((a, b) => a + b);
        return state.allPrice.toFixed(2);
      }

    }
  },
  mutations: {
    // 全选按钮
    allSelect(state) {
      let flag = state.carts.every((item) => item.flag);
      console.log(flag);
      if (flag) {
        _.forEach(state.carts, (item) => {
          item.flag = false;
        });
      } else {
        _.forEach(state.carts, (item) => {
          item.flag = true;
        });
      }

    },
    isFlag(state, data) {
      state.carts[data].flag = !state.carts[data].flag;
    },
    //加号
    addN(state, data) {
      if (state.carts[data].num >= state.carts[data].MaxLimitCount) {
        return;
      } else {
        state.carts[data].num++;
      }
    },
    cutN(state, data) {
      if (state.carts[data].num <= 1) {
        return;
      } else {
        state.carts[data].num--;
      }
    },
    setCarts(state, data) {
      if (state.carts.length === 0) {
        Vue.set(data,'num',1)
        Vue.set(data,'flag',true)
        state.carts.push(data);
        return;
      }
      let obj = state.carts.findIndex((item, index) => {
        if (item.CommodityId === data.CommodityId) {
          return item;
        }
      });

      if (obj >= 0) {
        if (state.carts[obj].num < state.carts[obj].MaxLimitCount) {
          state.carts[obj].num++;
        }
      } else {
        Vue.set(data,'flag',true)
        Vue.set(data,'num',1)
        state.carts.push(data);
      }
    },
    removeCarts(state, data) {
      let index = state.carts.findIndex((item) => item.CommodityId === data.CommodityId);
      state.carts.splice(index, 1);
    }
  },
  actions: {},

  namespaced: true

};

export default module;