import React from 'react';
import PropTypes from "prop-types";

const NotSelectedOption = function(props){
    const { optionText, optionVoteCount, totalVoteCount, progress} = props
    return (
        <div className='not-user-choice'>
            <p className='paragraph-text'>Would you rather {optionText}</p>
            <div className="progress">
            <div className="progress-bar" style={{width: `${progress}%`}}></div>
            </div>
            <p>{optionVoteCount} out of {totalVoteCount} votes</p>
        </div>
    );
}

NotSelectedOption.propTypes = {
    optionText: PropTypes.string,
    optionVoteCount: PropTypes.number,
    totalVoteCount: PropTypes.number,
    progress: PropTypes.number
};

export default NotSelectedOption;