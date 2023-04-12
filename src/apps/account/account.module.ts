import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user/user.entity';
import { AccountService } from './service/account.service';
import { AccountController } from './controller/account.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AccountController],
    providers: [AccountService],
    exports: [AccountService],
})
export class AccountModule {}
