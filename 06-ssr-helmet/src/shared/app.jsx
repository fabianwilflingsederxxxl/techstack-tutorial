import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import { APP_NAME } from './config';
import Nav from './components/Navigation';

// Pages
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import NotFoundPage from './pages/error/NotFound';

// Routes
import { HOME_PAGE_ROUTE, TUTORIALS_PAGE_ROUTE } from './routes';

class App extends Component {
  render() {
    return (
      <div>
        <h1>{APP_NAME}</h1>
        <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
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
