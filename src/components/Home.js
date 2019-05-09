import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Login extends Component {
    render(){
        let { isLoggedIn } = this.props
        if(!isLoggedIn){
            return <Redirect to={ '/' } />
        }
        return(
            <div>
                <p>Home Page</p>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        isLoggedIn: authedUser !== null
    }
}

export default connect(mapStateToProps)(Login)