import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class LeaderBoard extends Component {
    render(){
      let { isLoggedIn, authedUser, users } = this.props

      if(!isLoggedIn){
          return <Redirect to={ '/' } />
      }

      let sortedUsers = Object.values(users).sort((a,b) => (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length))
      
      return(
          <div>
            <br /> <br />
            <h1 className='text-center'>Leaderboard</h1>
            <br />
            <div className="leaderboard mx-auto" style={{maxWidth: "70%"}}>
              <div className="row mb-2 rounded font-weight-bold">
                  <div className="col"></div>
                  <div className="col">
                      <div className="text-center">Questions</div>
                  </div>
                  <div className="col">
                      <div className=" text-center">Answers</div>
                  </div>
                  <div className="col">
                      <div className=" text-center">Total</div>
                  </div>
              </div>
              {
                sortedUsers.map((user) => {
                  return (
                    <div key={user.id} className={'row mb-2 rounded border text-white border-white ' + (authedUser.id === user.id ? 'bd-width2 bg-success' : 'bg-dark')}>
                        <div className="col align-items-center">
                          <img src={user.avatarURL} alt="User Avatar" width="60" height="60" className="rounded mr-3" />
                          {user.name}
                        </div>
                        <div className="col">
                            <div className="text-center mt-3">{user.questions.length}</div>
                        </div>
                        <div className="col">
                            <div className="text-center mt-3">{Object.keys(user.answers).length}</div>
                        </div>
                        <div className="col">
                            <div className="text-center mt-3">{user.questions.length + Object.keys(user.answers).length}</div>
                        </div>
                    </div>
                  )})
              }
            </div>
          </div>
        )
    }
}

function mapStateToProps ({ authedUser, users }) {
    return {
        isLoggedIn: authedUser !== null,
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(LeaderBoard)