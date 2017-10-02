import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { HOME_PAGE_ROUTE, TUTORIALS_PAGE_ROUTE, NOT_FOUND_DEMO_PAGE_ROUTE } from 'shared/routes';

import styles from './style.scss';

class Navigation extends Component {
  render() {
    return (
      <nav className={styles.navigation}>
        <div className={styles.navigationLogo}>
          <img
            src="//www.xxxlutz.at/static/templates/xxxlutz.at/resources/images/logo-2d.png"
            alt="Logo of xxxlutz"
          />
        </div>
        <ul className={styles.navigationList}>
          {[
            { route: HOME_PAGE_ROUTE, label: 'Home' },
            { route: TUTORIALS_PAGE_ROUTE, label: 'Tutorials' },
            { route: NOT_FOUND_DEMO_PAGE_ROUTE, label: '404 Demo' },
          ].map(link => (
            <li key={link.route} className={styles.navigationListitem}>
              <NavLink
                className={styles.navigationHref}
                to={link.route}
                activeClassName={styles.navigationHrefActive}
                exact
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Navigation;
