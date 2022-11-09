import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
import './Completed.css'
import backArrow from '../../assets/back-arrow.png'

const Completed = ({ completedQuests }) => {
    const completedQuest = completedQuests.map(quest => {
        return (
            <ul 
                key={quest.key}
                className="text">
                    On {quest.date}, you completed the quest to "{quest.activity}"
            </ul>
        )
    })
    
    return (
        <section className="scroll completed-quests">
                <h3 className="quest-header">Your completed Quests</h3>
                <div className="completed-quests-container">
                    {completedQuest}
                </div>
                <NavLink to="/">
                    <img src={backArrow} alt="Return to Main" className="back-arrow" />
                </NavLink>
        </section>
    )
}

export default Completed

Completed.propTypes = {
    completedQuests: PropTypes.array.isRequired
}
