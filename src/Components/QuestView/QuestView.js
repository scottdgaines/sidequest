import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import './QuestView.css'
import backArrow from '../../assets/back-arrow.png'

const QuestView = ({ currentQuest,  markCompleted, getData, completed, error }) => {
    const optionalLink = !completed && currentQuest.link && !error ? 
        <p className="quest-text">Not sure where to start? Check out 
            <a href={`${currentQuest.link}`} target="_blank">this link</a>
        </p> : null
    const header = !completed ? 
        <div className="quest-name-container">
            <h2 className="quest-header">{currentQuest.activity}</h2>
            {optionalLink}
        </div> : 
        <h2 className="quest-header">Well done, Traveler!</h2>
    const dynamicButton = !completed && !error ? 
        <Link to="quest-complete">
            <button 
                onClick={() => {
                    markCompleted(currentQuest)
                    getData()}}
                className="quest-button">Mark as Complete</button>
        </Link> :
        <Link to="view-all-completed">
            <button className="quest-button">View Completed</button>
        </Link>
    const errorMessage = error ? <p>Another quest cannot be granted at this time. Confound that dark lord!</p> : null

    return (
        <section className="scroll new-quest">
                {errorMessage}
                {header}
                {dynamicButton}
                <Link to="/new-quest">
                    <button onClick={getData} className="quest-button">Get Another Quest</button>
                </Link>
                <NavLink to="/">
                    <img src={backArrow} alt="Return to Main" className="back-arrow" />
                </NavLink>
        </section>
    )
}

export default QuestView

QuestView.propTypes = {
    currentQuest: PropTypes.object,
    markCompleted: PropTypes.func,
    getData: PropTypes.func.isRequired,
    completed: PropTypes.bool,
    error: PropTypes.string
}
