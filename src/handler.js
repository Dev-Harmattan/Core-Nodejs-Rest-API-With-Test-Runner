import { parse } from 'node:url';
import { DEFAULT_HEADER } from './util/util.js';

const allRoutes = {
  '/heros:get': async (req, res) => {
    res.write('GET');
    res.end();
  },
  default: (req, res, next) => {
    res.writeHead(404);
    res.end('Oppp! Not Found');
  },
};

function handlers(req, res) {
  const { url, method } = req;

  const { pathname } = parse(url, true);
  const key = `${pathname}:${method.toLowerCase()}`;
  const chosenRoute = allRoutes[key] || allRoutes.default;

  return Promise.resolve(chosenRoute(req, res)).catch(handleErrors(res));
}

function handleErrors(res) {
  return (err) => {
    console.log('Something went wrong:', err.stack || err);
    res.writeHead(500, DEFAULT_HEADER);
    res.end('Internal Server Error');
  };
}

export default handlers;
