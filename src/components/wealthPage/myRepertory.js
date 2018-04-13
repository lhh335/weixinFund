

import React, { Component,createElement  } from 'react'
import Nodata from './noData'
import PropTypes from 'prop-types'


export default class MyRepertory extends Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }

    }
    componentWillMount(){
      
    }
    componentDidMount(){
     
    }



   
    thousandChange(str){
     
      let str1=str.toString()
      let index = str1.indexOf('.')
      let str2 = ''
      let str3 = ''
      let str4 =''
      let re=/(?=(?!(\b))(\d{3})+$)/g;
      if(index >0){
       str2 = str1.slice(index)
       str3 = str1.slice(0,index)
       str3=str3.replace(re,",")
       str4 = str3 + str2 
      }
      else{
        str4 = str1.replace(re,",")
      }
      
      return str4
    }

    returnFirstType(str,legal){
     const dic = this.props.dic
     let std = str
     if(dic && dic[str]){
       std =  dic[str].value
     }
     return std
    }



    produceLists = (lists)=>{
     const dic =  this.props.dic
     if(!dic) return 
     console.log('cidddddd',dic)
     const arr = []
     if(!dic) return
     if(dic){
      lists.map((item,index)=>{
        arr.push(
        <div style = {styles.elementTotalDiv} key = {index}>
          <div style = {styles.elementFirstLeftLine}>
            <div style = {styles.firstName}>{item.fundName} </div>
            <div style = {styles.elementSeondLine}>
             <div style = {styles.assetTypeName}>{this.returnFirstType(item.fundTypeYH)}</div>
              {item.fundTypeYH === '2' ? 
               <div  div = {styles.outHoroviralLine}><div style = {styles.horoviralLine}> </div></div>
              : null}
            <div style = {styles.assetDetailTypeName}> { item.fundTypeYH === '2'? item.fundType2YH :''}</div>
          </div>
          </div>
          <div style = {styles.elementThirdLine}>
            <div style = {styles.thirdLineLeftPart} >
             <span style = {styles.LeftbottomTopFont} >{item.market ? this.thousandChange(item.market) :''}</span> 
             <span style = {styles.LeftbottomBotFont}>金额(元)</span>
            </div>
            { 
            <div style = {styles.thirdLineCenterPart} >
            {item.lastDayProfit.toString().length>0
            ?
              <span style = { item.lastDayProfit > 0 ? styles.CenterTopFont : styles.CenterTopGreenFont } >{ item.lastDayProfit > 0 ? `+${this.thousandChange(item.lastDayProfit)}` :
              this.thousandChange(item.lastDayProfit)
              }
              </span>
              : null
            } 
            {item.lastDayProfit.toString().length>0
             ? 
              <span style = {styles.CenterBottomFont} >昨日收益(03-19)</span>
              : null
            }
            </div>
            
            }
            <div style = {styles.thirdLineRightPart} >
             <span style = { item.profit>0  ? styles.RightPartTopFont : styles.RightPartTopGreenFont } >{ item.profit > 0 ? `+${this.thousandChange(item.profit)}` :
              this.thousandChange(item.profit)
              }</span>
             <span style = {styles.RightPartBottomFont} >累计收益</span>
            </div>
          </div>
        </div>)
      }) 
     } 
      return arr 
    }

    render() {
       const { MyRepertoryLists }  = this.props
        return (
          <div  style = {styles.total} >
              <div style ={styles.firstLine}>
                 <div style = {styles.firstLeftLine}></div>
                  我的持仓
              </div>
              <div style ={styles.bottomList}>
                {
                 MyRepertoryLists.length>0
                 ?
                 this.produceLists(MyRepertoryLists)
                 :
                 <Nodata BottomTips = '暂无持仓资产' />
                }
              </div>
          </div>
        )
    }
}



MyRepertory.defaultProps = {
  MyRepertoryLists:[],// 资产列表
  dic:{},
}

MyRepertory.propTypes = {
  MyRepertoryLists:PropTypes.array,
  dic:PropTypes.object,
}


const styles = {
    total:{
      marginTop:10,
      width:'100%',
      backgroundColor:'#fff',
    },
    firstLine:{
      display:'flex',
      width:'100%',
      alignItems:'center',
      height:40,
      fontSize:15,
      borderBottom:'1px solid #EBEBEB',
    },
    bottomList:{
      backgroundColor:'#fff',
      width:document.body.clientWidth-28,
      paddingLeft:14,
      paddingRight:14,
    },
    firstLeftLine:{
      width:3,
      height:15,
      marginLeft:14,
      marginRight:8,
      backgroundColor:"#009BFF",
    },
    elementTotalDiv:{
      display:'flex',
      justifyContent:'center',
      flexDirection:'column',
      width:'100%',
      height:107,
      backgroundColor:'#fff',
      borderBottom:'1px solid #EBEBEB',
    },
    elementFirstLeftLine:{
      height:33,
      width:'100%',
      display:'flex',
      justifyContent:'space-between',
    },
    firstName:{
      marginRight:8,
    },
    thirdName:{ 
     height:16,
     width:51,
     fontSize:13,
     display:'flex',
     alignItems:'center',
     justifyContent:'center',
     border:'1px solid #FF4E4E',
     color:'#FF4E4E',
     marginRight:19,
    },
    elementSeondLine:{
      height:26,
      fontSize:12,
      color:'#999999',
      display:'flex',
    },

    horoviralLine:{
      width:1,
      height:10,
      backgroundColor:'#999',
      marginRight:6,
      marginLeft:7,
      marginTop:1,
    },
    outHoroviralLine:{
      height:12, 
    },
    assetTypeName:{
      height:12,
      display:'flex',
      alignItems:'center',
    },
    assetDetailTypeName:{
     height:12,
     display:'flex',
     alignItems:'center',  
     justifyContent:'space-between', 
    },
    elementThirdLine:{
     height:38,
     width:'100%',
     display:'flex',
    },
    thirdLineLeftPart:{
      width:'30%',
      height:'100%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
    },
    thirdLineCenterPart:{
      width:'40%',
      height:'100%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
    },
    thirdLineRightPart:{
      width:'30%',
      height:'100%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
    },
    LeftbottomTopFont:{
      width:'100%',
      display:'flex',
      fontSize:12,
    },
    LeftbottomBotFont:{
      color:'#999',
      width:'100%',
      display:'flex',
      fontSize:12,  
    },
    CenterTopFont:{
      width:'100%',
      display:'flex',
      color:"#FF4E4E",
      justifyContent:'center', 
      fontSize:12,  
    },
    CenterTopGreenFont:{
      width:'100%',
      display:'flex',
      color:"green",
      justifyContent:'center', 
      fontSize:12,  
    },
    CenterBottomFont:{
      width:'100%',
      display:'flex',
      color:'#999',
      justifyContent:'center', 
      fontSize:12,  
    },
    RightPartTopFont:{
      width:'100%',
      display:'flex',
      color:"#FF4E4E",
      justifyContent:'flex-end', 
      fontSize:12, 
    },
    RightPartTopGreenFont:{
      width:'100%',
      display:'flex',
      color:"green",
      justifyContent:'flex-end', 
      fontSize:12, 
    },
    RightPartBottomFont:{
      width:'100%',
      color:'#999',
      display:'flex',
      justifyContent:'flex-end', 
      fontSize:12, 
    }

  }


