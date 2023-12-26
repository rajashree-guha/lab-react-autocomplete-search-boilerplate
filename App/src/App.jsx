import React, { useState, useEffect } from 'react';
import './App.css';
import Resources from './resources/countryData.json';

function App() {
// Progression 1
  const [place, setPlace] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [escapePressed, setEscapePressed] = useState(false);

  const findPlace = (e) => {
    let value = e.target.value;
    setPlace(value);

    let suggestion = Resources.filter((resource) =>
      resource.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(suggestion);
  };

  const displayList = () => {
    return suggestions.map((suggestion, index) => (
      <div key={index}>{suggestion.name}</div>
    ));
  };

// Progression 2
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setPlace('');
        setSuggestions([]); 
        setEscapePressed(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  useEffect(() => {
    if (escapePressed) {
      console.log("Escape pressed");
      setEscapePressed(false);
    }
  }, [escapePressed]);

  return (
    <div>
      <input
        type="text"
        id="text"
        onChange={findPlace}
        placeholder="Enter country name"
      />
      <button id="btn">S E A R C H</button>
      {displayList()}
    </div>
  );
}

export default App;
