import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { handleVoteAnswer } from '../actions/questions'
import '../css/UnansweredQuestions.css'

class UnansweredQuestions extends Component {

    state = {
        answer: ''
    }

    getAvatar = (author) => {
        let user = this.props.users.filter((user) => user.id === author)[0]
        return user.avatarURL
    }

    chooseAnswer = (event) => {
        this.setState({
            answer: event.target.value
        })
    }

    submitAnswer = (event, id) => {
        event.preventDefault()
        this.props.submitAnswer(id, this.state.answer)
    }
    
    render() {
        const { questions, authedUser } = this.props
        return (
            <Fragment>
                {
                questions.map((question) => (
                    <div key={question.id} className="answered-full-div text-white bg-dark">
                        <div className="author">
                            {
                                authedUser.id === question.author
                                ? <div className="title"><h6>Asked by You</h6></div>
                                : <div className="title"><h6>Asked by {question.author}</h6></div>
                            }
                            <img className="question-avatar" src={this.getAvatar(question.author)} alt="User Avatar" />
                        </div>
                        <form className="question-form" onSubmit={(event) => this.submitAnswer(event, question.id)}>
                            <h3> Would you rather ... ? </h3>
                            <br />
                            <input type='radio' name='option' value='optionOne' id='optionOne' onChange={this.chooseAnswer} />
                            <label className="question-choice ml-2" htmlFor='optionOne'>{question.optionOne.text}</label>
                            <br />
                            <input type='radio' name='option' value='optionTwo' id='optionTwo' onChange={this.chooseAnswer} /> 
                            <label className="question-choice ml-2" htmlFor='optionTwo'>{question.optionTwo.text}</label>
                            <br />
                            <button type="submit" className="submit-btn mt-3">Submit</button>
                        </form >
                    </div>
                ))
                }
            </Fragment>
        )
    }
}

UnansweredQuestions.propTypes = {
    questions: PropTypes.array
}

const mapStateToProps = ({authedUser, users}) => {
    return {
        authedUser,
        users: Object.values(users)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitAnswer: (id, answer) => dispatch(handleVoteAnswer(id, answer))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(UnansweredQuestions)