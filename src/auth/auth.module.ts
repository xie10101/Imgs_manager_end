import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
