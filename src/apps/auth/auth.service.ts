import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginRequest } from './dto/login.dto';
import { User } from 'src/core/entities/user/user.entity';
import { AccountService } from '../account/service/account.service';
import { RegisterRequest } from './dto/register.dto';
import { GeneralException } from 'src/core/exception/exception';

@Injectable()
export class AuthService {
  
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user:User = await this.accountService.findByUsername(username);
    if (user && this.checkHashPassword(pass,user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginRequest: LoginRequest) {
    const user:User=await this.validateUser(loginRequest.username,loginRequest.password);
    if(user===null)
        throw new GeneralException("Username Or password is not correct",400) ;
    const payload = { username: user.username, sub: user.id,role:user.role};
    return {
      userId:user.id,
      username: user.username,
      accessToken: this.jwtService.sign(payload),
      role:user.role,

    };
  }

  async register(registerRequest: RegisterRequest) {
      const newUser:User = await this.accountService.createAccount(registerRequest);
      newUser.password=null;
      return newUser;
  }
  async checkHashPassword(plainPassword:string,hashPassword:string){
    return await bcrypt.compare(plainPassword, hashPassword);
}
}