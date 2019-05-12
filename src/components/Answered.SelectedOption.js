import React from 'react';
import PropTypes from "prop-types";
import { IoIosDoneAll } from "react-icons/io"

const SelectedOption = function(props){
    const { optionText, optionVoteCount, totalVoteCount, progress} = props
    return (
        <div className='user-choice'>
            <div className='title-user-choice'>
                <IoIosDoneAll />
            </div>
            <p className='paragraph-text'>Would you rather {optionText}</p>
            <div className="progress">
            <div className="progress-bar" style={{width: `${progress}%`}}></div>
            </div>
            <p>{optionVoteCount} out of {totalVoteCount} votes</p>
        </div>
    );
}

SelectedOption.propTypes = {
    optionText: PropTypes.string,
    optionVoteCount: PropTypes.number,
    totalVoteCount: PropTypes.number,
    progress: PropTypes.number
};

export default SelectedOption;