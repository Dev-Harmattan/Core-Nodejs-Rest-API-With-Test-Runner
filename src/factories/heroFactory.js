import HeroRepository from '../repositories/heroRepository.js';
import HeroService from '../services/heroService.js';
const generateInstance = ({ filePath }) => {
  // here goes all the connections
  const heroRepository = new HeroRepository({ filePath });
  const heroService = new HeroService({ heroRepository });

  return heroService;
};

export { generateInstance };
