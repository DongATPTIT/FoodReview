
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';

import { User } from 'src/core/entities/user/user.entity';
import { GeneralException } from 'src/core/exception/exception';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterRequest } from 'src/core/dto/auth/register.dto';

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

    async createAccount(registerRequest:RegisterRequest):Promise<User>{
            const newUser:User = new User();
            const checkUsernameAndMailAndPhonenumber:User[]= await this.accountRepository.find(
                            {where:[
                                {username:registerRequest.username},
                                {email:registerRequest.email},
                                {phonenumber:registerRequest.phonenumber}
                            ]});
            if(checkUsernameAndMailAndPhonenumber.length>0){
                throw new GeneralException("Email or Username Or Phonenumber is existed in system",400);
            }                   
            newUser.username=registerRequest.username;
            newUser.password=await this.hashPassword(registerRequest.password);
            newUser.phonenumber=registerRequest.phonenumber;
            newUser.email=registerRequest.email;
            newUser.name=registerRequest.name;
            newUser.sex=registerRequest.sex;
            newUser.active=true;
            newUser.role=0;
            return await this.accountRepository.save(newUser);
    }
    

    async changePassword(userId:number,oldPassword:string,newPassword:string){
        const user:User =await this.findById(userId);
        const check: boolean=await this.checkHashPassword(oldPassword,user.password);
        if(!check)
            throw new GeneralException("Old Password is not correct",400);
        user.password =await this.hashPassword(newPassword);
        await this.accountRepository.save(user);
        return {success:true ,message:"Change password success"}
    }
    async hashPassword(plainPassword:string){
        const saltOrRounds = 10;
        return await bcrypt.hash(plainPassword, saltOrRounds);
    }
    
    async checkHashPassword(plainPassword:string,hashPassword:string){
        return await bcrypt.compare(plainPassword, hashPassword);
    }
}