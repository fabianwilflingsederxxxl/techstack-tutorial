import React, { Component } from 'react';
import Helmet from 'react-helmet';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="Not Found"
          meta={[{ name: 'description', content: 'Not found Page description' }]}
        />
        <p>Page not found</p>
      </div>
    );
  }
}

export default NotFoundPage;
