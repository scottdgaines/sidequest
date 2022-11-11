import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { forest, castle, meadow } from '../../themes.js';
import './Settings.css'

const Settings = ({ theme, setTheme }) => {
  return (
    <div className="settings-view">
        <form className="theme-setting-container">
            <p className="quest-text">choose your theme</p>
            <input type="radio" name="theme" value="meadow" checked={theme === meadow} onChange={() => setTheme(meadow)} />
            <label for="meadow" className="quest-text theme-button">Meadow</label>
            <input type="radio" name="theme" value="forest" checked={theme === forest} onChange={() => setTheme(forest)} />
            <label for="haunted-forest" className="quest-text theme-button">Haunted forest</label>
            <input type="radio" name="theme" value="castle" checked={theme === castle} onChange={() => setTheme(castle)} />
            <label for="castle" className="quest-text theme-button">Castle</label>
        </form>
        <Link to="/">
                <button className="quest-button">Return to Main</button>
        </Link>
    </div>
  )
}

export default Settings

Settings.propTypes = {
  theme: PropTypes.object.isRequired,
  setTheme: PropTypes.func.isRequired
};