

import React, { Component,createElement  } from 'react'
import Tablist from '../../components/wealthPage/Tablist/index'



export default class wealthPageIndex extends Component {
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
       
        return (
          <div  style = {styles.total} >
            <Tablist></Tablist>
          </div>
        )
    }
}





const styles = {
     total:{
       width:'100%',
       height:'100%', 
       position:'relative',
       overflow:'hidden',
       backgroundColor:'#F2F3F2',
     }
     
  }


