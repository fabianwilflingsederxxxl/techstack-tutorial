import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Header from 'shared/components/Header';
import main from '../../../styles/main.scss';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="Not Found"
          meta={[{ name: 'description', content: 'Not found Page description' }]}
        />
        <Header text="Not Found" />
        <div className={main.container}>
          <p>Page not found</p>
        </div>
      </div>
    );
  }
}

export default NotFoundPage;
