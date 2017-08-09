import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Header from 'shared/components/Header';
import main from 'shared/styles/main.scss';

import Tutorial from './components/Tutorial';

class Tutorials extends Component {
  render() {
    return (
      <div>
        <Helmet
          title={'Tutorials'}
          meta={[{ name: 'description', content: 'Tutorial Page description' }]}
        />
        <Header text="Tutorials" />
        <div className={main.container}>
          <div>
            <Tutorial docname="lorem" title="Lorem ipsum dolor sit amet">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </Tutorial>
          </div>
        </div>
      </div>
    );
  }
}

export default Tutorials;
