import { writeFile, readFile } from 'node:fs/promises';

export default class HeroRepository {
  constructor({ filePath }) {
    this.file = filePath;
  }

  async #currentFileContent() {
    return JSON.parse(await readFile(this.file));
  }

  async find() {
    return await this.#currentFileContent();
  }

  async create(data) {
    const currentFile = await this.#currentFileContent();
    currentFile.push(data);
    await writeFile(this.file, JSON.stringify(currentFile));
    return data.id;
  }
}
