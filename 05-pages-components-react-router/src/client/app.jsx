import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import { APP_NAME } from '../shared/config';
import Nav from './components/Navigation';

// Pages
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import NotFoundPage from './pages/error/NotFound';

// Routes
import { HOME_PAGE_ROUTE, TUTORIALS_PAGE_ROUTE } from '../shared/routes';

class App extends Component {
  render() {
    return (
      <div>
        <h1>{APP_NAME}</h1>
        <Nav />
        <Switch>
          <Route exact path={HOME_PAGE_ROUTE} render={() => <Home />} />
          <Route path={TUTORIALS_PAGE_ROUTE} render={() => <Tutorials />} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
