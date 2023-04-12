import { Get,Controller, Request } from "@nestjs/common";
import { AccountService } from "../service/account.service";



@Controller("account")
export class AccountController{

    constructor(private readonly accountService: AccountService){}
    @Get("/profile")
    getMyProfile(@Request() request){
      const userDecode=request.user;
      return this.accountService.findByUsername(userDecode.username);
    }
}