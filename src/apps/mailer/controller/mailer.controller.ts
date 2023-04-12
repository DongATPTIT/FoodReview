import {
    Controller,
    Get,
    Request,
    Post,
    Body,
    UseGuards,
    Param,
} from '@nestjs/common';
import { MailService } from '../service/mailer.service';
import { Public } from 'src/core/decorator/public-api.decorator';
import { ApiTags } from '@nestjs/swagger';
@Controller('/mailer')
@ApiTags('Mail Controller')
export class MailerController {
    constructor(private readonly mailService: MailService) {}
    @Public()
    @Get('/forgotPassword/:gmail')
    async getPassword(@Param('gmail') gmail: string) {
        return await this.mailService.checkMail(gmail);
    }
}
