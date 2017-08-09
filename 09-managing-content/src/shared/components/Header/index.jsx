import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <h1 className={styles.heading}>
          {this.props.text}
        </h1>
        <div className={styles.background} />
        <div className={styles.backgroundLayer} />
      </div>
    );
  }
}
Header.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Header;
