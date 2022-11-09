import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import './QuestView.css'

const QuestView = ({ currentQuest,  markCompleted, getData, completed, error }) => {
    const optionalLink = !completed && currentQuest.link && !error ? <p>Not sure where to start? Check out <a href={`${currentQuest.link}`} target="_blank">this link</a></p> : null
    const header = !completed ? <div><h2>{currentQuest.activity}</h2>{optionalLink}</div> : <h2>Well done, Traveler!</h2>
    const dynamicButton = !completed && !error ? 
        <Link to="quest-complete">
            <button onClick={() => {
                markCompleted(currentQuest)
                getData()}}>Mark as Complete</button>
        </Link> :
        <Link to="view-all-completed">
            <button>View Completed</button>
        </Link>
    const errorMessage = error ? <p>Another quest cannot be granted at this time. Confound that dark lord!</p> : null

    return (
        <section>
            <div>
                {errorMessage}
                {header}
                {dynamicButton}
                <Link to="/new-quest">
                    <button onClick={getData}>Get Another Quest</button>
                </Link>
                <NavLink to="/">Return to Main</NavLink>
            </div>
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
