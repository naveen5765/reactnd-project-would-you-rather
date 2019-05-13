import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

class UnansweredQuestions extends Component {

    getAvatar = () => {
        return this.props.authedUser.avatarURL
    }

    goToVotePage = (id) => {
        this.props.history.push(`/questions/${id}`)
    }
    
    render() {
        const { question, authedUser } = this.props
        return (
            <div className="question-full-div text-white bg-dark" style={{cursor: "pointer"}} onClick={() => {this.goToVotePage(question.id)}}>
                <div className="author">
                    {
                        authedUser.id === question.author
                        ? <div className="title"><h6>Asked by You</h6></div>
                        : <div className="title"><h6>Asked by {question.author}</h6></div>
                    }
                    <img className="unanswered-avatar" src={this.getAvatar()} alt="User Avatar" />
                </div>
                <div className="question-form">
                    <h3> Would you rather ... ? </h3>
                    <br />
                    <label className="question-choice ml-2 text-primary">{question.optionOne.text}</label>
                    <br />
                    <label className="question-choice ml-2">OR</label>
                    <br />
                    <label className="question-choice ml-2 text-danger">{question.optionTwo.text}</label>
                    <br />
                </div >
            </div>
        )
    }
}

UnansweredQuestions.propTypes = {
    question: PropTypes.object
}

const mapStateToProps = ({ authedUser }) => {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(UnansweredQuestions))