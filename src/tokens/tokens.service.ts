import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contacts/contact.entity';
import {
  ConnectionNotFoundError,
  createConnection,
  EntityTarget,
  getManager,
  Repository,
} from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
  ) {}

  async getCustomRepository(
    key: string,
    entity: EntityTarget<any>,
  ): Promise<Repository<any>> {
    const token: Token = await this.tokensRepository.findOne({
      where: { name: key },
    });
    if (!token) throw new HttpException('credentials not found', 404);
    try {
      const mg = getManager(key);
      return mg.getRepository(entity);
    } catch (error) {
      if (error instanceof ConnectionNotFoundError) {
        const conn = await createConnection({
          ...token,
          name: key,
          entities: [Contact],
        });
        return conn.getRepository(entity);
      } else {
        throw new HttpException(error, 401);
      }
    }
  }
}
