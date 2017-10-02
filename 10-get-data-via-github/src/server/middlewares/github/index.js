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
