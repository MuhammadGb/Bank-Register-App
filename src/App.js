import React, { useState } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SimpleUserPage from './components/SimpleUserPage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [data, setData] = React.useState('');

  return (
    <div className="App">
      <Router>
          <Switch>
            <Route exact path="/">
              <Login userData={data}/>
            </Route>
            <Route path="/signup">
              <SignUp userData={data}/>
            </Route>
            <Route path={`/userpage:${data}`}>
              <SimpleUserPage/>
            </Route>
          </Switch>
      </Router>
      </div>
  );
}

export default App;
