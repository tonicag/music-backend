import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from 'src/auth/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}