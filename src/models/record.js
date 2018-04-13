import { createAction } from "../utils/index";
import * as appService from "../services/record";

const initState = {
  recordListfilterCondition:{
    allRecordLists:{
      requestStatus:'4,5,7',
    },
    noneConfirmLists:{
      requestStatus:'6,8,9',
    }
  },
}



export default {
     namespace: "record",
   
     state: {
      recordList:{
        allRecordLists:[ 
        
       ],
        noneConfirmLists:[
        
        ]
      },
      recordListRefresh:{
        allRecordLists:{ 
          refreshing:false,
          isLoading:false, 
        },
        noneConfirmLists:{
          refreshing:false,
          isLoading:false, 
         }    
      },
      recordListfilterCondition:{
        allRecordLists:{},
        noneConfirmLists:{}
      },
      recordListPageNo:{
        allRecordLists:{pageNo:1},
        noneConfirmLists:{pageNo:1}
      },
      recordDictionaries:{}
     },
     reducers: {
     setAllAndNotConfirmLists(state, {payload}) {   
      // 获取首页数据   全部  未确认 条件下 
      return {...state,recordList:{...state.recordList,[payload.key]:payload.data }
      }
     },
     setrecordListRefresh(state, {payload}){
       return { 
      ...state,recordListRefresh:{
        ...state.recordListRefresh,[payload.key]:{
          ...initState.recordListfilterCondition[payload.key],...payload.data
        }
       }
      }
     },
     setRecordListfilterCondition(state,{payload}){
       return {...state,recordListfilterCondition:{
         ...state.recordListfilterCondition,[payload.key]:{
        ...initState.recordListfilterCondition[payload.key],
        ...payload.condition}}
      
      }
     },
     resetCondition(state,{payload}){
      return {
        ...state,recordListfilterCondition:{...state.recordListfilterCondition,[payload.keyer]:
          initState.recordListfilterCondition[payload.keyer]
        }
       }
     },
     addRccordPageNo(state,{payload}){
       const nowPageNo  =  state.recordListPageNo[payload.key].pageNo
       const resultPageNo = nowPageNo+1
       return {
        ...state,recordListPageNo:{
         ...state.recordListPageNo,[payload.key]:{pageNo:resultPageNo}
        }
       }
     },
    conCatRecordList(state,{payload}){
      const nowList =  state.recordList[payload.key]
      const getList =  payload.data
      const newList = nowList.concat(getList)
      return {
       ...state,recordList:{
         ...state.recordList,[payload.key]:newList } }
      },
    resetRccordPageNo(state,{payload}){
      //  重置 pageNo
      const key = payload.key
      return {...state,recordListPageNo:{...state.recordListPageNo,[key]:{pageNo:1}}}
      },
    saverecordDictionaries(state,{payload}){
     return {...state,recordDictionaries:payload}
    }
    
   },
   
     effects: {
       *filterCondition({ payload }, { call, put }) {
        yield put(createAction('setRecordListfilterCondition')( {key:payload.keyer,condition:payload.condition} ))
        yield put(createAction('getConditionLists')(payload))
       },
       *getConditionLists({ payload }, { call, put ,select}) {
        console.log("getConditionListsxxxxxx",payload);
        //setRecordListfilterCondition
        const record = yield select(state => state.record)
        const currentCondition = record.recordListfilterCondition[payload.keyer]
        console.log('currentCondition0000',currentCondition)
        yield put(createAction('setrecordListRefresh')({key:payload.keyer,data:{refreshing:true}} ))
        yield put(createAction('pullDownRcordList')( {keyer:payload.keyer,params:{...currentCondition,pageNo:1}} ))
       },
       *getAllAndNotConfirmLists({ payload }, { call, put }) {
         console.log("getAllAndNotConfirmLists");
         const currentCondition = initState.recordListfilterCondition[payload.keyer]
         yield put(createAction('resetRccordPageNo')( {key:payload.keyer}))
         yield put(createAction('pullDownRcordList')( {keyer:payload.keyer,params:{...currentCondition,pageNo:1,...payload.params}} ))
         yield put(createAction('setrecordListRefresh')({key:payload.keyer,data:{refreshing:true}} ))
       },
       *pullDownRcordList({ payload }, { call, put }) {
        const datalist= yield call(appService.fetchRcordList, payload.params)
        const { keyer } = payload
        console.log('@@@@@@@#######modoal交易记录#######@@@@@',payload.params,keyer)
        console.log('keyerlistpull',keyer,datalist)
        if(datalist.status.code === 10000) {
         console.log("datalisting",datalist,keyer)
         yield put({ type: 'saverecordDictionaries',  payload:{ 
           ...datalist.data.dic.businFlag1_dic ,
           ...datalist.data.dic.businFlag_dic,
          }}) 
         yield put({ type: 'setAllAndNotConfirmLists',  payload:{  key: keyer, data:datalist.data.requests  }}) // 
         yield put(createAction('setrecordListRefresh')({key:payload.keyer,data:{refreshing:false}} ))
        }
       else{
        yield put(createAction('setrecordListRefresh')({key:payload.keyer,data:{refreshing:false}} ))
       }
      },

      *addStepOneRccordLists({ payload }, { call, put }) {
        console.log("addRccordLists");
        //setRecordListfilterCondition  

        yield put(createAction('addRccordPageNo')( {key:payload.keyer} ))
        yield put(createAction('addStepSecondRccordLists')(payload))
        yield put(createAction('setrecordListRefresh')({key:payload.keyer,data:{isLoading:true}} ))
      },
      *addStepSecondRccordLists({ payload }, { call, put ,select}) {
        const record = yield select(state => state.record)
        const nowPage = record.recordListPageNo[payload.keyer].pageNo
        const nowCondition = record.recordListfilterCondition[payload.keyer]
        // merge params 
        const keyer = payload.keyer
        const params = {pageNo:nowPage,...nowCondition}
      
       yield put(createAction('getmoreRcordList')( {keyer,params} ))

       // console.log("addStepSecondRccordLists",nowPage);
      },
      *getmoreRcordList({ payload }, { call, put ,select}) {
        const datalist= yield call(appService.fetchRcordList, payload.params)
        if(datalist.status.code === 10000) {
         console.log("getmoreRcordLis",datalist)
         yield put(createAction('conCatRecordList')( {key:payload.keyer,data:datalist.data.requests } ))
         yield put(createAction('setrecordListRefresh')({key:payload.keyer,data:{isLoading:true}} ))
        }
       else{
        yield put(createAction('setrecordListRefresh')({key:payload.keyer,data:{isLoading:true}} ))
       }
      }

     },
   };



