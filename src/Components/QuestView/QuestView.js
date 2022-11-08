import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const QuestView = ({ currentQuest,  markCompleted, getData, completed, error }) => {
    const header = !completed ? currentQuest.activity : "Well done, Traveler!"
    const dynamicButton = !completed ? 
        <Link to='quest-complete'>
            <button onClick={() => markCompleted(currentQuest)}>Mark as Complete</button>
        </Link> :
        <Link to='view-all-completed'>
            <button>View Completed</button>
        </Link>
    const errorMessage = error ? 'The dark lord is afoot, and there was an error! Please persist, and try again!' : null

    return (
        <section>
            <div>
                <h2>{errorMessage}</h2>
                <h2>{header}</h2>
                {dynamicButton}
                <Link to='/new-quest'>
                    <button onClick={getData}>Get Another Quest</button>
                </Link>
                <NavLink to='/'>Return to Main</NavLink>
            </div>
        </section>
    )
}

export default QuestView
