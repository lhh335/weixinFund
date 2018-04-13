

import React, { Component,createElement  } from 'react'
import PropTypes from 'prop-types'
import './index.css'
 

export default class wealthPageIndexHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
          mask:false,
          show:false,
        }

    }
    componentWillMount(){
      
    }
    componentDidMount(){
      
    }

 
    // changeNumberStyle = (number) =>{
    // const a = number.toString().replace(/[\.|\,|\[0-9]/ig,"*")
    // console.log('xxxx',a)
    // }

    onPress = () =>{
      console.log(123)
      this.setState({
       mask:!this.state.mask
      })
    }

    showTips = ()=>{
      this.setState({show: !this.state.show})
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
      




    render() {
         const { totalAssets,cumulativeIncome, yesterdayEarnings, yesterdayEarningsDate}  = this.props
         const newDate0 = yesterdayEarningsDate.toString()
         const newDate1 = newDate0.slice(newDate0.length-4).replace(/(.{2})/g,'$1-')
         const newDate2 = newDate1.slice(0,5)
         const newDat = '昨日收益('+newDate2 +')'

        return (
          <div  style = {styles.total} >
               <div 
                 style = {styles.firstLine}
                 >
                 <span>总资产</span> 
                 <div 
                   style = {{paddingLeft:10}}
                   onClick = {()=>{this.showTips()}}>
                  <img
                   src={require('../../../images/ask.png')}
                   alt=""
                   style={{width:12,height:12}}
                  />
                </div>
                {
                  this.state.show ? 
                (<div style = {styles.textTips}>
                  <img
                   src={require('../../../images/tipbg.png')}
                   alt=""
                   style={{width:'100%',height:'100%'}}
                  />
                  
                  <div style = {styles.contentTips}>
                  <span>
                   总资产中股权类产品不是以市值方式计算，而是按照未回收投入本金计算，因投资有风险，该股权类产品的计算方式不表示到产品结束时该未回收本金能够全部或部分回收，请投资者知悉。
                  </span>
                  <span>未回收投入本金 = 投资金额 - 已分配金额</span>
                  </div>
                 
                </div>)
                 : 
                 null
                 }
               </div>
                <div style = {styles.secondtLine} > 
                  <span className = 'leftTopYuGoBold' >
                    {this.state.mask  ? totalAssets.replace(/[\.|\,|\[0-9]/ig,"*"): this.thousandChange(totalAssets)}
                  </span> 
                 {/* <span style = {styles.rightEyes} id = 'rightEyes'>
                   <button style = {styles.button} onClick = {()=>this.onPress()}> 
                     {
                       this.state.mask 
                       ?<img  style = {styles.eyeImage} alt = '' src={require('../../../images/close_eye.png')} />
                       :<img  style = {styles.eyeImage} alt = '' src={require('../../../images/open_eye.png')} />
                     } 
                   </button>  
                 </span> */}
               </div>
               <div style = {styles.bottomLinePart}>
                  <div style = {styles.leftPart}>
                    <span style ={ Object.assign( styles.commonBottomTopPartFont)}>{newDat}</span>
                    <span style ={ Object.assign( styles.commonBottomBottomPartFont)} >{yesterdayEarnings > 0 ? `+${this.thousandChange(yesterdayEarnings)}` : `${this.thousandChange(yesterdayEarnings)}`  }</span>
                    <div style = {styles.horovalLineBox} ></div>
                  </div>
                  <div style = {styles.rightPart}>
                    <span style ={ Object.assign( styles.commonBottomTopPartFont)} >累计收益</span> 
                    <span style ={ Object.assign( styles.commonBottomBottomPartFont)} >{cumulativeIncome > 0 ? `+${this.thousandChange(cumulativeIncome)}` : `${this.thousandChange(cumulativeIncome)}`  }</span>
                  </div>
               </div>
          </div>
        )
    }
}



wealthPageIndexHeader.defaultProps = {
  totalAssets:"",
  cumulativeIncome:0,
  yesterdayEarnings:0,
  yesterdayEarningsDate:'03-12',
}

wealthPageIndexHeader.propTypes = {
  totalAssets:PropTypes.string,
  cumulativeIncome:PropTypes.number,
  yesterdayEarnings:PropTypes.number,
  yesterdayEarningsDate:PropTypes.string,
}

const styles = {
    total:{
      width:'100%',
      height:155,
      backgroundColor:'#197FC3',
    } ,
    firstLine:{
      width:'100%',
      height:16,
      color:'#FFFFFF',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      paddingTop:28,
      fontSize:14,
      position:'relative',
    },
    secondtLine:{
      width:'100%',
      height:46,
      display:'flex',
      justifyContent:'center',
    },
    rightEyes:{
      height:'100%',
    },
    button:{
      width:'100%',
      height:'100%',
    },
    eyeImage:{
      width:16,
      height:10,
    },
    bottomLinePart:{
     width:'100%',
     display:'flex',
    },
    leftPart:{
     width:'50%',
     display:'flex',
     flexDirection:'column',
     position:'relative',
    },
    rightPart:{
     width:'50%',
     display:'flex',
     flexDirection:'column',
    },
    commonBottomTopPartFont:{
      textAlign:'center',
      width:'100%',
      fontSize:14,
      color:'#fff',
      paddingBottom:6,
    },
    commonBottomBottomPartFont:{
      textAlign:'center',
      width:'100%',
      fontSize:16,
      color:'#fff',
    },
    horovalLineBox:{
     width:1,
     height:'100%',
     backgroundColor:'#fff',
     position:'absolute',
     right:0,
     top:0,
    },
    textTips:{
      position:'absolute',
      width:document.body.clientWidth-20,
      height:160,
      marginLeft:10,
      marginRight:10,
      left:0,
      top:42,
      
    },
    contentTips:{
      display:'flex',
      position:'absolute',
      marginTop:22,
      marginBottom:22,
      paddingLeft:17,
      paddingRight:8,
      flexDirection:"column",
      justifyContent:"space-between",
      width:document.body.clientWidth-54,
      height:110,
      color:"#333333",
      left:0,
      top:0,
      zIndex:5,
    }

  }


