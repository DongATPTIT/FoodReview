import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/core/entities/user/user.entity';
import { AccountService } from '../../account/service/account.service';

import { GeneralException } from 'src/core/exception/exception';
import { LoginRequest } from 'src/core/dto/auth/login.dto';
import { RegisterRequest } from 'src/core/dto/auth/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user: User = await this.accountService.findByUsername(username);
        console.log(user);
        if (user && (await this.checkHashPassword(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginRequest: LoginRequest) {
        const user: User = await this.validateUser(
            loginRequest.username,
            loginRequest.password,
        );
        if (user === null)
            throw new GeneralException(
                'Username Or password is not correct',
                400,
            );
        const payload = {
            username: user.username,
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return {
            userId: user.id,
            username: user.username,
            role: user.role,
            accessToken: this.genToken(payload),
        };
    }

    async register(registerRequest: RegisterRequest) {
        const newUser: User = await this.accountService.createAccount(
            registerRequest,
        );
        newUser.password = null;
        return newUser;
    }
    async checkHashPassword(plainPassword: string, hashPassword: string) {
        return await bcrypt.compare(plainPassword, hashPassword);
    }
    async googleLogin(userInfoGoogle) {
        const user: User = await this.accountService.createAccountForGoogleUser(
            userInfoGoogle,
        );
        const payload = {
            username: user.username,
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return {
            userId: user.id,
            username: user.username,
            role: user.role,
            accessToken: this.genToken(payload),
        };
    }

    genToken(payload) {
        return this.jwtService.sign(payload);
    }
}
