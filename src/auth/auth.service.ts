import { Injectable, Logger } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async validateUser(accessToken: string, refreshToken: string, profile: any) {
    const { id, email, username, discriminator } = profile;

    return await this.usersService.createIfNotExists({
      id,
      email,
      username,
      discriminator,
      accessToken,
      refreshToken,
    });
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
