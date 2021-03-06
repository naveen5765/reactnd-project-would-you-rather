import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { handleVoteAnswer } from '../actions/questions'
import { withRouter } from 'react-router-dom'

class UnansweredQuestions extends Component {

    state = {
        answer: null,
        showError: false
    }

    getAvatar = () => {
        return this.props.authedUser.avatarURL
    }

    chooseAnswer = (event) => {
        this.setState({
            answer: event.target.value,
            showError: false
        })
    }

    submitAnswer = (event, id) => {
        event.preventDefault()
        if(this.state.answer === null){
            this.setState({
                showError: true
            })
            return
        }
        this.props.submitAnswer(id, this.state.answer)
    }
    
    render() {
        const { question, authedUser } = this.props
        return (
            <div className="question-full-div text-white bg-dark">
                <div className="author">
                    {
                        authedUser.id === question.author
                        ? <div className="title"><h6>Asked by You</h6></div>
                        : <div className="title"><h6>Asked by {question.author}</h6></div>
                    }
                    <img className="unanswered-avatar" src={this.getAvatar()} alt="User Avatar" />
                </div>
                <form className="question-form" onSubmit={(event) => this.submitAnswer(event, question.id)}>
                    <h3> Would you rather ... ? </h3>
                    <br />
                    {
                        this.state.showError
                        ? <h6 className="text-danger">Please select an option before submitting</h6>
                        : null
                    }
                    <input type='radio' name='option' value='optionOne' id='optionOne' onChange={this.chooseAnswer} />
                    <label className="question-choice ml-2" htmlFor='optionOne'>{question.optionOne.text}</label>
                    <br />
                    <input type='radio' name='option' value='optionTwo' id='optionTwo' onChange={this.chooseAnswer} /> 
                    <label className="question-choice ml-2" htmlFor='optionTwo'>{question.optionTwo.text}</label>
                    <br />
                    <button type="submit" className="submit-btn mt-3">Submit</button>
                </form >
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

const mapDispatchToProps = (dispatch) => {
    return {
        submitAnswer: (id, answer) => dispatch(handleVoteAnswer(id, answer))
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UnansweredQuestions))