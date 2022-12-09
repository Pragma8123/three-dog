import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/sqlite';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository extends EntityRepository<User> {}
