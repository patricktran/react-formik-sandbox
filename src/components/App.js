import React, { Component } from 'react';
import './App.css';
import Reservation from './Reservation';
import Invitation from './Invitation';
import FormWithContext from './FormWithContext';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Reservation />*/}
        {/*<Invitation />*/}
        <FormWithContext />
      </div>
    );
  }
}

export default App;
