import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DiscordAuthGuard extends AuthGuard('discord') {
  private readonly logger = new Logger(DiscordAuthGuard.name);

  handleRequest(err: any, user: any, info: any) {
    if (err && err.name === 'TokenError') {
      this.logger.error(err);
      throw new BadRequestException(err.message);
    }

    return user;
  }
}
