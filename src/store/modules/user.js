export default {
  state:{
    info:[],
    menulist:{},
  },
  mutations:{
    setInfo(state,data) {
      state.info=data;
    },
    setmenulist(state,data) {
      state.menulist=data;
    }
  }
}
