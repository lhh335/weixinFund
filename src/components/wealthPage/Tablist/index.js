

import React, { Component,createElement  } from 'react'
import { connect } from 'dva';
import { createAction } from '../../../utils'
import Listview from '../../base/listview/index'
import $ from 'jquery'
import  './Tablist.css'


@connect(({ record }) => ({ record }))

export default class wealthPageIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
          show:false,
          firstLineSelected:true,
          secondLineSelected:false,
          thirdLineSelected:false,
          currentTab:'allRecordLists',
          currentselectText:'分类',
        }

    }
    componentWillMount(){
      
    }
    componentDidMount(){
     //  获取交易记录列表 
     this.props.dispatch(createAction('record/getAllAndNotConfirmLists')({params:{pageNo:1},keyer:"allRecordLists"}))
     this.props.dispatch(createAction('record/getAllAndNotConfirmLists')({params:{pageNo:1},keyer:"noneConfirmLists"}))
    }


    firstClick = ()=>{
     if (this.state.currentTab === "allRecordLists" ) return
     this.setState({
      firstLineSelected:true,
      secondLineSelected:false,
      thirdLineSelected:false,
      currentTab:"allRecordLists",
      currentselectText:'全部',
     })

     this.props.dispatch(createAction('record/resetCondition')({keyer:"allRecordLists",data:{}}))
    //  $('#listpartsecond').animate({left:document.body.clientWidth,top:0},300);
    //  $('#listpartfirst').animate({left:0,top:0},300);  
    
     this.props.dispatch(createAction('record/getAllAndNotConfirmLists')({params:{pageNo:1},keyer:"allRecordLists"}))
     
    }
 
   secondClick = () =>{
     if(this.state.currentTab === 'noneConfirmLists') return
     this.setState({
      firstLineSelected:false,
      secondLineSelected:true,
      thirdLineSelected:false,
      currentTab:"noneConfirmLists",
      currentselectText:'全部',
     })
     this.props.dispatch(createAction('record/resetCondition')({keyer:"noneConfirmLists",data:{}}))
    //  $('#listpartfirst').animate({left:-document.body.clientWidth,},300);
    //  $('#listpartsecond').animate({left:0,},300);
    this.props.dispatch(createAction('record/getAllAndNotConfirmLists')({params:{pageNo:1},keyer:"noneConfirmLists"}))
    
   }

   thirdClick = () =>{
     this.setState({
       show:!this.state.show,
      //  firstLineSelected:false,
      //  secondLineSelected:false,
       thirdLineSelected:!this.state.thirdLineSelected,
     })
   }

    

    
   showSelectList = () =>{
     const arr = [{title:'买入',tradeType:0},{title:'卖出',tradeType:1},{title:'转换',tradeType:2},{title:'分红',tradeType:3},{title:'其他',tradeType:4}]
     const elementArr = []
     
     arr.map((item,index)=>{
      elementArr.push(
      <div 
       onClick = {()=>{this.showSelcetContent(index,item.tradeType,item.title)}} 
       key = {index}
       className = 'MenuFonter'
       >
       {item.title}
      </div>)
     })

     return elementArr

   }


   showSelcetContent = (index,tradeType,title)=>{
    const currentTab = this.state.currentTab
    this.setState({
      show:false,
      currentselectText:title
    })
    if(currentTab === 'allRecordLists'){
      this.setState({
        firstLineSelected:false,
      })
      setTimeout(()=>{
        this.setState({
          firstLineSelected:true,
        })
      },10)
    }
    else{
      this.setState({
        secondLineSelected:false,
      })
      setTimeout(()=>{
        this.setState({
        secondLineSelected:true,
       })
      },10)
    }

    /// 添加筛选条件
     const condition ={tradeType}
     this.props.dispatch(createAction('record/filterCondition')({keyer:this.state.currentTab,condition}));
   }
  

   show(){
    console.log('zzx',this.props.record.recordListfilterCondition)
   }






    render() {

        const fixHeaderStyle = {
          position: "fixed",
          width: document.body.clientWidth,
          height: "50px",
          color: "#999999",
          lineHeight: "50px",
          backgroundColor: "#FFFFFF",
          left: 0,
          top: 0,
          textAlign: "center",
          zIndex: 1,
         }
       
        return (
          <div style = {styles.box}>
           
            <div style={fixHeaderStyle}>
               <div  style = 
                {{
                  width:document.body.clientWidth,
                  height:50,
                  display:'flex',
                  justifyContent:"space-between",
                 }}>
                 <div style = {{width:"27%",display:'flex',justifyContent:'flex-end'}}>
                  <div 
                   style = { Object.assign({position:'relative'}, this.state.firstLineSelected ? styles.selectedFont : styles.noSelectedFont)} 
                   onClick = {()=>{this.firstClick()}} 
                   >
                   全部
                   
                   { this.state.firstLineSelected ? <div style = {styles.commonBottomLine}/> : null} 
                 </div>
                </div>  
                 <div style = {{width:"46%",display:'flex',justifyContent:'center'}}  >
                 <div 
                  style = {Object.assign({position:'relative'}, this.state.secondLineSelected ? styles.selectedFont : styles.noSelectedFont)}  
                  onClick = {()=>{this.secondClick()}}
                  >
                  待确认
                  { this.state.secondLineSelected ? <div style = {styles.commonBottomLine}/> : null} 
                 </div>
                 </div>
                 <div style = {{width:"27%",display:'flex'}}>
                 <div style = {{position:'relative'}}>
                  <div 
                  // style = {Object.assign({position:'relative'}, this.state.thirdLineSelected ? styles.selectedFont : styles.noSelectedFont)} 
                     style = {Object.assign({position:'relative'}, styles.noSelectedFont)} 
                   onClick = {()=>{this.thirdClick()}} 
                   >
                    {this.state.currentselectText}
                    { this.state.show 
                     ? 
                     <img  style = {styles.TriangleUpImage} alt = '' src={require('../../../images/TriangleDown.png')} />
                     :
                     <img  style = {styles.TriangleDownImage} alt = '' src={require('../../../images/TriangleDown.png')} />   
                    }
                   </div>
                   { this.state.show ?
                  (<div style = {styles.menuList} >
                    <img  style = {styles.imaging} alt = '' src={require('../../../images/listBgc.png')} />
                    <div style = {styles.contentList}>
                     {this.showSelectList()}
                    </div>
                  </div> 
                   )
                   : null
                   } 
                 </div>
                 </div>
               </div>
           </div>
            {
             this.state.firstLineSelected ?
            <div  style = {styles.listpartfirst} id = 'listpartfirst' >
                <Listview 
                 currentTab = {this.state.currentTab}
                 dataList = {this.props.record.recordList.allRecordLists} 
                 refreshing = {this.props.record.recordListRefresh.allRecordLists.refreshing} 
                 isLoading = {this.props.record.recordListRefresh.allRecordLists.isLoading} 
                 />
              </div>
             : null
            }
            {
            this.state.secondLineSelected ?
            <div style = {styles.listpartsecond} id = 'listpartsecond' >
               <Listview 
                currentTab = {this.state.currentTab}
                dataList = {this.props.record.recordList.noneConfirmLists}
                refreshing = {this.props.record.recordListRefresh.noneConfirmLists.refreshing}
                isLoading = {this.props.record.recordListRefresh.noneConfirmLists.isLoading}
                />
            </div>
               :null
            }
            {this.show()}
          </div>  
        )
    }
}





const styles = {
     box:{
      backgroundColor:'#ccc'
     },
     listpartfirst:{
       width:'100%',
       position:'absolute',
       left:0,
       top:0,
     },
     listpartsecond:{
      width:'100%',
      position:'absolute',
      left:0,
      top:0,
      },
     selectedFont:{
      fontSize:15,
      color:'#009BFF',
     },
     noSelectedFont:{
      fontSize:15,
      color:'#999999',
     },
     menuList:{
      width:88,
      height:190,
      position:'absolute',
      left:0,
      top:50,
     },
     imaging:{
      width:105,
      height:'100%',
      position:'absolute',
      left:-10,
      top:-20,
     },
     contentList:{
      width:'100%',
      height:'100%',
      position:'absolute',
      left:0,
      top:-10,
      display:"flex",
      flexDirection:"column",
     },
     TriangleDownImage:{
      width:8,
      height:8,
      position:'absolute',
      right:-10,
      top:'50%',
      marginTop:-4,
     },
     TriangleUpImage:{
      width:8,
      height:8,
      position:'absolute',
      right:-10,
      top:'50%',
      marginTop:-4,
      transform:'rotate(180deg)'
     },
     commonBottomLine:{
      width:'100%',
      height:2,
      backgroundColor:'#009BFF',
      position:'absolute',
      bottom:0,
      left:0,
     }

  }

  // 009BFF


