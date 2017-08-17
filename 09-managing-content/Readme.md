# 09 - Managing Content

In this chapter we are going to implement a simple way to manage articles based on plain markdown files.

Download the [placeholder markdown file](https://pastebin.com/raw/K5fjJGkf) and **save** it as `public/documents/lorem.md`.

The public folder is defined in the `src/shared/server/index.js` as a public path and we will use it to store our documents. The styles we dont need in there anymore so **delete** the `css` Folder.

We use the package marked for Mark Down Rendering:

* **Run:** `yarn add marked`

**Create** a file `src/shared/pages/Article/index.jsx` containing:

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import main from '../../styles/main.scss';

import { readDocument, markupDocument } from '../helpers';

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
```

**Create** a file `src/shared/pages/helpers.js` containing the following functions.

```jsx
import marked from 'marked';

import { STATIC_PATH } from 'shared/config';

// eslint-disable-next-line import/prefer-default-export
export function readDocument(docname) {
  if (/[~.:/\\]/.test(docname)) {
    throw new Error('Illegal filename');
  }

  return fetch(`${STATIC_PATH}/documents/${docname}.md`, { method: 'GET' }).then((response) => {
    if (response.ok) {
      return response.text().then(result => ({ text: result, filename: `${docname}.md` }));
    }
    return { text: '', filename: `${docname}.md` };
  });
}
```

`readDocument` fetches the markdown document containing the requested article from the server.

**Add** to the `src/shared/pages/helpers.js` following render function:

```jsx

/* Find first heading of lowest depth */
function findHeading(tokens) {
  const headings = [];

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token.type === 'heading') {
      if (token.depth === 1) {
        return token.text;
      }
      if (!headings[token.depth]) {
        headings[token.depth] = token.text;
      }
    }
  }

  return headings.reverse().pop();
}

export function markupDocument(doc) {
  const tokens = marked.lexer(doc.text);

  const headingText = findHeading(tokens);
  const markup = marked.parser(tokens);
  const data = {
    title: headingText,
    html: markup,
    text: doc.text,
    filename: doc.filename,
  };

  return data;
}
```

`markupDocument` compiles the markdown document to html and agregates some metadata. It uses the `findHeading` function to find the title of the markdown document from the tokens produced by `marked.lexer`.

**Add** a route to `src/shared/routes.js`

```jsx
export const articleRoute = docname => `/article/${docname || ':docname'}`;
```

**Modify** `src/server/controller.js` to add an controller. For now the controller will just verify wether requested document is an allowed filename.

```jsx
// [...]
export const articlePage = (docname) => {
  // don't allow these characters: . : / \
  if (/[~.:/\\]/.test(docname)) {
    throw new Error('Illegal filename');
  }

  return {};
};
```

**Modify** `src/server/routing.js` to add an ExpressJS endpoint for the article page.

```jsx
import {
  HOME_PAGE_ROUTE,
  TUTORIALS_PAGE_ROUTE,
  firstEndpointRoute,
  articleRoute,
} from 'shared/routes';

import { homePage, tutorialsPage, articlePage } from './controller';

// [...]

  app.get(articleRoute(), (req, res) => {
    res.send(renderApp(req.url, articlePage()));
  });

// [...]
```

**Modify** `src/shared/app.jsx` to add the article page to the react router.

```jsx
// [...]
// Pages
import Article from 'shared/pages/Article';
// [...]
// Routes
import {
  HOME_PAGE_ROUTE,
  TUTORIALS_PAGE_ROUTE,
  articleRoute,
} from 'shared/routes';
// [...]
         <Switch>
            <Route exact path={HOME_PAGE_ROUTE} render={() => <Home />} />
            <Route path={TUTORIALS_PAGE_ROUTE} render={() => <Tutorials />} />
            <Route path={articleRoute()} component={Article} />
            <Route component={NotFoundPage} />
          </Switch>
// [...]
```

We pass `Article` as a component property to the route instead of passing a render function so that react router can pass us an object containing the request parameters.

The article page is now fully functional. Start the dev server and **visit** `http://localhost:8000/article/lorem` in your browser.

If you add other markdown files into the `public/documents/` folder, you can view them like this too.

## Add Article to Tutorials list

**Create** a file `src/shared/pages/Tutorials/components/Tutorial/index.jsx` containing:

```jsx
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
```

This component represents a panel containing the title of the article, a short teaser and a link to the article.

**Modify** `src/shared/pages/Tutorials/index.jsx`:

```jsx
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Header from 'shared/components/Header';
import main from '../../styles/main.scss';

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
```

Congratulations, you completed Page 9!

Dont forget to:

**Run:** `git add .`
and then
`git commit -m="Page 9"`

---
Next section: [10 - Get Data via Github](https://github.com/moonshiner-agency/LutzJsStackWalkthrough/blob/master/10-get-data-via-github/Readme.md)
Back to the [previous section](https://github.com/moonshiner-agency/LutzJsStackWalkthrough/blob/master/08-better-styles/Readme.md) or the [table of contents](https://github.com/moonshiner-agency/LutzJsStackWalkthrough/blob/master/Readme.md).
