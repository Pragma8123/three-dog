import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: UsersRepository,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    await this.usersRepository.persistAndFlush(user);
    return user;
  }

  async findOne(userId: string) {
    return await this.usersRepository.findOne({ id: userId });
  }
}
