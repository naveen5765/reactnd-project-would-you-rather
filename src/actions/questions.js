import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const RECEIVE_QUESTIONS= 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const VOTE_ANSWER = 'VOTE_ANSWER'


export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser.id
    })
      .then((question) => dispatch(addQuestion(question)))
  }
}

function voteAnswer (questionId, option) {
  return {
    type: VOTE_ANSWER,
    questionId,
    option,
  }
}

export function handleVoteAnswer (questionId, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    return saveQuestionAnswer({
      authedUser,
      questionId,
      answer
    })
      .then((answer) => dispatch(voteAnswer(answer)))
  }
}
