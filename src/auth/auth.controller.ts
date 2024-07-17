// auth.controller.ts
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log in' })
  @ApiBody({ type: LoginDto, description: 'User credentials for login' })
  @ApiResponse({ status: 200, description: 'Successfully logged in' })
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Register' })
  @ApiBody({
    type: CreateUserDto,
    description: 'User credentials for registration',
  })
  @ApiResponse({ status: 201, description: 'Successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
