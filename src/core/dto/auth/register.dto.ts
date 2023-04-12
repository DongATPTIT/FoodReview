import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
    @ApiProperty({ example: 'maivantri309@gmail.com' })
    email: string;
    @ApiProperty({ example: 'trimai' })
    username: string;
    @ApiProperty()
    dob: Date;
    @ApiProperty({ example: 'trimai' })
    password: string;
    @ApiProperty({ example: '0867153008' })
    phonenumber: string;
    @ApiProperty({ example: 'Tri Mai' })
    name: string;
    @ApiProperty({ example: 1 })
    sex: number;
}
