import { createAction } from "../utils/index";
import * as appService from "../services/PersonServer";

export default {
  namespace: "person",

  state: {
      data:""
  },
  reducers: {
    getPersonInfo(state, {payload}) {
      // 获取个人信息数据
      return {...state,data:payload.data }
    },

  },
  effects: {
    *getpersondata({ payload }, { call, put }) {
      const data= yield call(appService.fetchPersonInfo, payload)
      const { keyer } = payload
      console.log('=========个人信息========',payload)
      if(data.status.code === 10000) {
        console.log("datalisting",data,keyer)
        yield put(createAction('getPersonInfo')({data:data.data} ))
        // yield put({ type: 'getPersonInfo',{ data:data.data}}) //
      }
    },


  },
};
