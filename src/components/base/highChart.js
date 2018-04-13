import React, {Component} from 'react'
import * as Highcharts from 'highcharts'
import PropTypes from 'prop-types'
const width = window.screen.availWidth
console.log('width',width)

export default class Highcharter  extends Component {
        constructor(props) {
        super(props)
        this.state = {
          data :{},
          nowColorIndex:0,
        }

      }
      
  
   componentDidMount(){
     console.log('dataing',this.props.chartDataList)
     if(this.props.chartDataList.length > 0 ){
      this.reflow(true,this.props.chartDataList)
     }
    
   }

    // componentWillReceiveProps(nextProps){
    //   console.log('dataing',nextProps.chartDataList)
    //  if(this.props.chartDataList !== nextProps.chartDataList){
    //   this.reflow(true,nextProps.chartDataList)
    //   }
    // }


    componentWillUnmount() {
         this.chart.destroy();
     }

    

    reflow(bool,data){
         const  Data = bool ? data :[{y:0}]
         const  _this = this
         this.chart = new Highcharts['Chart'](
         this.chartEl,
      {
        chart: {  
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          
          style :{
            height:'160px',
            width:'100%',
            display:'flex',
          }
      },
      title: {
          text: ''
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false,
            },
            slicedOffset: 20,
            point: {
              events: {
                  click: function(e) { // 同样的可以在点击事件里处理
                  console.log('eeee',e.point.colorIndex ,_this.state.nowColorIndex)
                  _this.setState({nowColorIndex:e.point.colorIndex})
                }
              }
           },
         },
     },
      series: [{
          type: 'pie',
          name: '浏览器访问量占比',
          innerSize: '30%',
          data: Data
      }], 
      }
        );

    }

    showLists(){
      const arrDiv = []
      const arr = this.props.chartDataList
      arr.map((item,index)=>{
        arrDiv.push(
         <div style = {styles.elementDiv} key = {index}>
           <div style = {styles.wrapper}>
            <div style = {Object.assign({backgroundColor:arr[index].color}, styles.commonPoint)} > </div>
           </div>
            <div style = {this.state.nowColorIndex  === index ? Object.assign({color:arr[index].color}, styles.leftFont) : styles.leftFont}  >{arr[index].name.length>7 ? arr[index].name.slice(0,7)+'...' : arr[index].name }</div>
            <div style = {this.state.nowColorIndex  === index ? Object.assign({color:arr[index].color}, styles.rightFont) : styles.rightFont} >{`${arr[index].y.toString().slice(0,4)}%`} </div>     
         </div>
        )
      })
     return arrDiv
    }

     
    render() {
       
         return (
            <div style = {styles.outBox} >
              <div style = {styles.charter}>
                <div  ref={el => (this.chartEl = el)}>  
                </div>
              </div>
                <div  style = {styles.pointList}>
                  {this.showLists()}
                </div>
            </div>
           )
    }
}


Highcharter.defaultProps = {
  chartDataList:[{}],
}

Highcharter.propTypes = {
  chartDataList:PropTypes.array,
}


const styles = {
  outBox:{
   position:'relative',
   width:'100%',
   height:200,
  },
   pointList:{
    width:'50%',
    height:'100%',
    right:0,
    top:0,
    position:'absolute',
    zIndex:200,
    display:'flex',
    flexDirection:"column",
    justifyContent:'center',
  },
  charter:{
    width:'100%',
    height:'100%',
    position:'absolute',
    left:-document.body.clientWidth/4,
    top:20,
  },
  elementDiv:{
    height:27,
    width:'100%',
    display:'flex',
    color:'#999999',
    alignItems:'center',
  },
  commonPoint:{
    width:7,
    height:5,
    marginRight:9,
  },
  leftFont:{
    fontSize:14,
    width:'70%',
    height:'100%',
    display:'flex',
    alignItems:'center',
  },
  rightFont:{
    width:'30%',
    fontSize:14,
    height:'100%',
    display:'flex',
    alignItems:'center',
  },
  wrapper:{
    height:'100%',
    display:'flex',
    alignItems:'center',

  }
}