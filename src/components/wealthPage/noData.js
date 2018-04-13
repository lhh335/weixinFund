

import React, { Component,createElement  } from 'react'
import PropTypes from 'prop-types'



export default class Nodata extends Component {
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
        const { BottomTips }  = this.props
        return (
          <div   style = {styles.wrapper}>
           <img
            src={require('../../images/nodata.png')}
            alt=""
            style={{ height: 77, width: 109, marginTop:27, marginBottom:14  }}
           />
           {BottomTips}
          </div>
        )
    }
}


Nodata.defaultProps = {
  BottomTips:''  ,
}
   
Nodata.propTypes = {
  BottomTips:PropTypes.string ,  
} 



const styles = {
  wrapper:{
   display:'flex',
   width:"100%",
   height:200,
   flexDirection:'column',
   alignItems:'center',
   fontSize:14,
   color:"#808080",
  },
 }


