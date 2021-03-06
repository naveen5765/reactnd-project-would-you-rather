import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'
import '../css/AddQuestion.css'

class AddQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: '',
        redirectoToHome: false,
        showError: false
    }

    handleChange = (e) => {
        let targetValue = e.target.value
        let inputNumber = e.target.id
    
        this.setState({
          [inputNumber]: targetValue,
          showError: false
        })
    }
    
    handleSubmit = (e) => {
      e.preventDefault()
  
      let { optionOne, optionTwo } = this.state

      optionOne.trim() === '' || optionTwo.trim() === ''
      ? 
      this.setState({
        showError: true
      })
      :
      this.props.dispatch(handleAddQuestion(optionOne, optionTwo))
        .then(() => {
          this.setState({
            redirectoToHome: true
          })
        })
    }

    buttonStatus = () => {
      return this.state.inputOne === '' || this.state.inputTwo === '' 
    }

    render(){
        let { isLoggedIn } = this.props
        const { optionOne, optionTwo, redirectoToHome, showError } = this.state

        if(!isLoggedIn){
          return <Redirect to={{pathname: '/', state: {redirectUrl: this.props.location.pathname}}} />
        }else if(redirectoToHome){
          return <Redirect push to={ '/home' } />
        }

        return(
          <div>
            <br />
            <br />
            <h1 className='text-center'>Add a new question</h1>
            <div className="new-question-full-div bg-dark text-white">
              <form className='new-question-body' onSubmit={this.handleSubmit}>
                <h1 className='title'> Would you rather... </h1>
                {
                    showError
                    ? <h5 className="text-danger">Please enter the Options before creating</h5>
                    : null
                }
                <input 
                  id="optionOne"
                  placeholder='Enter Option One Here' 
                  value={optionOne}
                  className='question-option' 
                  onChange={this.handleChange}
                  />
                <h3 className='complete-question-title'> or </h3>
                <input 
                  id="optionTwo"
                  placeholder='Enter Option Two Here' 
                  value={optionTwo}
                  className='question-option' 
                  onChange={this.handleChange}
                  />
                <button 
                  type='submit' 
                  className='submit-btn' 
                  disabled={this.buttonStatus()}>Create</button>
              </form>
            </div>
          </div>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        isLoggedIn: authedUser !== null
    }
}

export default connect(mapStateToProps)(AddQuestion)