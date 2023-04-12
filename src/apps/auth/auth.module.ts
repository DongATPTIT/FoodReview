import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../core/constant/jwt.constants';
import { AuthService } from './service/auth.service';

import { AuthControler } from './controller/auth.controller';
import { AccountModule } from '../account/account.module';

import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/core/gaurds/jwt-auth.guard';
import { JwtStrategy } from 'src/core/strategy/jwt.strategy';
import { AllFilterException } from 'src/core/exception/filter.exception';
import { GoogleStrategy } from 'src/core/strategy/googleauth.strategy';

@Module({
    imports: [
        AccountModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10days' },
        }),
    ],
    controllers: [AuthControler],
    providers: [
        AuthService,
        JwtStrategy,
        GoogleStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        // {
        //   provide: APP_FILTER,
        //   useClass: AllFilterException,
        // },
    ],
    exports: [AuthService],
})
export class AuthModule {}
