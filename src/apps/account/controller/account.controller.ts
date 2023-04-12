import { Get,Controller, Request, Post, Body } from "@nestjs/common";
import { AccountService } from "../service/account.service";
import { ChangePasswordRequest } from "src/core/dto/account/change-password.dto";



@Controller("account")
export class AccountController{

    constructor(private readonly accountService: AccountService){}
    @Get("/profile")
    getMyProfile(@Request() request){
      const userDecode=request.user;
      return this.accountService.findByUsername(userDecode.username);
    }

    @Post("/change-password")
    changePassword(@Body() changePasswordRequest:ChangePasswordRequest,@Request() request){
          return this.accountService.changePassword(request.userId,changePasswordRequest.oldPassword,changePasswordRequest.newPasswrod);
    }
}