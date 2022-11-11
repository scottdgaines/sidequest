import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './QuestView.css';

const QuestView = ({ currentQuest,  markCompleted, getData, greeting, completed, error }) => {
    let optionalLink;
    let header;
    let dynamicButton;
    const errorMessage = error ? <p className="quest-text">Another quest cannot be granted at this time. Confound that Dark Lord!</p> : null;

    //Defining optionalLink
    if (!completed && currentQuest.link) {
        optionalLink = <p className="quest-text">Not sure where to start? Check out <a href={`${currentQuest.link}`} target="_blank">this link</a></p>
    };

    //Defining header
    if (!completed) {
        header = 
            <div className="quest-name-container">
                <p className="quest-text">Your quest, {`${greeting}`}, is to:</p>
                <h2 className="quest-header">{currentQuest.activity}</h2>
                {optionalLink}
            </div>
    } else {
        header = 
            <div>
                <h2 className="quest-header">Well done, {`${greeting}`}!</h2>
                <p className="quest-text">Your quest is complete. 
                <br /> What would you like to do now?</p>
            </div>
    };
    
    //Defining dynamicButton
    if (!completed && !error) {
        dynamicButton = 
            <Link to="quest-complete">
                <button 
                    onClick={() => {
                        markCompleted(currentQuest)
                        getData()}}
                    className="quest-button">
                    Mark as Complete
                </button>
            </Link>
    } else {
        dynamicButton = 
            <Link to="view-all-completed">
                <button className="quest-button">View Completed</button>
            </Link>
    };

    return (
        <section className="scroll new-quest">
                {errorMessage}
                {header}
                {dynamicButton}
                <Link to="/new-quest">
                    <button onClick={getData} className="quest-button">Get Another Quest</button>
                </Link>
                <Link to="/">
                    <button className="quest-button">Return to Main</button>
                </Link>
        </section>
    );
};

export default QuestView;

QuestView.propTypes = {
    currentQuest: PropTypes.object,
    markCompleted: PropTypes.func,
    getData: PropTypes.func.isRequired,
    greeting: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    error: PropTypes.string
};
