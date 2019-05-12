import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'

class Login extends Component {
    state = {
        'showUnanswered': true
    }

    changePagination = (showUnanswered) => {
        this.setState({
            showUnanswered: showUnanswered
        })
    }

    getAvatar = (author) => {
        let user = this.props.users.filter((user) => user.id === author)[0]
        return user.avatarURL
    }

    render(){
        let { isLoggedIn, questions, authedUser, users } = this.props
        
        if(!isLoggedIn){
            return <Redirect to={ '/' } />
        }

        let user = users.filter((user) => user.id === authedUser.id)[0]
        let answersKeys = Object.keys(user.answers)
        let questionsKeys = Object.keys(questions)
        let unansweredKeys = _.difference(questionsKeys, answersKeys)
        let questionsUnanswered = _.pick(questions, unansweredKeys)
        let questionsAnswered = _.pick(questions, answersKeys)
        let questionsByCategory = this.state.showUnanswered ? questionsUnanswered : questionsAnswered
        let sortedQuestions = Object.values(questionsByCategory).sort((a,b,) => b.timestamp - a.timestamp)

        return(
            <div>
                <br />
                <nav>
                    <ul className="pagination pagination-lg justify-content-center">
                        <li className={"page-item mar-20 " + (this.state.showUnanswered ? 'active' : '')} onClick={() => this.changePagination(true)}>
                            <button className="page-link">Unanswered questions</button>
                        </li>
                        <li className={"page-item mar-20 " + (this.state.showUnanswered ? '' : 'active')} onClick={() => this.changePagination(false)}>
                            <button className="page-link">Answered questions</button>
                        </li>
                    </ul>
                </nav>
                <div className='questions mx-auto'>
                    {sortedQuestions.map((question) => (
                    <div className="card text-center mx-auto" style={{width: "55%", padding: "5px", margin: "15px"}} key={question.id}>
                        <div className="card-body bg-dark text-white">
                            <h5 className="card-title">Would you rather ?</h5>
                            <div className="row">
                                <div className="col-5 p-2 bg-primary">{question.optionOne.text}</div>
                                <div className="col-2 mt-2">OR</div>
                                <div className="col-5 p-2 bg-danger">{question.optionTwo.text}</div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <img className="p-2" src={this.getAvatar(question.author)} alt="User Avatar" width="40" height="40" />
                                <div className="p-2">{question.author}</div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, questions, users }) {
    return {
        isLoggedIn: authedUser !== null,
        authedUser,
        questions,
        users: Object.values(users)
    }
}

export default connect(mapStateToProps)(Login)