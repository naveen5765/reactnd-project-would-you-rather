import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import AnsweredQuestion from './AnsweredQuestion'

class Question extends Component {
  render() {
    const { isLoggedIn , question} = this.props

    if(!isLoggedIn){
        return <Redirect to={ '/' } />
    }

    return (
        <AnsweredQuestion question={question} />
    )
  }
}

function mapStateToProps ({ authedUser, questions }, props) {
  const { question_id } = props.match.params

  return {
    isLoggedIn: authedUser !== null,
    question: question_id !== undefined ? questions[question_id] : {}
  }
}

export default connect(mapStateToProps)(Question)