

import React, { Component,createElement  } from 'react'
import PropTypes from 'prop-types'
import {Carousel, Button} from 'antd-mobile'
import $ from 'jquery'

export default class TheCarousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }

    }
    componentWillMount(){
      
    }
    componentDidMount(){
     
    }

 

    returnDot(arr){
      console.log('xxxlkl',arr)
       const tac = []
       arr.map((item,index)=>
         tac.push(
          <div  style = {{
            width:30,
            height:20,
           // backgroundColor:'gold',
            color:'red',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            }}  
            key = {index}       
            >
            {index === 0  ? 
            (<div  style = {{ width:14,height:5,borderRadius:2.5,backgroundColor:'#019AFF'}}> </div>) 
             : 
             <div  style = {{ width:5,height:5,borderRadius:2.5,backgroundColor:'#D5D6D5'}}> </div>}
          </div>)
        )
       return tac

    }


    setIndex(index,id){
      console.log('index',$(id))
      if(id){
        const newId = '#'+id
        $(newId).children().each(function(ind){
         console.log('iiii',index)
         if(index === ind ){
           $(this).children('div').css({ width:14,height:5,borderRadius:2.5,backgroundColor:'#019AFF'})
           $(this).siblings('div').children('div').css({ width:5,height:5,borderRadius:2.5,backgroundColor:'#D5D6D5'})
         }
       })
      }
    }



    render() {
       const { carouselLists ,theId}  = this.props
       const carouselParams = {
        swipeSpeed: 35,
        dotStyle:{width: 3, height: 0, top:-35},
        dotActiveStyle: {backgroundColor: '#fff',width:0,height:0}
      }
        return (
       <div style = {styles.outBox}> 
        <Carousel
           autoplay={false}
           swipeSpeed={carouselParams.swipeSpeed}
           dotStyle={carouselParams.dotStyle}
           dotActiveStyle={carouselParams.dotActiveStyle}
           afterChange={index => {this.setIndex(index,theId)}}
          >
         { this.props.children}
       </Carousel>
         <div style = { styles.pointArr } id = {theId} >
         { carouselLists.length > 1  ? this.returnDot(carouselLists) : null }  
         </div>
       </div>
        )
    }
}


TheCarousel.defaultProps = {
  theId:'',
  carouselLists:[],
}

TheCarousel.propTypes = {
  theId:PropTypes.string,
  carouselLists:PropTypes.array,
}


const styles = {
      outBox:{
        width:'100%',
        height:'100%',
        position:'relative'
      },
     pointArr:{
       width:160,
       height:20,
       position:'absolute',
       bottom:0,
       left:"50%",
       marginLeft:-80,
       display:'flex',
       justifyContent:'center',
     }



  }


