// src/pages/Settings.js

import React, { useState } from 'react';
import '../styles/Setting.css';
const Settings = ({ onLanguageChange }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.getItem('language') || 'en');

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    onLanguageChange(newLanguage);  // Callback to update language on the whole app
  };

  return (
    <div className="settings-container">
      <h2>Language Settings</h2>
      <label htmlFor="language-select">Choose your language: </label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="ur">Urdu</option>
      </select>
    </div>
  );
};

export default Settings;
