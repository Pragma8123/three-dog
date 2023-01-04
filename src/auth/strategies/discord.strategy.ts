import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { AuthService } from '../auth.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('DISCORD_OAUTH_CLIENT_ID'),
      clientSecret: configService.get<string>('DISCORD_OAUTH_CLIENT_SECRET'),
      callbackURL:
        configService.get<string>('APP_URL') + '/api/auth/discord/login',
      scope: ['identify'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const user = await this.authService.validateUser(
      accessToken,
      refreshToken,
      profile,
    );
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
