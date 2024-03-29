import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DiscordAuthGuard } from './guards/discord.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(DiscordAuthGuard)
  @Get('discord/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
