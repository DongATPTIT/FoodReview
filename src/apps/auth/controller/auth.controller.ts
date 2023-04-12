import { Controller, Get,Request,Post,Body, UseGuards, Req, Res } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { Public } from "src/core/decorator/public-api.decorator";
import { LoginRequest } from "src/core/dto/auth/login.dto";
import { ApiTags } from "@nestjs/swagger";
import { RegisterRequest } from "src/core/dto/auth/register.dto";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";





@Controller("auth")
@ApiTags("Auth Controller")
export class AuthControler{

    constructor(private readonly authService:AuthService){}

    @Public()
    @Post("/login")
    async login(@Body() loginRequest:LoginRequest){
        return this.authService.login(loginRequest)
    }

    @Public()
    @Post("/register")
    async registerAccount(@Body() registerRequest:RegisterRequest){
        
        return await this.authService.register(registerRequest);
    }

    @Public()
    @Get("/google")
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}
  

    @Public()
    @Get('/google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
      const userInfoGoogle=req.user
      return await this.authService.googleLogin(userInfoGoogle);
    }

}