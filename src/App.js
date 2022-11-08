import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import QuestView from './Components/QuestView/QuestView';
import Completed from './Components/Completed/Completed';
import cleanData from './utilities'
import './App.css'

const App = () => {
  const [currentQuest, setCurrentQuest] = useState({})
  const [completedQuests, setCompletedQuests] = useState([])

  const getData = async () => {
    const response = await fetch('http://www.boredapi.com/api/activity/');
    const data = await response.json();
    const activity = cleanData(data)
    
    setCurrentQuest(activity)
  }

  const markCompleted = (currentQuest) => {
    setCompletedQuests([...completedQuests, currentQuest])
  }

  return (
    <main>
      <Route exact path='/'>
        <header>
          <h1>SideQuest</h1>
        </header>
        <nav>
          <div>
            <Link to='/new-quest'>
              <button onClick={getData}>Start a New Quest</button>
            </Link>
            <Link to='/view-all-completed'>
              <button>Show Completed Quests</button>
            </Link>
          </div>
        </nav>
      </Route>
      <Route path='/new-quest' render={() => 
        <QuestView 
          currentQuest={currentQuest} 
          markCompleted={markCompleted} 
          getData={getData}
        />} 
      />
      <Route path='/quest-complete' render={() => 
        <QuestView 
          completed={true}
          getData={getData}
        />} 
      />
      <Route path='/view-all-completed' render={() => <Completed />} />
    </main>
  )
}

export default App
