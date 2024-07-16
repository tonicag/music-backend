import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log in' })
  @ApiBody({ type: LoginDto, description: 'User credentials for login' })
  @ApiResponse({ status: 200, description: 'Successfully logged in' })
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
