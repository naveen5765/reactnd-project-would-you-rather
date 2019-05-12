import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SelectedOption from './Answered.SelectedOption'
import NotSelectedOption from './Answered.NotSelectedOption'

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
        const { authedUser, question} = this.props
        return (
            <div className="question-full-div text-white bg-dark">
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
                        <div className='question-div'>
                            <SelectedOption 
                                optionText={question.optionOne.text}
                                optionVoteCount={question.optionOne.votes.length}
                                totalVoteCount={this.getTotalVotes(question)}
                                progress={this.getProgress(question, "optionOne")}
                            />
                            <br />
                            <NotSelectedOption
                                optionText={question.optionTwo.text}
                                optionVoteCount={question.optionTwo.votes.length}
                                totalVoteCount={this.getTotalVotes(question)}
                                progress={this.getProgress(question, "optionTwo")}
                            />
                        </div>
                        : 
                        <div className='question-div'> 
                            <NotSelectedOption
                                optionText={question.optionOne.text}
                                optionVoteCount={question.optionOne.votes.length}
                                totalVoteCount={this.getTotalVotes(question)}
                                progress={this.getProgress(question, "optionOne")}
                            />
                            <br />
                            <SelectedOption 
                                optionText={question.optionTwo.text}
                                optionVoteCount={question.optionTwo.votes.length}
                                totalVoteCount={this.getTotalVotes(question)}
                                progress={this.getProgress(question, "optionTwo")}
                            />
                        </div>
                    }
                </div>
            </div>   
        )
    }
}

AnsweredQuestions.propTypes = {
    questions: PropTypes.array
}

const mapStateToProps = ({authedUser, users}) => {
    return {
        authedUser,
        users: Object.values(users)
    }
}

export default connect(mapStateToProps)(AnsweredQuestions)