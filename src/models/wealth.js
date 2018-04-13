import { createAction } from "../utils/index";
import * as appService from "../services/wealth";

export default {
     namespace: "wealth",
     state: {
       totalAssets:{},   //  总资产
       accumReturn:{},    // 累计收益
       ydayReturn:{},     // 昨日收益
       AssetAnalysisLists:[],// 资产分析
       managerLists:[],   // 理财师
       myResponsity:[] ,  // 持仓  
       wealthDic:{},      

     },
     reducers: {
      saveLists(state, { payload }) {
         console.log('xxxop',payload.data);
         return {
           ...state,
           [payload.key]:payload.data
         };
       },
      arrangeAnalysis(state, { payload }) {
        const AnalysisListsArr = payload.data
        const newAnalysisListsArr =[]
        console.log('AnalysisListsArr',AnalysisListsArr)
        AnalysisListsArr.map((item,index)=>{
         let arr = []
         let obj = item.funds
         let total = item.totalAssets
         console.log('AnalysisListsArritem',Object.keys(obj))
         Object.keys(obj).map((iteing,index)=>{
           let oc= {}
           oc.name = iteing
           oc.y = parseFloat(obj[iteing])/total*100
           if(index === 0 ){
            oc.sliced = true
           }

          //  嘉实安心货币A: 4013347.61,
          //  嘉实成长: 2311710.8,
          //  嘉实货币A: 2133,
          //  嘉实主题精选: 20856.95,
          //  摩卡私募: 93420.88,
          //  嘉实资本黄金时代1号: 4100.44

           switch(iteing)

           {
             case '嘉实安心货币A':
               oc.color = '#FF1E1E'
               break
             case '嘉实成长':
               oc.color = '#FF9700'
               break
             case '嘉实货币A':
               oc.color = '#FFC758'
               break
             case '嘉实主题精选':
               oc.color = '#3FAAFF'
               break
             case '摩卡私募':
               oc.color = '#2DC4DB'
               break
             case '嘉实资本黄金时代1号':
               oc.color = '#FF8E8E'
               break
             default:
              oc.color = 'yellowgreen'
             }
          arr.push(oc)

         })
         newAnalysisListsArr.push(arr)

        })
      console.log('newAnalysisListsArrEnd',newAnalysisListsArr)
      return { ...state,AssetAnalysisLists:newAnalysisListsArr}

      },
       
     },
   
     effects: {
       *getAllLists({ payload }, { call, put }) {
         const datalist =  yield call(appService.getAllLists)
         if(datalist.status.code === 10000){
          const data = datalist.data 
          const dic = data.dic
          const fundType2YHDic = dic.fundType2YHDic
          const fundTypeYHDic  = dic.fundTypeYHDic
          const legalFormDic = dic.legalFormDic
          const totalAssets = data.totalAssets  // 总资产
          const accumReturn = data.accumReturn    // 累计收益
          const ydayReturn =   data.ydayReturn    // 昨日收益
          const myResponsity = data.assets     // 持仓
          let managerLists = {}                // 理财师
          let analysis = {}                    // 资产分析 
          let kongArr = []
          let analysisArr = []    
           if(Array.isArray(data.manager)){
            managerLists = data.manager
           }
           else{
             kongArr.push(data.manager)
             managerLists = kongArr
           }
           if(Array.isArray(data.analysis)){
             analysis = data.analysis
           }
           else{
             analysisArr.push(data.analysis)
             analysis = analysisArr
           }
          console.log('dicppppppo',fundType2YHDic,fundTypeYHDic,legalFormDic)
          yield put(createAction('arrangeAnalysis')({data:analysis} ))
          yield put(createAction('saveLists')({key:'totalAssets',data:totalAssets} ))   
          yield put(createAction('saveLists')({key:'myResponsity',data:myResponsity} ))
          yield put(createAction('saveLists')({key:'accumReturn',data:accumReturn} ))
          yield put(createAction('saveLists')({key:'ydayReturn',data:ydayReturn} ))
          yield put(createAction('saveLists')({key:'managerLists',data:managerLists} ))
          yield put(createAction('saveLists')({key:'wealthDic',data:{...fundType2YHDic,...fundTypeYHDic,...legalFormDic}} ))
         }
       }
     },
   };