import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { removeAuthedUser } from '../actions/authedUser'

class Login extends Component {

    constructor(props){
        super(props)
        if(props.authedUser !== null)
            props.removeAuthedUser();
    }

    state = {
        'selectedUser': null,
        shouldRedirect: false
    }

    selectUser = (user) => {
        this.setState({
          selectedUser: user
        })
    }

    login = (selectedUser) => {
        if(selectedUser === null)
            return
        let { users } = this.props
        let user = users.filter((user) => user.id === selectedUser.id)[0]
        this.props.login(user);
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
            let { redirectUrl } = (this.props.location.state) ? this.props.location.state : {redirectUrl: '/home'}
            return <Redirect push to={ redirectUrl } />
        }

        let { users } = this.props
        return (
            <div className="container h-100">
                <div className="d-flex justify-content-center h-100 mar-t100">
                    <div className="user_card bg-dark">
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
                                                        onClick={() => this.selectUser(user)}>{user.name}</button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="d-flex justify-content-center m-3 login_container">
                            <button 
                                type="button" 
                                name="button" 
                                className="btn login_btn"
                                onClick={() => this.login(this.state.selectedUser)}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users, authedUser }) => {
    return {
      users: Object.values(users),
      authedUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(setAuthedUser(user)),
        removeAuthedUser: () => dispatch(removeAuthedUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)