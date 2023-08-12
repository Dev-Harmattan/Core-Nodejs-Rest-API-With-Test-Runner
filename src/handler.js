import { parse } from 'node:url';
import { DEFAULT_HEADER } from './util/util.js';
import { routes } from './routes/heroRoute.js';
import { generateInstance } from './factories/heroFactory.js';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const _dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(_dirname, '../database', 'heroes.json');
const heroService = generateInstance({ filePath });

const heroRoutes = routes({ heroService });

const allRoutes = {
  ...heroRoutes,
  default: (req, res, next) => {
    res.writeHead(404);
    res.end('Oppp! Not Found');
  },
};

// Handler
function handlers(req, res) {
  const { url, method } = req;

  const { pathname } = parse(url, true);
  const key = `${pathname}:${method.toLowerCase()}`;
  const chosenRoute = allRoutes[key] || allRoutes.default;

  return Promise.resolve(chosenRoute(req, res)).catch(handleErrors(res));
}

//General Error Handlers
function handleErrors(res) {
  return (err) => {
    console.log('Something went wrong:', err.stack || err);
    res.writeHead(500, DEFAULT_HEADER);
    return res.end('Internal Server Error');
  };
}

export default handlers;
