import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route patg="/comidas" component={} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
