import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserDto } from './users/dto/user.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: UserDto })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
