
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService{

    constructor(
        @InjectRepository(User)
        private readonly accountRepository:Repository<User>)
        {}

    async findAll() :Promise<User[]>{
        return await this.accountRepository.find();
    }

    async findById(id:number) :Promise<User>{
        return await this.accountRepository.findOne({where:{id:id}});
    }

    async findByUsername(username:string) :Promise<User>{
        return await this.accountRepository.findOne({where:{username:username}});
    }
}