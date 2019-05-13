import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AnsweredQuestion from './AnsweredQuestion'
import UnansweredQuestionVote from './UnansweredQuestion_vote'
import PageNotFound from './PageNotFound'

class Question extends Component {
  render() {
    const { isLoggedIn , question, authedUser, users } = this.props

    if(!isLoggedIn){
        return <Redirect to={{pathname: '/', state: {redirectUrl: this.props.location.pathname}}} />
    }

    let user = users.filter((user) => user.id === authedUser.id)[0]
    let answersKeys = Object.keys(user.answers)
debugger
    return (
        (question)
        ? 
        answersKeys.includes(question.id)
        ? <AnsweredQuestion question={question} />
        : <UnansweredQuestionVote question={question} />
        : <PageNotFound answersKeys={answersKeys}/>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
    let { question_id } = props.match.params

    return {
        authedUser,
        isLoggedIn: authedUser !== null,
        question: question_id !== undefined ? questions[question_id] : undefined,
        users: Object.values(users)
    }
}

export default connect(mapStateToProps)(Question)