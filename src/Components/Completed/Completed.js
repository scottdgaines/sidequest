import React from 'react'
import { NavLink } from 'react-router-dom'

const Completed = () => {
    //get all completed quests as props
    //map over those to create a listing
    //return "you [activity] on [date]"
  return (
    <section>
        <div>
            <h3>Your completed Quests</h3>
            {/* {quest} */}
            <NavLink to='/'>Return to Home</NavLink>
        </div>
    </section>
  )
}

export default Completed
