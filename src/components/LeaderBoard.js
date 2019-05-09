import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component {
    render(){
        let { isLoggedIn } = this.props
        if(!isLoggedIn){
            return <Redirect to={ '/' } />
        }
        return(
            <div>
                <p>Leader Board</p>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        isLoggedIn: authedUser !== null
    }
}

export default connect(mapStateToProps)(LeaderBoard)