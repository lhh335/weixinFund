


import { PullToRefresh, ListView, Button } from 'antd-mobile';
import { connect } from 'dva';
import { createAction } from '../../../utils';
import React, { Component,createElement  } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'



const NUM_ROWS = 10
let pageIndex = 0


@connect(({ record }) => ({ record })) 

export default class transactionRecord extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: false,
      isLoading: false,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
    };
  }

 
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    setTimeout(() => {
      this.setState({
        height: hei,
      });
    }, 100);
  }

   // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
   componentWillReceiveProps(nextProps) {
    if (nextProps.dataList !== this.props.dataList ) {
      console.log('xxxdc',nextProps.dataList)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataList),
      });
    }
  }

 // tradeType
  onRefresh = () => {
    
    // 下拉刷新 当前tabe列表 当前筛选条件
    
    // console.log('simulate initial Ajax',this.props.record.recordDictionaries)
    const currentCondition = this.props.record.recordListfilterCondition[this.props.currentTab]
    console.log('currentConditiononfresh',currentCondition)
    this.props.dispatch(createAction('record/getAllAndNotConfirmLists')(
      {
       params:{pageNo:1,...currentCondition},
       keyer:this.props.currentTab
      }
    ))

  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    // if (this.state.isLoading && !this.state.hasMore) {
    //   return;
    // }
   console.log('reach end', event);
   this.props.dispatch(createAction('record/addStepOneRccordLists')({ keyer:this.props.currentTab}
  ))



  };



  changeBusinessFlag(key){
    let obj = {}
    switch(key)

    {
      case '020':
        obj.str  = '买入'
        break
      case '022':
        obj.str  = '买入'
      break
      case '024':
        obj.str  = '卖出'
      break
     case '142':
      obj.str  = '卖出'
     break
     case '036':
      obj.str  = '转换'
     break
     case '029':
        obj.str  = '分红'
     break
     case '143':
        obj.str  = '分红'
     break
     
     default:
       obj.str = '其他'
     }
    return obj.str
  }




  returnRow = ()=>{
 
    let index = this.props.dataList.length - 1;
     
    let row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        return null
      }
      const arr = this.props.dataList
      const obj = arr[index--];
     // console.log('objer',arr,obj)
     let business = obj.businFlag
     let dic = this.changeBusinessFlag(business)
     console.log('diididididid',dic)
      return (
        <div key={rowID}
          style={{
            width:'100%',
            height:84,
            display:'flex',
            backgroundColor: '#fff',
          }}
        >

        {/* fundName  ===

       machineDate  "20180124093200" ==
       acceptDate:  "20180124093200"
       requestDate :  "20180124"
       requestStatus: "未确认"  == 
       requestShare	申请份额
       requestAmount	申请金额
       state	申请状态
      */
      
      }

         <div style = {styles.leftPart}>{dic}</div>
         <div style = {styles.rightPart}>
           <div style = {styles.topPart}> 
             <span style = {styles.toppartFont}>{obj.fundName}</span>
             <span style = {styles.toppartFont} >{`${obj.requestAmount}元`}</span>
           </div>
           <div style = {styles.bottomPart}>
              <div style = {styles.bottomLeftPart}> 
               <span style ={ Object.assign({paddingRight:10}, styles.commonBottomPartFont)}>{obj.machineDate.slice(0,8)}</span>
               <span style = {styles.commonBottomPartFont}>{obj.machineDate.slice(8).replace(/(.{2})/g,'$1:').slice(0,8)}</span>
              </div>
              <span style = {styles.commonBottomPartFont} >{obj.requestStatus}</span>
           </div>
         </div>
        </div>
      );
    }; 
   return  row()

  }





  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#EBEBEB',
          height: 1,
        }}
      />
    );

    return (
     <div style = {styles.wrapper}>
      <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ textAlign: 'center' }}>
          {this.props.isLoading ? 'Loading...' : ''}
        </div>)}
        renderRow={this.returnRow}
        renderSeparator={separator}
        useBodyScroll={this.state.useBodyScroll}
        style={this.state.useBodyScroll ? {} : {
          height: this.state.height,
          margin: '0 0',
        }}
        pullToRefresh={<PullToRefresh
          style = {{height:300,overflow:'auto'}}
          refreshing={this.props.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
        pageSize={20}
      />
      {this.props.dataList.length >0  ? null : <div style = {styles.nodataTips}> 暂无数据</div>}
    </div>);
  }
}



transactionRecord.defaultProps = {
  dataList:[],// 数据列表
  filterCondition:{},
  refreshing:false,
  isLoading:false,
  currentTab:''
}

transactionRecord.propTypes = {
  dataList:PropTypes.array,
  refreshing:PropTypes.bool,
  isLoading:PropTypes.bool,
  currentTab:PropTypes.string,
}


const styles = {
  wrapper:{
    paddingTop:60,
  },
  leftPart:{
    paddingTop:24,
    paddingLeft:16,
    width:47,
    fontSize:16,
    color:'#FF4E4E',
  },
  rightPart:{
    width:document.body.clientWidth-77,
    paddingTop:24,
    paddingRight:14,
  },
  topPart:{
    width:'100%',
    height:22,
    display:"flex",
    justifyContent:"space-between",
  },
  bottomPart:{
    width:'100%',
    display:"flex",
    justifyContent:"space-between",
  },
  bottomLeftPart:{
    display:'flex',
  },
  commonBottomPartFont:{
    fontSize:14,
    color:'#999'
  },
  toppartFont:{
    fontSize:15,
  },
  nodataTips:{
    width:'100%',
    height:100,
    position:'absolute',
    zIndex:10000,
    left:0,
    top:'50%',
    textAlign:'center',
  }

}