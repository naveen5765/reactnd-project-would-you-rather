import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import AnsweredQuestion from './AnsweredQuestion'
import UnansweredQuestion from './UnansweredQuestion'

class Login extends Component {
    state = {
        'showUnanswered': true
    }

    changePagination = (showUnanswered) => {
        this.setState({
            showUnanswered
        })
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
                            <button className="page-link rounded">Unanswered questions</button>
                        </li>
                        <li className={"page-item mar-20 " + (this.state.showUnanswered ? '' : 'active')} onClick={() => this.changePagination(false)}>
                            <button className="page-link rounded">Answered questions</button>
                        </li>
                    </ul>
                </nav>
                {
                    this.state.showUnanswered 
                    ? 
                    sortedQuestions.map((question) => (
                        <UnansweredQuestion key={question.id} question={question} users={users}/>
                    ))
                    : 
                    sortedQuestions.map((question) => (
                        <AnsweredQuestion key={question.id} question={question} />
                    ))
                }
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