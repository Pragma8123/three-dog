import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getRoot(@Res() res: Response): any {
    return res.send({
      version: process.env.npm_package_version,
    });
  }
}
