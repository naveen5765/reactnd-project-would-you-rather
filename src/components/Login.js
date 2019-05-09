import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {

    state = {
        'selectedUser': null
    }

    handleChange = (id) => {
        this.setState((prevState) => ({
          selectedUser: id,
          shouldRedirect: false
        }))
    }

    setAuthedUser = (id) => {
        let { dispatch, users } = this.props
        let user = users.filter((user) => user.id === this.state.selectedUser)
        dispatch(setAuthedUser(user[0]))
        this.setState({
            shouldRedirect: true
        })
    }

    render() {
        if(this.state.shouldRedirect){
            return <Redirect push to={ '/home' } />
        }

        let { users } = this.props
        return (
            <div className="container">
                <div className="row">
                    {
                    users.map((user) => (
                        <div className="card" style={{width: '18rem', cursor: 'pointer'}} key={user.id} onClick={() => this.handleChange(user.id)}>
                            <img className="rounded-circle card-img-top" src={user.avatarURL} alt="User Avatar" />
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                            </div>
                        </div>
                    ))
                    }
                </div>
                <input className="btn btn-primary" type="submit" value="Submit" onClick={() => this.setAuthedUser(this.state.selectedUser)}></input>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
      users: Object.values(users),
    }
  }

export default connect(mapStateToProps)(Login)