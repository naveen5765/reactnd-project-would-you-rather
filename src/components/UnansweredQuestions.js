import React, { Component } from 'react'
import PropTypes from 'prop-types';

class UnansweredQuestions extends Component {

    getAvatar = (author) => {
        let user = this.props.users.filter((user) => user.id === author)[0]
        return user.avatarURL
    }
    
    render() {
        const { questions } = this.props
        return (
            <div className='questions mx-auto'>
                {questions.map((question) => (
                <div key={question.id} className="card text-center mx-auto" style={{width: "55%", padding: "5px", margin: "15px"}} >
                    <div className="card-body bg-dark text-white">
                        <h5 className="card-title">Would you rather ?</h5>
                        <div className="row">
                            <div className="col-5 p-2 bg-primary">{question.optionOne.text}</div>
                            <div className="col-2 mt-2">OR</div>
                            <div className="col-5 p-2 bg-danger">{question.optionTwo.text}</div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <img className="p-2" src={this.getAvatar(question.author)} alt="User Avatar" width="40" height="40" />
                            <div className="p-2">{question.author}</div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        )
    }
}

UnansweredQuestions.propTypes = {
    questions: PropTypes.array,
    users: PropTypes.array
}

export default UnansweredQuestions