import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { LoginRequest } from './dto/login.dto';
import { User } from 'src/core/entities/user/user.entity';
import { AccountService } from '../account/service/account.service';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user:User = await this.accountService.findByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginRequest: LoginRequest) {
    const user:User=await this.validateUser(loginRequest.username,loginRequest.password);
    if(user===null)
        return "Username Or password is not correct";
    const payload = { username: user.username, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}