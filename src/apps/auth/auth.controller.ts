import { Controller, Get,Request,Post,Body, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequest } from "./dto/login.dto";
import { Public } from "./decorator/public-api.decorator";




@Controller("auth")
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

}