import { tutorialsPage } from './controller';

import { HOME_PAGE_ROUTE, TUTORIALS_PAGE_ROUTE, firstEndpointRoute } from '../shared/routes';

import renderApp from './render-app';

export default (app) => {
  app.get(HOME_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url));
  });

  app.get(TUTORIALS_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url));
  });

  app.get(firstEndpointRoute(), (req, res) => {
    res.json(tutorialsPage(req.params.num));
  });

  app.get('/500', () => {
    throw Error('Fake Internal Server Error');
  });

  app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url));
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
};
