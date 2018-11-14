import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
		    Her har vi nå gjort endringer på den lille appen vår
	    		La oss gjøre noen flere endringer, så vi får forskjell på dev og staging
          </p>
	    <p> Første endring </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            reactjs.org
          </a>
        </header>
      </div>
    );
  }
}

export default App;
