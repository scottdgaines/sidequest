import React from 'react'
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'
import './Completed.css'
import backArrow from '../../assets/back-arrow.png'

const Completed = ({ completedQuests }) => {
    const completedQuest = completedQuests.map(quest => {
        return (
            <ul key={quest.key}>
                On {quest.date}, you completed the quest to "{quest.activity}"
            </ul>
        )
    })
    
    return (
        <section>
            <div>
                <h3>Your completed Quests</h3>
                {completedQuest}
                <NavLink to="/"><img src={backArrow} alt="Return to Main" className="back-arrow" /></NavLink>
            </div>
        </section>
    )
}

export default Completed

Completed.propTypes = {
    completedQuests: PropTypes.array.isRequired
}
