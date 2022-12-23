import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  constructor(
    id: string,
    email?: string,
    username?: string,
    discriminator?: string,
    accessToken?: string,
    refreshToken?: string,
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.discriminator = discriminator;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  @IsNotEmpty()
  readonly id: string;

  readonly email: string;

  readonly username: string;

  readonly discriminator: string;

  readonly accessToken: string;

  readonly refreshToken: string;
}
