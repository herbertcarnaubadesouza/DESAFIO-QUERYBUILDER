import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[] | undefined> {

    // Não sei se está certo
    // LINK: https://www.tutorialspoint.com/typeorm/typeorm_query_builder.htm
    return this.repository
      .createQueryBuilder("games")
      .where("games.title = :title", { title: param }).getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {

    //Não sei se está compilerOptions
    //LINK: https://www.webdevdrops.com/nodejs-banco-de-dados-orm-query-builder-driver-nativo/

    return this.repository.query('SELECT COUNT(*) FROM games');
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder()
      .select("users")
      .from(User, "users")
      .where("games.id = :id", { id: id }).getMany();
    // Complete usando query builder
  }
}
