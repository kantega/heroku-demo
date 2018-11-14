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
		    Nå er appen vår både på github og heroku :)
          </p>
	    <p> Automagisk deployment til heroku fra github </p>
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
