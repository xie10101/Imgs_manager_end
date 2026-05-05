import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
// import { LocalAuthGuard } from './guard/local.guard';
// import { JwtAuthGuard } from './guard/jwt.guard';
import { localStrategyService } from './strategy/localStrategy.strategy';
@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '4h',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, localStrategyService],
  exports: [AuthService, localStrategyService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
