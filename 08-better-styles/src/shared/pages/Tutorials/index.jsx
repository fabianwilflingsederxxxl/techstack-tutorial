import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Header from 'shared/components/Header';

import main from '../../styles/main.scss';

class Tutorials extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="Tutorials"
          meta={[{ name: 'description', content: 'Tutorial Page description' }]}
        />
        <Header text="Tutorials" />
        <div className={main.container}>
          <p>Tutorial List here</p>
        </div>
      </div>
    );
  }
}

export default Tutorials;
