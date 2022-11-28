import logo from './logo.svg';
import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Video from './components/Video';
import './App.css';

export const config = {
  endpoint: 'https://75b896c5-e2f9-43f3-b732-94909dcf8b5f.mock.pstmn.io/v1',
};

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/video/:id">
          <Video />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
