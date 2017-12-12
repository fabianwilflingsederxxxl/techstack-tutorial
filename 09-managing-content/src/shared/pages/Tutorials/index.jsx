import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import main from '../../styles/main.scss';

import { readDocument, markupDocument } from '../helpers';

class Tutorials extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Tutorials',
      html: '',
    };
  }

  componentDidMount() {
    readDocument(this.props.match.params.docname)
      .then(markupDocument)
      .then(result => this.setState(result));
  }

  render() {
    return (
      <div>
        <Helmet
          title={this.state.title}
          meta={[
            { name: 'description', content: 'A page to 1say hello' },
            { property: 'og:title', content: this.state.title },
          ]}
        />
        <div className={main.container}>
          {/* eslint-disable react/no-danger */}
          <article dangerouslySetInnerHTML={{ __html: this.state.html }} />
          {/* eslint-enable react/no-danger */}
        </div>
      </div>
    );
  }
}

Tutorials.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ docname: PropTypes.string }) }).isRequired,
};

export default Tutorials;
