import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import main from 'shared/styles/main.scss';

import { readDocument, markupDocument } from './helpers';

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Article',
      text: '',
      html: '',
      filename: this.props.match.params.docname,
    };
  }

  componentWillMount() {
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
            { name: 'description', content: 'A page to say hello' },
            { property: 'og:title', content: this.state.title },
          ]}
        />
        <div className={main.container}>
          <article dangerouslySetInnerHTML={{ __html: this.state.html }} />
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ docname: PropTypes.string }) }).isRequired,
};

export default Article;
