import React from 'react'
import { NavLink } from 'react-router-dom'

const Completed = ({ completedQuests }) => {
    console.log('completed', completedQuests)

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
                <NavLink to='/'>Return to Main</NavLink>
            </div>
        </section>
    )
}

export default Completed
