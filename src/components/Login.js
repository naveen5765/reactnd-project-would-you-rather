import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import "../css/Login.css"

class Login extends Component {

    state = {
        'selectedUser': null,
        shouldRedirect: false
    }

    handleChange = (user) => {
        this.setState({
          selectedUser: user
        })
    }

    setAuthedUser = (id) => {
        let { users } = this.props
        let user = users.filter((user) => user.id === id)
        this.props.login(user[0]);
        this.setState({
            shouldRedirect: true
        })
    }

    getUserAvatar = () => {
        if(this.state.selectedUser === null)
            return "https://thefamilydinnerproject.org/wp-content/uploads/2013/05/wouldyourather.png"
        else
            return this.state.selectedUser.avatarURL
    }

    render() {
        if(this.state.shouldRedirect){
            return <Redirect push to={ '/home' } />
        }

        let { users } = this.props
        return (
            <div className="container h-100">
                <div className="d-flex justify-content-center h-100 mar-t100">
                    <div className="user_card">
                        <div className="d-flex justify-content-center">
                            <div className="brand_logo_container">
                                <img src={this.getUserAvatar()} className="brand_logo" alt="Select User" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-center form_container">
                            <form>
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <div className="dropdown">
                                        <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown">
                                            {
                                                this.state.selectedUser === null
                                                ? "Select the User"
                                                : this.state.selectedUser.name
                                            }
                                        </button>
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            {
                                                users.map((user) => (
                                                    <button 
                                                        key={user.id}
                                                        className="dropdown-item" 
                                                        type="button" 
                                                        onClick={() => this.handleChange(user)}>{user.name}</button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="d-flex justify-content-center mt-3 login_container">
                            <button 
                                type="button" 
                                name="button" 
                                className="btn login_btn"
                                onClick={() => this.setAuthedUser(this.state.selectedUser.id)}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
      users: Object.values(users),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(setAuthedUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)