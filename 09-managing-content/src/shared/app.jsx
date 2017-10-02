import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';

import { APP_NAME } from 'shared/config';
import Nav from 'shared/components/Navigation';

// Pages
import Home from 'shared/pages/Home';
import Tutorials from 'shared/pages/Tutorials';
import NotFoundPage from 'shared/pages/error/NotFound';

import Footer from 'shared/components/Footer';

// Routes
import { HOME_PAGE_ROUTE, tutorialsRoute } from 'shared/routes';

// global styles
import './styles/main.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
        <Nav />
        <Switch>
          <Route exact path={HOME_PAGE_ROUTE} render={() => <Home />} />
          <Route path={tutorialsRoute()} component={Tutorials} />
          <Route component={NotFoundPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
