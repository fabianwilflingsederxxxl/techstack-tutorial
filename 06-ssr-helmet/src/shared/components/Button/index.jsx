import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
      <button type="button" onClick={this.props.onButtonClick}>
        {this.props.text}
      </button>
    );
  }
}

Button.defaultProps = {
  text: 'Hello',
  onButtonClick: function defaultHandler() {},
};

// type checking for component properties
Button.propTypes = {
  text: PropTypes.string,
  onButtonClick: PropTypes.func,
};

export default Button;
