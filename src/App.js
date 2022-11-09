import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import QuestView from './Components/QuestView/QuestView'
import Completed from './Components/Completed/Completed'
import cleanData from './utilities'
import './App.css'

const App = () => {
  const [currentQuest, setCurrentQuest] = useState({});
  const [completedQuests, setCompletedQuests] = useState([]);
  const [error, setError] = useState('');

  const getData = async () => {
    try {    
      const response = await fetch('http://www.boredapi.com/api/activity/')
      const data = await response.json()
      const activity = cleanData(data)

      if (!response.ok) {
        return
      } 

      setCurrentQuest(activity)

    } catch (error) {
         setError(error)
      }
  }

  const markCompleted = (currentQuest) => {
    setCompletedQuests([...completedQuests, currentQuest]);
    setCurrentQuest('')
  }

  useEffect (() => {
    setCurrentQuest('')
  }, [])

  return (
    <main>
      <Route exact path="/">
        <header>
          <h1>SideQuest</h1>
        </header>
        <nav>
          <div>
            <Link to="/new-quest">
              <button onClick={getData}>Start a New Quest</button>
            </Link>
            <Link to="/view-all-completed">
              <button>Show Completed Quests</button>
            </Link>
          </div>
        </nav>
      </Route>
      <Route path="/new-quest" render={() => 
        <QuestView 
          currentQuest={currentQuest} 
          markCompleted={markCompleted} 
          getData={getData}
          error={error}
        />} 
      />
      <Route path="/quest-complete" render={() => 
        <QuestView 
          completed={true}
          getData={getData}
        />} 
      />
      <Route path="/view-all-completed" render={() => 
        <Completed completedQuests={completedQuests} />} 
      />
    </main>
  )
}

export default App
