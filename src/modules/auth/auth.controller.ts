import { Body, Request } from '@nestjs/common';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/decorators/roles.decorator';
import UserRole from '../user/enums/UserRole';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto.login, loginDto.password);
  }

  @Role(UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Role(UserRole.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('admin/profile')
  getAdminProfile(@Request() req) {
    return req.user;
  }
}
