import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Poke from './components/Poke';
import Berr from './components/Berries';
import Mach from './components/Machine';
import PokeList from './components/PokeList'
import BerryList from './components/BerryList';
import MachineList from './components/MachineList';
import Intro from './components/Intro';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
           <Router>
            <div>
                <Route exact path="/" component={Intro} />
                <Route exact path="/pokemon/:id" component={Poke} />
                <Route exact path="/berries/:id" component={Berr} />
                <Route exact path="/machines/:id" component={Mach} />
                <Route exact path="/pokemon/page/:page" component={PokeList} />
                <Route exact path="/berries/page/:page" component={BerryList} />
                <Route exact path="/machines/page/:page" component={MachineList} />
            </div>
            </Router>
        </header>
      </div>
    );
  }
}


function Header() {
  return (
    <ul>
      <li>
        <Link to="/pokemon/page/:page">PokeList</Link>
      </li>
      <li>
        <Link to="/berries/page/:page">BerryList</Link>
      </li>
      <li>
        <Link to="/machines/page/:page">MachineList</Link>
      </li>
    </ul>
  );
}

export default App;
