# 08 - Better Styles

Alright! It's time to give our ugly app a facelift.

There are a few things about our App that make it ugly and reduce the reusability of our code.


1. No CI Font - currently we're using "Verdana". We'll switch this out to match the Corporate Design Font "Roboto" of xxxl.digital
2. Content Styling
3. No Container Element - right now all Texts Elements such as the "p" tag in our `NotFound` component don't have a parent Element that allows them to be centered inside of a container.
4. Viewport Meta tag for responsive layouts
5. Header Component - Currently there's we only use the H1 Tag in the Homepage Component, missing a key Element for SEO (Search Engine Optimization) and a big part in getting users attention. For this we'll be using a custom Header component
6. Navigation - it's ugly and not usable on mobile screens
7. Footer
8. Button Styling


## Preview
Here's a quick preview of what the site will look after finishing this chapter

![](https://i.imgur.com/h4oVMZZ.png)

## CI Font

The change needed to include the CI font is minor, just add a link tag to load the "Roboto" font from Google webfonts.


**Edit** `src/server/render-app.jsx` in the render function like so:

```jsx
// [...]
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400" rel="stylesheet">
    </head>
// [...]
```

## Content Styling & Container Element


**Edit** `server/render-app.jsx`
```jsx
// [...]
${head.meta}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${stylesheet}
// [...]
```

This allows us to use media queries and responsive design in general

We're now adding the font-family in our css and create a container and row class that can get used by our react components.

**Replace** content of `shared/styles/_variables.scss`
```sass
$brand-primary: #ea003e;
$brand-secondary: #a8106b;
$brand-accent: #e20015;
$brand-highlight: #ec008c;
```

**Replace** content of `shared/styles/main.scss`

```sass
@import 'variables';

html,
body {
  height: 100%;
  width: 100%;
  margin: 0px;
  color: #252525;
  padding: 0px;
  font-family: 'Roboto', Helvetica, Arial;
}

h2 {
  text-align: center;
  letter-spacing: -0.5px;
  font-weight: 300;
  font-size: 30px;
  margin-top: 50px;
  font-weight: 300;
}

.container {
  width: 80%;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 14px;
}

.row {
  display: block;
}
```

## Header Component

The header component requires to get a "text" prop of type string passed that will get used for the H1 element of the page.

To make the header a bit prettier we're adding a background image of the team with a colored overlay

**Create** `shared/components/Header/index.jsx`
```jsx
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

```
In this part we'll use flexbox to vertically center the "heading" div of the `Header` component

> **[Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)** Flexbox makes it ease to create align items inside of a container. The idea behind the flex layout is to give the container the ability to alter its items' width/height (and order) to best fill the available space (mostly to accommodate to all kind of display devices and screen sizes). A flex container expands items to fill available free space, or shrinks them to prevent overflow.

**Create** `shared/components/Header/style.scss`

```sass
@import '~shared/styles/variables';
.header {
  height: 210px;

  display: flex;
  /* center items along the cross axis - vertically in our case */
  align-items: center;
  position: relative;
}

.heading {
  width: 100%;
  z-index: 99;
  font-weight: normal;
  color: #fff;
  text-align: center;
}

.background {
  background-image: url("http://xxxl.digital/wp-content/uploads/2016/10/PA123434.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 2;
  bottom: 0;
}

.backgroundLayer {
  background: #ea003e;
  background: linear-gradient(to bottom, #ea003e 0%, #a8106b 100%);
  opacity: 0.85;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 98;
  bottom: 0;
  left: 0;
}
```

Now we're ready to implement the new header and container element


**Modify** content of `shared/pages/Tutorials/index.jsx`
```jsx
// [...]

import Header from 'shared/components/Header';

// lets use use the classes specified in the global main.scss file
import main from '../../styles/main.scss';


  // [...]
  render() {
    return (
      <div>
        <Helmet
          title={'Tutorials'}
          meta={[{ name: 'description', content: 'Tutorial Page description' }]}
        />
        <Header text="Tutorials" />
        <div className={main.container}>
          <p>Tutorial List here</p>
        </div>
      </div>
    );
  }
  // [...]
```
<br>

**Modify** content of `shared/pages/error/NotFound/index.jsx`
```jsx
// [...]
import Header from 'shared/components/Header';
import main from '../../../styles/main.scss';

  // [...]
  render() {
    return (
      <div>
        <Helmet
          title={'Not Found'}
          meta={[{ name: 'description', content: 'Not found Page description' }]}
        />
        <Header text="Not Found" />
        <div className={main.container}>
          <p>Page not found</p>
        </div>
      </div>
    );
  }
  // [...]
```

Wrap the buttons in a row and add use the header component.

**Modify** content of `shared/pages/Home/index.jsx`
```jsx
// [...]
import Button from 'shared/components/Button';
import Header from 'shared/components/Header';

import main from '../../styles/main.scss';

  // [...]
  render() {
    return (
      <div>
        <Helmet title={'Home'} meta={[{ name: 'description', content: 'Home Page description' }]} />
        <Header text="Home"></Header>
        <div className={main.container}>
          <div className={main.row}>
            <Button text={this.state.buttonText} onButtonClick={this.clickHandler} />
            <Button text={this.state.buttonTextAsync} onButtonClick={this.clickHandlerAsync} />
          </div>
        </div>
      </div>
    );
  }
  // [...]
```

## Navigation

For our navigation we'll be adding the "xxxl digital" logo,  inlining the links and centering the list aswell as changing the active state color of the active page.


**Modify** content of `shared/components/Navigation/index.jsx`

```jsx
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import {
  HOME_PAGE_ROUTE,
  TUTORIALS_PAGE_ROUTE,
  NOT_FOUND_DEMO_PAGE_ROUTE,
} from 'shared/routes';

import styles from './style.scss';

class Navigation extends Component {
  render() {
    return (
      <nav className={styles.navigation}>
        <div className={styles.navigationLogo}>
          <strong>xxxl</strong>digital
        </div>
        <ul className={styles.navigationList}>
          {[
            { route: HOME_PAGE_ROUTE, label: 'Home' },
            { route: TUTORIALS_PAGE_ROUTE, label: 'Tutorials' },
            { route: NOT_FOUND_DEMO_PAGE_ROUTE, label: '404 Demo' },
          ].map(link =>
            (<li key={link.route} className={styles.navigationListitem}>
              <NavLink
                className={styles.navigationHref}
                to={link.route}
                activeClassName={styles.navigationHrefActive}
                exact
              >
                {link.label}
              </NavLink>
            </li>),
          )}
        </ul>
      </nav>
    );
  }
}

export default Navigation;
```

**Create** `shared/components/Navigation/style.scss`


```sass
@import '~shared/styles/variables';

.navigation {
  background-color: #fff;
  padding: 2px 10px;
  display: flex;
  /* display the navigation logo above the navigation list - aranges child items vertically */
  flex-direction: column;
}

.navigationLogo {
  font-weight: 300;
  font-size: 25px;
  color: $brand-primary;
  margin: auto;
  margin-top: 20px;
}

.navigationList {
  /* align child items in columns horizontally */
  display: flex;
  padding-left: 0;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 20px;
}

.navigationListitem {
  list-style-type: none;
}

.navigationHref {
  padding: 10px 10px;
  text-decoration: none;
  color: #181818;
  font-size: 16px;
}

.navigationHrefActive {
  color: $brand-primary;
}
```

## Footer

In our footer we'll display a short copyright notice, with the name of our app and the year

**Create** `shared/components/Footer/index.jsx`

```jsx
import React, { Component } from 'react';
import { APP_NAME } from 'shared/config';
import main from '../../styles/main.scss';
import styles from './style.scss';

class Footer extends Component {
  render() {
    return (
      <div className={main.footer}>
        <div className={styles.footer}>
          <p>
            © {APP_NAME} 2017
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
```
**Create** `shared/components/Footer/style.scss`

```css
.footer {
  text-align: center;
}
```

Include the footer on every page:

**Modify** content of `shared/app.jsx`

```jsx
    // [...]
    import Footer from 'shared/components/Footer';
    // [...]
    </Switch>
    <Footer />
    // [...]
```

## Button Styling

This will add some basic styling to our Button component, that fits into the CI

**Modify** content of `shared/components/Button/index.js`

```jsx
import styles from './style.scss';

class Button extends Component {
  render() {
    return (
      <button
        type="button"
        className={`${styles.button} ${styles.jumbo} ${styles.nectar}`}
        onClick={this.props.onButtonClick}
      >
        {this.props.text}
      </button>
    );
  }
}
```

**Delete** `shared/components/Button/style.css`
**Create** `shared/components/Button/style.scss`

```sass
@import '~shared/styles/variables';

.button {
  border: none;
  margin: 20px 20px;
  padding: 21px 40px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  border: 3px solid transparent;
  font-family: 'Roboto', Helvetica, Arial;

  border-image: linear-gradient(
    to bottom right,
    $brand-highlight 0,
    $brand-accent 100%
  );
  border-image-slice: 1;
  transition: all .2s ease;
  &:hover {
    transition: all .2s ease;
    background: transparent;
    color: $brand-primary;
  }
}

.jumbo {
  font-size: 18px;
  line-height: 20px;
  padding: 21px 40px;
}

.nectar {
  background: $brand-secondary;
  background: linear-gradient(
    to bottom right,
    $brand-highlight 0,
    $brand-accent 100%
  );
}

```

Now the site is ready for action.

* **Visit** localhost:8000

Congratulations, you completed Page 8!

Dont forget to:

**Run:** `git add .`
and then
`git commit -m="Page 8"`

---


Next section: [09 - Managing Content](https://github.com/moonshiner-agency/LutzJsStackWalkthrough/blob/master/09-managing-content/Readme.md)

Back to the [previous section](https://github.com/moonshiner-agency/LutzJsStackWalkthrough/blob/master/07-component-based-styling/Readme.md) or the [table of contents](https://github.com/moonshiner-agency/LutzJsStackWalkthrough/blob/master/Readme.md).
