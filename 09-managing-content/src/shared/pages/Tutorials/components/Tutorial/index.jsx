import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { articleRoute } from 'shared/routes';

class Tutorial extends Component {
  render() {
    return (
      <article>
        <Link to={articleRoute(this.props.docname)}>
          <h2>
            {this.props.title}
          </h2>
        </Link>
        <p>
          {this.props.children}
        </p>
        <Link to={articleRoute(this.props.docname)}>Read more ...</Link>
      </article>
    );
  }
}

Tutorial.propTypes = {
  docname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.string,
};

Tutorial.defaultProps = {
  children: '',
};

export default Tutorial;
