import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private usersRepository: Repository<User>;

  constructor() {
    this.repository = getRepository(Game);
    this.usersRepository = getRepository(User)
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder('games')
      .where("games.title ilike :name", { name:`%${param}%` })
      .getMany()
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query('select count(*) from games');
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const teste = await this.usersRepository
      .createQueryBuilder('users')
      .innerJoinAndSelect('users.games', 'games', `games.id ='${id}'`).getMany()
      return teste
  }
}
