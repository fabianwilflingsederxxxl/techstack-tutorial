# Add a new data source

In this chapter we will add a new data source to our application. In this
tutorial we will add the content of this repository as content for the developer portal.

## Create a new middleware

The Middleware is in General a Proxy, that allows us to Request our own Server (NodeJS Application) which then sends a seperate Request to the defined location. This solves plenty Cross Domain Troubles and also allows us to add Header Information or manipulate the data that comes back on the server.

This is something, that only happens on the Server, therefor we will place it in the Server folder.

* **Create** a file named `src/server/middlewares/github/index.js`

```js
const cache = {};
const linkRoute = 'tutorials';

const repoUrl = 'https://raw.githubusercontent.com/XXXLutz/techstack-tutorial/master';

function replaceUrls(text, serverUrl) {
  return text.replace(
    /https:\/\/github.com\/XXXLutz\/techstack-tutorial\/blob\/master/g,
    serverUrl || `http://localhost:8000/${linkRoute}`,
  );
}

const repoProxyMiddleware = (req, res, next) => {
  const url = `${repoUrl}${req.originalUrl.replace('/repo', '')}`;

  if (!url.toLowerCase().endsWith('md') && !url.toLowerCase().endsWith('markdown')) {
    throw new Error('Filetype not allowed.');
  }

  let dataSource;

  if (!Object.prototype.hasOwnProperty.call(cache, url)) {
    dataSource = fetch(url)
      .then(response => response.text())
      .then(text => replaceUrls(text, `http://${req.headers.host}/${linkRoute}`))
      .then((text) => {
        cache[url] = text;
        return text;
      });
  } else {
    dataSource = new Promise(resolve => resolve(cache[url]));
  }

  res.header('Content-Type', 'text/plain');

  return dataSource.then(text => res.send(text)).catch(next);
};

export default repoProxyMiddleware;
```

* Add the middleware to routing by modifying `src/server/routing.js`:

```js
// [...]
import githubRepoProxy from './middlewares/github';
// [...]
  app.use('/repo', githubRepoProxy);
// [...]
```

When you now visit http://localhost:8000/repo/Readme.md it will return the content of the first Page of this repo! This Endpoint we will use for the Content of the Tutorial Page.

First we have to change how the helper files behaves, **edit** 'src/shared/pages/helpers':

```jsx
import marked from 'marked';

export function readDocument(docname) {
  return fetch(docname, { method: 'GET' }).then((response) => {
    if (response.ok) {
      return response.text().then(result => ({ text: result, filename: `${docname}.md` }));
    }
    return { text: '', filename: `${docname}.md` };
  });
}
// [...]
```

We are now fetching the contents directly and just use the docname as full route. The rest stays the same because we treat the markdown the same as before.

Now do some changes on the Tutorial pages `componentDidMount` function:

```jsx
  componentDidMount() {
    let url = '';
    if (this.props.match.params.docname !== 'Readme.md') {
      url = `/repo/${this.props.match.params.docname}/Readme.md`;
    } else {
      url = '/repo/Readme.md';
    }
    readDocument(url)
      .then(markupDocument)
      .then(result => this.setState(result));
  }
```

To have the Linking right we also Change the 'lorem' route in `src/shared/components/Navigation/index.jsx` to Readme.md:

```jsx
//[...]
{ route: tutorialsRoute('Readme.md'), label: 'Tutorials' },
//[...]
```

If we request the tutorials page root path we request the first Readme page, otherwise do normal linking! The linking on that github content is done via < a > Links so we always request the page fully, but you now have the full Tutorial you just played through right on your platform.

To finish up the process delete the documents folder in public and test your application!

Thank you for playing it through, please feel free to add a pull request or open an issue if you have any questions! We might add another chapter about testing in the future.

You now deserve a coffee, well done!

---

Back to the [previous section](https://github.com/XXXLutz/techstack-tutorial/blob/master/09-managing-content/Readme.md) or the [table of contents](https://github.com/XXXLutz/techstack-tutorial/blob/master/Readme.md).
