import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user/user.entity';
import { GeneralException } from 'src/core/exception/exception';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterRequest } from 'src/core/dto/auth/register.dto';
import { EntityManager } from "typeorm";

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(User)
        private readonly accountRepository: Repository<User>,
        private readonly enTityManager: EntityManager,
    ) { }

    async findAll(): Promise<User[]> {
        return await this.accountRepository.find();
    }

    async findById(id: number): Promise<User> {
        return await this.accountRepository.findOne({ where: { id: id } });
    }

    async findByUsername(username: string): Promise<User> {
        return await this.accountRepository.findOne({
            where: { username: username },
        });
    }

    async createAccount(registerRequest: RegisterRequest): Promise<User> {
        const newUser: User = new User();
        const checkUsernameAndMailAndPhonenumber: User[] =
            await this.accountRepository.find({
                where: [
                    { username: registerRequest.username },
                    { email: registerRequest.email },
                    { phonenumber: registerRequest.phonenumber },
                ],
            });
        if (checkUsernameAndMailAndPhonenumber.length > 0) {
            throw new GeneralException(
                'Email or Username Or Phonenumber is existed in system',
                400,
            );
        }
        newUser.username = registerRequest.username;
        newUser.password = await this.hashPassword(registerRequest.password);
        newUser.phonenumber = registerRequest.phonenumber;
        newUser.dob = registerRequest.dob;
        newUser.email = registerRequest.email;
        newUser.name = registerRequest.name;
        newUser.sex = registerRequest.sex;
        newUser.active = true;
        newUser.role = 0;
        return await this.accountRepository.save(newUser);
    }

    async changePassword(
        userId: number,
        oldPassword: string,
        newPassword: string,
    ) {
        const user: User = await this.findById(userId);
        const check: boolean = await this.checkHashPassword(
            oldPassword,
            user.password,
        );
        if (!check)
            throw new GeneralException('Old Password is not correct', 400);
        user.password = await this.hashPassword(newPassword);
        await this.accountRepository.save(user);
        return { success: true, message: 'Change password success' };
    }
    async hashPassword(plainPassword: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(plainPassword, saltOrRounds);
    }

    async checkHashPassword(plainPassword: string, hashPassword: string) {
        return await bcrypt.compare(plainPassword, hashPassword);
    }

    async createAccountForGoogleUser(user) {
        const existedUser = await this.accountRepository.findOne({
            where: { email: user.email },
        });
        if (existedUser) return existedUser;
        const newUser = new User();
        newUser.active = true;

        newUser.name = user.firstName;
        newUser.email = user.email;
        newUser.username = user.email;
        newUser.password = '0';
        newUser.role = 0;
        return await this.accountRepository.save(newUser);
    }
    async checkGmail(gmail: string) {
        return await this.accountRepository.findOne({
            where: { email: gmail },
        });
    }
    async updatePassword(password: string, gmail: string) {
        const userId = (await this.checkGmail(gmail)).id;
        return this.accountRepository.update(userId, {
            password: await this.hashPassword(password),
        });
    }
    async deleteUserbyID(userId: number) {
        const query = `delete from user where id= ${userId}`;
        const result = await this.enTityManager.query(query);
        return result;
    }
}
