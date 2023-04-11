import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user/user.entity';
import { AccountService } from '../service/account.service';



@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AccountService],
    exports: [AccountService],
})
export class AccountModule {}