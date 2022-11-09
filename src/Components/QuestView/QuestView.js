import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const QuestView = ({ currentQuest,  markCompleted, getData, completed, error }) => {
    const header = !completed ? <h2>{currentQuest.activity}</h2> : <h2>Well done, Traveler!</h2>
    const dynamicButton = !completed ? 
        <Link to='quest-complete'>
            <button onClick={() => markCompleted(currentQuest)}>Mark as Complete</button>
        </Link> :
        <Link to='view-all-completed'>
            <button>View Completed</button>
        </Link>
    const errorMessage = error ? <h2>The dark lord is afoot, and there was an error! Please persist, and try again!</h2> : null
    const optionalLink = !completed && currentQuest.link ? <p>Not sure where to start? Check out <a href={`${currentQuest.link}`} target='_blank'>this link</a></p> : null

    return (
        <section>
            <div>
                {errorMessage}
                {header}
                {optionalLink}
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
