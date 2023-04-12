import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordRequest {
    @ApiProperty({ example: 'trimai' })
    oldPassword: string;

    @ApiProperty({ example: 'trimai123' })
    newPasswrod: string;
}
