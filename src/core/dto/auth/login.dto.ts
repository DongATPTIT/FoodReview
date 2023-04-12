import { ApiProperty } from "@nestjs/swagger";

export class LoginRequest{

    @ApiProperty({name:"username",example:"trimai",})
    username:string;
    
    @ApiProperty({name:"password",example:"trimai",})
    password:string
}