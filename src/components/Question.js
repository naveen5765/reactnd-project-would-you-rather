import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AnsweredQuestion from './AnsweredQuestion'
import PageNotFound from './PageNotFound'

class Question extends Component {
  render() {
    const { isLoggedIn , question} = this.props

    if(!isLoggedIn){
        return <Redirect to={{pathname: '/', state: {redirectUrl: this.props.location.pathname}}} />
    }

    return (
        (question)
        ? <AnsweredQuestion question={question} />
        : <PageNotFound />
    )
  }
}

function mapStateToProps ({ authedUser, questions }, props) {
  let { question_id } = props.match.params
  return {
    isLoggedIn: authedUser !== null,
    question: question_id !== undefined ? questions[question_id] : undefined
  }
}

export default connect(mapStateToProps)(Question)