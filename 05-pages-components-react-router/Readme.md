# 05 - Pages, Components and React Router

In this chapter we are going to create different pages, fill them with first components, and make it possible to navigate between them.

## Pages

Architecture and Folder principles vary in Javascript applications. We will follow the Components Based Architecture as well as the Atomic Design principles.

A Page is a component that is referred by the React Router (will come further down) and usually contains state handling as well as the business logic of that particular page.

In this section we will have 3 pages:

- A Home page.
- A Tutorial page showing a text.
- A 404 "Not Found" page.

We start with the Home Page:

**Create** a `src/client/pages/Home/index.jsx` file containing:

```jsx
import React, { Component } from 'react';

class Home extends Component {
  render() {
    return <h1>Home</h1>;
  }
}

export default Home;
```

**Edit** the code to load the Home Page in `src/client/app.jsx`:

```jsx
import React from 'react';

import Home from './pages/Home';

const App = () => <Home />;

export default App;
```

* **Run:** Open 'localhost:8000' and check out the new Page.

In the next section we are going to add a component to our page. But first some general information:

## Handling Events

Handling events with React elements is very similar to handling events on DOM elements. There are some syntactic differences:

* React events are named using camelCase, rather than lowercase.
* With JSX you pass a function as the event handler, rather than a string.

For example, the HTML:

```html
<button onclick="createDevPortal()">
  Do the work already
</button>
```

is slightly different in React:

```jsx
<button onClick={createDevPortal}>
  Do the work already
</button>
```

### Component: Custom button

With this in mind we can build a custom button with handling via properties. The button will contain the text "Hello". An `onClick` event listener can be supplied via the onButtonClick property.

For type checking the props of the buttons properties we will use [PropTypes](https://facebook.github.io/react/docs/typechecking-with-proptypes.html).

* **Run** `yarn add prop-types`


**Create** a `src/client/components/Button/index.jsx` file containing:

```jsx
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
```

**Update** the Home Page Component and add the Button Component to the Page in `src/client/pages/Home/index.jsx`


```jsx
import React, { Component } from 'react';

import Button from '../../components/Button';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Button text="Good Morning" />
      </div>
    );
  }
}

export default Home;
```

This button is placed in components, meaning it will be a component that we use more frequently. When a component is only used on one component or page we will put the folder inside the component. But more on that later.

> The render() function of React Components always has to return a single Component, so we wrap the content into a div. In React 16 this is not necessary but we keep it compatible to React15!

Right now the parent component (Home) only gives the props text to the child (Button). The function, that gets triggered onclick is the default function defined in the Button Component. (Empty function)

Let's define a function in the parent component and start with some basic state handling in the Page component:

**Edit** ``src/client/pages/Home/index.jsx``

```jsx
import React, { Component } from 'react';

import Button from '../../components/Button';

class Home extends Component {
  constructor(props) {
    // we can use this.props in constructor by using super
    super(props);

    // we define the initial state here
    this.state = {
      buttonText: 'Good Morning',
    };

    // we bind 'this' to use 'this' in the clickhandler function (and we do to set the new state)
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler() {
    // eslint-disable-next-line no-console
    console.log('Button clicked');

    // get the current time
    const time = new Date();

    // set the state
    this.setState({
      buttonText: `Good Morning again at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
    });
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Button text={this.state.buttonText} onButtonClick={this.clickHandler} />
      </div>
    );
  }
}

export default Home;
```

Now you see a button on the Home Page, when you click it you see a message in the console - as well as the text of the button is changed to the current time.

## Asynchronous actions

When fetching data we are working with promises. To set the state after data was fetched will be crucial for our application.

We are now going to add a second button to our app, which will trigger an AJAX call to retrieve a message from the server. For the sake of demonstration, this call will also send some data, the hard-coded number `1234`.

### The server endpoint

**Create** a `src/shared/routes.js` file containing:

```jsx
// eslint-disable-next-line import/prefer-default-export
export const firstEndpointRoute = num => `/ajax/first/${num || ':num'}`;

```

Ignore the Warning for a moment. This function is a little helper to produce the following:

```jsx
firstEndpointRoute()     // -> '/ajax/hello/:num' (for Express)
firstEndpointRoute(1234) // -> '/ajax/hello/1234' (for the actual call)
```

**Add** the following in `src/server/index.js`

```jsx
import { firstEndpointRoute } from '../shared/routes';

// [below app.get('/')...]

app.get(firstEndpointRoute(), (req, res) => {
  res.json({ serverMessage: `Hello from the server! (received ${req.params.num})` })
});
```

Open the url `http://localhost:8000/ajax/first/123` and you will see the json response.

### Fetch

> **[Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)** is a standardized JavaScript function to make asynchronous calls inspired by jQuery's AJAX methods.

We are going to use `fetch` to make calls to the server from the client. `fetch` is not supported by all browsers yet, so we are going to need a polyfill. `isomorphic-fetch` is a polyfill that makes it work cross-browsers and in Node too!

* **Run** `yarn add isomorphic-fetch`

Since we're using `eslint-plugin-compat`, we need to indicate that we are using a polyfill for `fetch` to not get warnings from using it.

**Insert** the following to your `.eslintrc.json` file:

```json
"settings": {
  "polyfills": ["fetch"]
}
```

## Fetch it in your component

To fetch and change the state asynchronously add a new function to your Home Component:
**Edit** ``src/client/pages/Home/index.jsx``

```jsx
import 'isomorphic-fetch';
import React, { Component } from 'react';

import { firstEndpointRoute } from '../../../shared/routes';

import Button from '../../components/Button';

class Home extends Component {
  constructor(props) {
    // we can use this.props in constructor by using super
    super(props);

    // we define the initial state here
    this.state = {
      buttonText: 'Good Morning',
      buttonTextAsync: 'Good Morning Server',
    };

    // we bind 'this' to use 'this' in the clickhandler function (and we do to set the new state)
    this.clickHandler = this.clickHandler.bind(this);
    this.clickHandlerAsync = this.clickHandlerAsync.bind(this);
  }
  clickHandler() {
    // eslint-disable-next-line no-console
    console.log('Button clicked');

    // get the current time
    const time = new Date();

    // set the state
    this.setState({
      buttonText: `Good Morning again at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
    });
  }
  clickHandlerAsync() {
    // eslint-disable-next-line no-console
    console.log('Async Button clicked');

    // we pipe the promise
    return fetch(firstEndpointRoute(123), {
      method: 'GET',
    })
      // when a response came back, give a json to the next step
      .then((res) => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      // check if this json (now js object) has a parameter serverMessage
      .then((data) => {
        if (!data.serverMessage) {
          throw Error('No message received');
        }
        // and set the state with that message
        this.setState({
          buttonTextAsync: data.serverMessage,
        });
      });
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Button text={this.state.buttonText} onButtonClick={this.clickHandler} />
        <Button text={this.state.buttonTextAsync} onButtonClick={this.clickHandlerAsync} />
      </div>
    );
  }
}

export default Home;
```

There are two buttons rendered on the Home Page, the first one behaves as defined before, the second Button fetches the data from the server and shows the result. We use the same Component for both functionalities but the onButtonClick Props Function is now asynchronous.

> In the network Tab of your console you see the request to the server Endpoint.

## React Router

> **[React Router](https://reacttraining.com/react-router/)** is a library to navigate between pages in your React app. It can be used on both the client and the server.

* **Run:** `yarn add react-router react-router-dom`

* **Edit** `.eslintrc.json`
```json
{
  "extends": "airbnb",
  "plugins": ["compat"],
  "rules": {
    "compat/compat": 2,
    "react/prefer-stateless-function": 0,
      "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"],
      "specialLink": ["to"]
    }]
  },
  "env": {
    "browser": true
  },
  "settings": {
    "polyfills": ["fetch"],
    "import/resolver": {
      "babel-module": {}
    }
  }
}

```

On the client side, we first need to wrap our app inside a `BrowserRouter` component.

**Update** your `src/client/index.jsx` like so:

```jsx
// [...]
import { BrowserRouter } from 'react-router-dom';
// [...]
const wrapApp = AppComponent => (
  <BrowserRouter>
    <AppContainer>
      <AppComponent />
    </AppContainer>
  </BrowserRouter>
);
```

## More Pages

**Create** a `src/client/pages/Tutorials/index.jsx` file containing:

```jsx
import React, { Component } from 'react';

class Tutorials extends Component {
  render() {
    return (
      <div>
        <p>Tutorial List here</p>
      </div>
    );
  }
}

export default Tutorials;
```

**Create** a `src/client/pages/error/NotFound/index.jsx` file containing:

```jsx
import React, { Component } from 'react';

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <p>Page not found</p>
      </div>
    );
  }
}

export default NotFoundPage;
```

## Navigation

Let's add some routes in the shared config file.

**Edit** your `src/shared/routes.js` like so:

```js
export const HOME_PAGE_ROUTE = '/';
export const TUTORIALS_PAGE_ROUTE = '/tutorials';
export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404';

export const firstEndpointRoute = num => `/ajax/first/${num || ':num'}`;
```

The `/404` route is just going to be used in a navigation link for the sake of demonstrating what happens when you click on a broken link.

**Create** a `src/client/components/Navigation/index.jsx` file containing:

```jsx
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HOME_PAGE_ROUTE,
  TUTORIALS_PAGE_ROUTE,
  NOT_FOUND_DEMO_PAGE_ROUTE,
} from '../../../shared/routes';

class Navigation extends Component {
  render() {
    return (
      <nav>
        <ul>
          {[
            { route: HOME_PAGE_ROUTE, label: 'Home' },
            { route: TUTORIALS_PAGE_ROUTE, label: 'Tutorials' },
            { route: NOT_FOUND_DEMO_PAGE_ROUTE, label: '404 Demo' },
          ].map(link =>
            (<li key={link.route}>
              <NavLink to={link.route} activeStyle={{ color: 'limegreen' }} exact>
                {link.label}
              </NavLink>
            </li>))}
        </ul>
      </nav>
    );
  }
}

export default Navigation;
```

Here we simply create a bunch of `NavLink`s that use the previously declared routes.

**Update** `src/client/app.jsx` finally like so:

```jsx
import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';

import { APP_NAME } from '../shared/config';
import Nav from './components/Navigation';

// Pages
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import NotFoundPage from './pages/error/NotFound';

// Routes
import { HOME_PAGE_ROUTE, TUTORIALS_PAGE_ROUTE } from '../shared/routes';

class App extends Component {
  render() {
    return (
      <div>
        <h1>{APP_NAME}</h1>
        <Nav />
        <Switch>
          <Route exact path={HOME_PAGE_ROUTE} render={() => <Home />} />
          <Route path={TUTORIALS_PAGE_ROUTE} render={() => <Tutorials />} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
```

* **Run:** `yarn start` and `yarn dev:wds`. Open `http://localhost:8000`, and click on the links to navigate between our different pages.

You'll see the URL changing dynamically. Switch between different pages and use the back button of your browser to see that the browsing history is working as expected.

Now, let's say you navigated to `http://localhost:8000/tutorials` this way. Hit the refresh button. You now get a 404 because our Express server only responds to `/`. As you navigated between pages, you were actually only doing it on the client-side (= in your browser). Let's add server-side rendering to the mix to get the expected behavior.

Congratulations, you completed Page 5! You created your first components that are rendering your content and already have some interactions.

Don't forget to:

**Run:** `git add .`
and then
`git commit -m="Page 5"`

---


Next section: [06 - Server-Side Rendering and Helmet](https://github.com/XXXLutz/techstack-tutorial/blob/master/06-ssr-helmet/Readme.md)

Back to the [previous section](https://github.com/XXXLutz/techstack-tutorial/blob/master/04-webpack-react-hmr/Readme.md) or the [table of contents](https://github.com/XXXLutz/techstack-tutorial/blob/master/Readme.md).
