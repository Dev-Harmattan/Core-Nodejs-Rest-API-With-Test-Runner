export default class HeroService {
  constructor({ heroRepository }) {
    this.heroRepository = heroRepository;
  }

  async find() {
    return await this.heroRepository.find();
  }

  async create(data) {
    return await this.heroRepository.create(data);
  }
}
