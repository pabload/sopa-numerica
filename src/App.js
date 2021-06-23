import React from 'react';
import './App.css';
import Main from './components/main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Gamepage from './components/gamepage';
import Mutliplayersetup from './components/mutliplayersetup';
import Premultiplayerroom from './components/premultiplayerroom';
import Lobby from './components/lobby';
import Gamepagemultiplayer from './components/gamepagemultiplayer';
function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/multiplayersetup" component={Mutliplayersetup}/>
          <Route exact path="/preroom" component={Premultiplayerroom}/>
          <Route exact path="/lobby" component={Lobby}/>
          <Route exact path="/playmulti" component={Gamepagemultiplayer}/>
          <Route exact path="/play/:tipo" component={Gamepage}/>
        </Switch>
    </Router>
  );
}

export default App;
