import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant/jwt.constants';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthControler } from './auth.controller';
import { AccountModule } from '../account/account.module';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';



@Module({
  imports: [AccountModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10days' },
    }),
  ],
  controllers:[AuthControler],
  providers: [ AuthService,
               JwtStrategy,  
              {
                provide: APP_GUARD,
                useClass: JwtAuthGuard,
              },
            ],
  exports: [AuthService],
})
export class AuthModule {}