import { Get,Controller, Request, Post, Body } from "@nestjs/common";
import { AccountService } from "../service/account.service";
import { ChangePasswordRequest } from "src/core/dto/account/change-password.dto";
import { ApiTags } from "@nestjs/swagger";
import { User } from "src/core/entities/user/user.entity";


@ApiTags("Account Controller")
@Controller("account")
export class AccountController{

    constructor(private readonly accountService: AccountService){}
    @Get("/profile")
    async getMyProfile(@Request() request){
      const userDecode=request.user;
      const user:User= await this.accountService.findById(userDecode.userId);
      user.password=null
      return user;
    }

    @Post("/change-password")
    changePassword(@Body() changePasswordRequest:ChangePasswordRequest,@Request() request){
          return this.accountService.changePassword(request.userId,changePasswordRequest.oldPassword,changePasswordRequest.newPasswrod);
    }
}