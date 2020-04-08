import { instance } from "@/utils/http";

const module = {
  state: {
    id:'0'
  },
  getters: {
  },
  mutations: {
    setId(state,data) {
      console.log(data);
      state.id = data.CategoryId
    }
  },
  actions: {
  },

  namespaced: true

};


export default module;