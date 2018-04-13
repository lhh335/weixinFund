
 
import React, { Component,createElement  } from 'react'
import Carousel from '../base/carousel'
import PropTypes from 'prop-types'


export default class AccountantCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }

    }
    componentWillMount(){
      
    }
    componentDidMount(){
     
    }



    componentDidCatch(){

    }
 
    render() {
       const { AccountantCardLists } = this.props
        return (
              <div style = {styles.carousle}>
                <Carousel theId = 'AccountantCard'  carouselLists = {AccountantCardLists}>
                  { AccountantCardLists.map((item, index) =>
                  <div style={styles.imgBox}  key = {index}>
                     <img  style = {styles.imaging} alt = '' src={require('../../images/avatar.png')} />
                     <div style = {styles.rightAcount}>
                          <div style = {styles.leftPart}>
                           <div style = {styles.TopmineAcount}>我的理财师</div>
                           <div style = {styles.mineAcountName}> {item.name}</div>
                          </div>
                          <a style = {styles.rightPart} href= {`tel://${item.mobile}`}  >
                           <img  style = {styles.telephoneImaging} alt = '' src={require('../../images/telephone.png')} />
                          </a>
                     </div>
                  </div>

                  )  
                  }
                </Carousel>
              </div>
        )
    }
}


AccountantCard.defaultProps = {
  AccountantCardLists:[],// 资产列表
}

AccountantCard.propTypes = {
  AccountantCardLists:PropTypes.array,
}


const styles = {
    carousle:{
      height:86,
      width:'100%',
    },
    imgBox:{
      width:'100%',
      height:86,
      backgroundColor:"#FFFFFF",
      display:'flex',
      alignItems:'center',
    },
    imaging:{
     width:48,
     height:48,
     marginLeft:14,
     marginRight:13,
    },
    rightAcount:{
     height:86,
     flex:1,
     display:"flex",
     justifyContent:"space-between",
   },
   mineAcount:{
     paddingTop:4,
     fontSize:12,
     color:"#999999",
     paddingBottom:5,
   },
   peopleTelephone:{
     width:'100%',
     height:15,
     display:'flex',
   },
   leftPart:{
     height:'100%',
     display:'flex',
     justifyContent:'center',
     flexDirection:'column',
   },
   rightPart:{
    height:'100%',
    display:'flex',
    justifyContent:'center',
    flexDirection:'column',
   },
   peopleImaging:{
     width:8,
     height:12,
     marginRight:10,
   },
   telephoneImaging:{
     width:48,
     height:48,
     paddingRight:16,
   },
   TopmineAcount:{
     fontSize:12,
     color:"#808080",
     paddingBottom:8,
   },
   mineAcountName:{
     fontSize:16,
     color:'#333',
   }
   
  }


