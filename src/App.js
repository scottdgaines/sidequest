import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import QuestView from './Components/QuestView/QuestView';
import Completed from './Components/Completed/Completed';
import NotFound from'./Components/NotFound/NotFound';
import cleanData from './utilities';
import './App.css';
import wizard from './assets/wizard.png';
import titleBanner from './assets/title-banner.png';
import themes from './themes.js';

const App = () => {
  const [currentQuest, setCurrentQuest] = useState({});
  const [completedQuests, setCompletedQuests] = useState([]);
  const [theme, setTheme] = useState({})
  const [error, setError] = useState('');

  const errorMessage = error ? <p className="welcome-message">The Dark Lord is afoot! For your safety, I cannot grant quests at this time. But fear not! You can try again later.</p> : null;
  const welcomeMessage = !error ? <p className="welcome-message">Welcome, Traveler! <br />I have a quest for you! <br />What would you like to do?</p> : errorMessage;
  const conditionalButton = !error ?   <Link to="/new-quest"><button>View Your Quest</button></Link> : null;
  const { forrest, castle, meadow } = themes;

  const getData = async () => {
    try {    
      const response = await fetch('http://www.boredapi.com/api/activity/');
      const data = await response.json();
      const activity = cleanData(data);

      if (!response.ok) {
        return;
      };

      setCurrentQuest(activity);

    } catch (error) {
         setError(error);
      };
  };

  const markCompleted = (currentQuest) => {
    setCompletedQuests([...completedQuests, currentQuest]);
  };

  useEffect (() => {
    getData();
  }, []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <header>
            <img src={titleBanner} alt="an unfurling banner reads 'Sidequest'" className='title' />
          </header>
          <nav>
            <div>
              {welcomeMessage}
              {conditionalButton}
              <Link to="/view-all-completed">
                <button>Show Completed Quests</button>
              </Link>
            </div>
          </nav>
          <img src={wizard} alt="a friendly wizard" className="wizard" />
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
        <Route component={NotFound} />
      </Switch>
      <form className="theme-setting-container">
        <p className="quest-text">choose your theme</p>
        <input type="radio" name="theme" value="haunted-forrest" />
        <label for="haunted-forrest" className="quest-text theme-button">Haunted Forrest</label>
        <input type="radio" name="theme" value="castle" />
        <label for="castle" className="quest-text theme-button">Castle</label>
        <input type="radio" name="theme" value="meadow" checked="true"/>
        <label for="meadow" className="quest-text theme-button">Meadow</label>
      </form>
    </main>
  );
};

export default App;
