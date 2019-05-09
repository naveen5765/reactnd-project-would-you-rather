import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux'
import { Link, Redirect} from 'react-router-dom'
import { IoMdLogOut } from 'react-icons/io'
import { removeAuthedUser } from '../actions/authedUser'

class Navigation extends Component{

    alignBrandToCenter = (loggedIn) => {
        if(!loggedIn)
            return 'flex-grow-1 text-center'
        else
            return ''
    }

    getBrandpath = (loggedIn) => {
        if(loggedIn){
            return '/home'
        }
        return '/'
    }

    logout = () => {
        this.props.logout()
        return <Redirect to='/' />
    }

    activateLink = (event) => {
        let NavigateHome = this.refs.NavigateHome;
        let NavigateAddQuestion = this.refs.NavigateAddQuestion;
        let NavigateLeaderBoard = this.refs.NavigateLeaderBoard;

        NavigateHome.classList.remove('active')
        NavigateAddQuestion.classList.remove('active')
        NavigateLeaderBoard.classList.remove('active')

        event.currentTarget.classList.add('active')
    }

    render(){
        return(
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to={this.getBrandpath(this.props.loggedIn)} className={`navbar-brand ${this.alignBrandToCenter(this.props.loggedIn)}`}>Would you rather?</Link>
                    {
                        this.props.loggedIn && 
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active" onClick={this.activateLink} ref="NavigateHome">
                                <Link to="/home" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item" onClick={this.activateLink} ref="NavigateAddQuestion">
                                <Link to="/addQuestion" className="nav-link">Add Question</Link>
                            </li>
                            <li className="nav-item" onClick={this.activateLink} ref="NavigateLeaderBoard">
                                <Link to="/leaderBoard" className="nav-link">Leader Board</Link>
                            </li>
                        </ul>
                        <div className="navbar-nav">
                            <div className="navbar-brand d-flex align-items-center">
                                <span style={{fontSize: '15px', paddingRight: '10px'}}>{this.props.user.name}</span>
                                <img src={this.props.user.avatarURL} width="34" height="34" className="rounded-circle" alt="User Avatar" />
                                <div 
                                style={{ fontSize: '26px', color: 'black', paddingLeft: '30px', cursor: 'pointer'}} 
                                onClick={this.logout}>
                                    <IoMdLogOut />
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </nav>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ authedUser}) => {
    return {
        user: authedUser,
        loggedIn: authedUser !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(removeAuthedUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)