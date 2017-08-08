import Helmet from 'react-helmet';
import React, { Component } from 'react';

class Tutorials extends Component {
  render() {
    return (
      <div>
        <Helmet
          title={'Tutorials'}
          meta={[{ name: 'description', content: 'Tutorial Page description' }]}
        />
        <p>Tutorial List here</p>
      </div>
    );
  }
}

export default Tutorials;
