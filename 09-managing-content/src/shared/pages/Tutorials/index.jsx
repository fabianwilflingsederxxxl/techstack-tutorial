import Helmet from 'react-helmet';
import React, { Component } from 'react';

import Header from 'shared/components/Header';

class Tutorials extends Component {
  render() {
    return (
      <div>
        <Helmet
          title={'Tutorials'}
          meta={[{ name: 'description', content: 'Tutorial Page description' }]}
        />
        <Header text="Tutorials" />
        <p>Tutorial List here</p>
      </div>
    );
  }
}

export default Tutorials;
