import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import QuestView from './Components/QuestView/QuestView';
import Completed from './Components/Completed/Completed';
import Settings from './Components/Settings/Settings';
import NotFound from'./Components/NotFound/NotFound';
import cleanData from './utilities';
import './App.css';
import titleBanner from './assets/title-banner.png';
import settingsIcon from './assets/settings-icon.png';
import { meadow } from './themes.js';

const App = () => {
  const [currentQuest, setCurrentQuest] = useState({});
  const [completedQuests, setCompletedQuests] = useState([]);
  const [theme, setTheme] = useState(meadow)
  const [error, setError] = useState('');

  const errorMessage = error ? <p className="welcome-message">The Dark Lord is afoot! For your safety, I cannot grant quests at this time. But fear not! You can try again later.</p> : null;
  const welcomeMessage = !error ? <p className="welcome-message">Welcome, {`${theme.greeting}`}! <br />I have a quest for you! <br />What would you like to do?</p> : errorMessage;
  const conditionalButton = !error ?   <Link to="/new-quest"><button>View Your Quest</button></Link> : null;

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
    <main className={theme.background}>
      <Switch>
        <Route exact path="/">
          <header>
            <img src={titleBanner} alt="an unfurling banner reads 'Sidequest'" className='title' />
            <Link to='/settings'>
              <img src={settingsIcon} alt="Settings" className="setting-icon"/>
            </Link>
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
          <img src={theme.character} alt="a friendly wizard" className="character" />
        </Route>
        <Route path="/settings" render={() => 
          <Settings theme={theme} setTheme={setTheme} />}
        />
        <Route path="/new-quest" render={() => 
          <QuestView 
            currentQuest={currentQuest} 
            markCompleted={markCompleted} 
            getData={getData}
            greeting={theme.greeting}
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
    </main>
  );
};

export default App;
