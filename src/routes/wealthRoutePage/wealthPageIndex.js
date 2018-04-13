

import React, { Component,createElement  } from 'react'
import { connect } from "dva";
import PageHeader from '../../components/wealthPage/wealthPageIndexHeader/index'
import { createAction } from '../../utils'
import AssetAnalysis from '../../components/wealthPage/AssetAnalysis'
import AccountantCard  from '../../components/wealthPage/accountantCard'
import MyRepertory from '../../components/wealthPage/myRepertory'
import { Link } from "dva/router"


@connect(({ wealth }) => ({ wealth }))


export default class wealthPageIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }

    }
    componentWillMount(){
      
    }
    componentDidMount(){
     console.log('wealthprops',this.props.wealth)
     this.props.dispatch(createAction('wealth/getAllLists')())
    }

 



    render() {
       const  AnalysisLists   = this.props.wealth.AssetAnalysisLists
       const  totalAssets   =   this.props.wealth.totalAssets && this.props.wealth.totalAssets.totalAssets  
       const  cumulativeIncome = this.props.wealth.accumReturn  && this.props.wealth.accumReturn.profit
       const  yesterdayEarnings = this.props.wealth.ydayReturn  && this.props.wealth.ydayReturn.profit
       const  yesterdayEarningsDate = this.props.wealth.ydayReturn  && this.props.wealth.ydayReturn.lastDay
       const AccountantList = this.props.wealth.managerLists
       const MyRepertoryLists = this.props.wealth.myResponsity
       const dic = this.props.wealth.wealthDic
       console.log('pppppxxc',dic)
        return (
          <div  style = {styles.total} >
            <PageHeader
              totalAssets = {totalAssets ? totalAssets :'' }
              cumulativeIncome = {cumulativeIncome ? cumulativeIncome: ''}
              yesterdayEarnings = {yesterdayEarnings ?yesterdayEarnings : ''}
              yesterdayEarningsDate = {yesterdayEarningsDate ? yesterdayEarningsDate : '' }
            />
            <AssetAnalysis
              AssetAnalysisLists = {AnalysisLists}
            />
            <AccountantCard
             AccountantCardLists = {AccountantList}
            />
            <div  style = {styles.transaction}>
              <div style ={styles.leftFont}>
                 <div style = {styles.transactionLeftLine}></div>
                 交易记录
               </div>
              <div>
                <Link to="/record"  style = {styles.link}>
                 <img  style = {styles.imaging} alt = '' src={require('../../images/navigationArrow.png')} />
                </Link>
              </div>
            </div >
            <MyRepertory 
             MyRepertoryLists = {MyRepertoryLists}   
             dic = {dic}
            />
            <div style = {styles.bottomFontTips}>
               <span> 本页面非任何法律文件，收益数据仅供参考</span>
               <span>过往业绩不预示未来，市场有风险，投资需谨慎</span>
            </div>
          </div>
        )
    }
}





const styles = {
     total:{
       width:'100%',
       height:'100%',
       backgroundColor:'#F2F3F2',
     },
     transaction:{
      display:'flex',
      flexDirection:'row',
      width:'100%',
      height:50,
      backgroundColor:'#fff',
      alignItems:'center',
      fontSize:15,
      marginTop:10,
     },
     transactionLeftLine:{
       width:3,
       height:15,
       backgroundColor:'#009BFF',
       marginLeft:14,
       marginRight:8,
     },
     leftFont:{
       width:100,
       height:'100%',
       display:'flex',
       alignItems:'center',
     },
     link:{
       display:'flex',
       alignItems:'center',
       width:document.body.clientWidth-120,
       paddingRight:20,
       height:15,
       flexDirection:'row-reverse',
     },
     imaging:{
       width:9,
       height:9,
     },
     bottomFontTips:{
      height:73,
      width:'100%',
      backgroundColor:"#F2F3F2",
      display:'flex',
      alignItems:'center',
      flexDirection:'column',
      justifyContent:'center',
      color:'#808080',
     }
  }


