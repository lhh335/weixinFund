

import React, { Component,createElement  } from 'react'
import Carousel from '../base/carousel'
import HighCharts from '../base/highChart'
import PropTypes from 'prop-types'
import Nodata from './noData'



export default class AssetAnalysis extends Component {
    constructor(props) {
        super(props)
        this.state = { 
        
        }

    }
    componentWillMount(){
      
    }
    componentDidMount(){
     
    }

 



    render() {
  
      const { AssetAnalysisLists } = this.props
        return (
          <div  style = {styles.total} >
              <div style = {styles.topLine}>
                 <div style = { styles.leftLine }></div>
                 <div style = { styles.topFont }>资产分析</div>    
              </div>
              <div style = {styles.carousle}>
              {  AssetAnalysisLists.length >0 
               ? <Carousel theId = 'AssetAnalysis' carouselLists = {AssetAnalysisLists}>
                  { AssetAnalysisLists.map((item, index) =>
                   <div style={styles.imgBox} key={index}>
                 
                   <HighCharts 
                    chartDataList = {item} 
                   />    
                  </div>
                  )  
                  }
                </Carousel>
              :
               <Nodata BottomTips = '暂无持仓资产'/>   
              }
              </div>
          </div>
        )
    }
}


AssetAnalysis.defaultProps = {
  AssetAnalysisLists:[],// 资产列表
}

AssetAnalysis.propTypes = {
 AssetAnalysisLists:PropTypes.array,
}




const styles = {
    total:{
     width:'100%',
     height:240,
     backgroundColor:'#FEFFFE',
     marginTop:10,
     marginBottom:10,
    },
    topLine:{
     height:40,
     borderBottom:'1px solid #F4F5F4',
     display:'flex',
     alignItems:'center',
    },
    leftLine:{
      width:3,
      height:15,
      backgroundColor:'#019AFF',
      marginLeft:14,
      marginRight:13,
    },
    topFont:{
      fontSize:15,
    },
    carousle:{
      height:200,
      width:'100%',
    //  backgroundColor:'yellowgreen',
    },
    imgBox:{
      width:'100%',
      height:200,
     // backgroundColor:"yellowgreen",
    },
  }


