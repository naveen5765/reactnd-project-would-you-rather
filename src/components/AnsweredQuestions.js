import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { IoIosDoneAll } from "react-icons/io";
import '../css/AnsweredQuestions.css'

class AnsweredQuestions extends Component {

    getAvatar = (author) => {
        let user = this.props.users.filter((user) => user.id === author)[0]
        return user.avatarURL
    }

    getProgress = (question, option) => {
        const optionOneVotesCount = question.optionOne.votes.length
        const optionTwoVotesCount = question.optionTwo.votes.length
        const total = optionOneVotesCount + optionTwoVotesCount
        return option === 'optionOne'
        ? (optionOneVotesCount / total) * 100
        : (optionTwoVotesCount/ total) * 100
    }

    getTotalVotes = (question) => {
        return question.optionOne.votes.length + question.optionTwo.votes.length
    }

    render() {
        const { authedUser, questions} = this.props
        return (
            <Fragment>
                {
                questions.map(question => (
                    <div key={question.id} className="answered-full-div text-white bg-dark">
                        <div className="author">
                            {
                                authedUser.id === question.author
                                ? <div className="title"><h3>Asked by You</h3></div>
                                : <div className="title"><h3>Asked by {question.author}</h3></div>
                            }
                            <img className="answered-avatar" src={this.getAvatar(question.author)} alt="User Avatar" /> 
                        </div>
                        <div className="question-form">
                            <h3> Results </h3>
                            <br />
                            {
                                question.optionOne.votes.includes(authedUser.id)
                                ? 
                                <div className='answered-div'>
                                    <div className='user-choice'>
                                        <div className='title-user-choice'>
                                            <IoIosDoneAll />
                                        </div>
                                        <p className='paragraph-text'>Would you rather {question.optionOne.text} </p>
                                        <div className="progress">
                                        <div className="progress-bar" style={{width: `${this.getProgress(question, "optionOne")}%`}}></div>
                                        </div>
                                        <p>{question.optionOne.votes.length} out of {this.getTotalVotes(question)} votes</p>
                                    </div>
                                    <br />
                                    <div className='not-user-choice'>
                                        <p className='paragraph-text'>Would you rather {question.optionTwo.text}</p>
                                        <div className="progress">
                                        <div className="progress-bar" style={{width: `${this.getProgress(question, "optionTwo")}%`}}></div>
                                        </div>
                                        <p>{question.optionTwo.votes.length} out of {this.getTotalVotes(question)} votes</p>
                                    </div>
                                </div>
                                : 
                                <div className='answered-div'> 
                                    <div className='not-user-choice'>
                                        <p className='paragraph-text'>Would you rather {question.optionOne.text} </p>
                                        <div className="progress">
                                        <div className="progress-bar" style={{width: `${this.getProgress(question, "optionOne")}%`}}></div>
                                        </div>
                                        <p>{question.optionOne.votes.length} out of {this.getTotalVotes(question)} votes</p>
                                    </div>
                                    <br />
                                    <div className='user-choice'>
                                        <div className='title-user-choice'>
                                            <IoIosDoneAll />
                                        </div>
                                        <p className='paragraph-text'>Would you rather {question.optionTwo.text}</p>
                                        <div className="progress">
                                        <div className="progress-bar" style={{width: `${this.getProgress(question, "optionTwo")}%`}}></div>
                                        </div>
                                        <p>{question.optionTwo.votes.length} out of {this.getTotalVotes(question)} votes</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                ))
                }
            </Fragment>
        )
    }
}

AnsweredQuestions.propTypes = {
    questions: PropTypes.array,
    users: PropTypes.array
}

const mapStateToProps = ({authedUser}) => {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(AnsweredQuestions)