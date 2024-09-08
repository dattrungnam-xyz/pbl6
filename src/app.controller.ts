import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './decorator/role.decorator';
import { Role } from './type/role.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles(Role.ADMIN)
  getHello(): string {
    return this.appService.getHello();
  }
}
