import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Completed.css';

const Completed = ({ completedQuests }) => {
    const completedQuest = completedQuests.map(quest => {
        return (
            <ul 
                key={quest.key}
                className="completed-quest">
                    On {quest.date}, you completed the quest to "{quest.activity}"
            </ul>
        );
    });
    
    return (
        <section className="scroll completed-quests-display">
                <h3 className="quest-header completed-header">Your Completed Quests</h3>
                <div className="completed-quests-container">
                    {completedQuest}
                </div>
                <Link to="/">
                    <button className="quest-button">Return to Main</button>
                </Link>
        </section>
    );
};

export default Completed;

Completed.propTypes = {
    completedQuests: PropTypes.array.isRequired
};
