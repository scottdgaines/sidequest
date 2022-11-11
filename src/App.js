import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import QuestView from './Components/QuestView/QuestView';
import Completed from './Components/Completed/Completed';
import NotFound from'./Components/NotFound/NotFound';
import cleanData from './utilities';
import './App.css';
import titleBanner from './assets/title-banner.png';
import { forest, castle, meadow } from './themes.js';

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

  // if (theme === 'forest') {
    
  // } else if (theme === 'castle') {
  //   console.log(theme)
  // } else {
  //   console.log(theme.character)
  // }

  useEffect (() => {
    getData();
  }, []);

  return (
    <main className={theme.background}>
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
          <img src={theme.character} alt="a friendly wizard" className="wizard" />
          <form className="theme-setting-container">
            <p className="quest-text">choose your theme</p>
            <input type="radio" name="theme" value="meadow" checked={theme === meadow} onChange={() => setTheme(meadow)} />
            <label for="meadow" className="quest-text theme-button">Meadow</label>
            <input type="radio" name="theme" value="forest" checked={theme === forest} onChange={() => setTheme(forest)} />
            <label for="haunted-forest" className="quest-text theme-button">Haunted forest</label>
            <input type="radio" name="theme" value="castle" checked={theme === castle} onChange={() => setTheme(castle)} />
            <label for="castle" className="quest-text theme-button">Castle</label>
          </form>
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
    </main>
  );
};

export default App;
