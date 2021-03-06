import React , {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import _ from 'lodash'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min'
import "../css/App.css"

import { handleInitialData } from '../actions/shared'

import Navigation from './Navigation'
import Login from './Login'
import Home from './Home'
import LeaderBoard from './LeaderBoard'
import AddQuestion from './AddQuestion'
import Question from './Question'

class App extends Component {
  componentDidMount() {
    this.props.getInitialData()
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {this.props.loading === true
            ? null
            :<div>
              <Navigation />
              <Route path='/' exact component={Login} />
              <Route path='/home' component={Home} />
              <Route path='/add' component={AddQuestion} />
              <Route path='/leaderboard' component={LeaderBoard} />
              <Route path='/questions/:question_id' component={Question} />
            </div>}
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = ({ users, questions }) => {
  return {
    loading: _.isEmpty(users) && _.isEmpty(questions)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInitialData: () => dispatch(handleInitialData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
