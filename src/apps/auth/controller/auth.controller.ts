import { Controller, Get,Request,Post,Body, UseGuards } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { Public } from "src/core/decorator/public-api.decorator";
import { LoginRequest } from "src/core/dto/login.dto";
import { RegisterRequest } from "src/core/dto/register.dto";
import { ApiTags } from "@nestjs/swagger";





@Controller("auth")
@ApiTags("Auth Controller")
export class AuthControler{

    constructor(private readonly authService:AuthService){}

    @Public()
    @Post("/login")
    async login(@Body() loginRequest:LoginRequest){
        return this.authService.login(loginRequest)
    }

    @Get("/profile/me")
    async profile(@Request() req){
        
        return req.user
    }

    @Public()
    @Post("/register")
    async registerAccount(@Body() registerRequest:RegisterRequest){
        
        return await this.authService.register(registerRequest);
    }

}