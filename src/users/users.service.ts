import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: UsersRepository,
    private readonly orm: MikroORM,
  ) {}

  @UseRequestContext()
  async create(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    await this.usersRepository.persistAndFlush(user);
    return user;
  }

  @UseRequestContext()
  async findOne(userId: string) {
    return await this.usersRepository.findOne({ id: userId });
  }

  @UseRequestContext()
  async createIfNotExists(dto: CreateUserDto) {
    let user = await this.usersRepository.findOne({ id: dto.id });

    if (!user) {
      user = this.usersRepository.create(dto);
      await this.usersRepository.persistAndFlush(user);
    }

    return user;
  }
}
