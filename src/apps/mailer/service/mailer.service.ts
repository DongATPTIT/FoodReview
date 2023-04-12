import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AccountService } from '../../account/service/account.service';
import * as crypto from 'crypto';
import { GeneralException } from 'src/core/exception/exception';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private accountService: AccountService,
  ) {}

  public async sendPassword(gmail: string): Promise<boolean> {
    const newPassword = await this.generatePassword();
    console.log(newPassword);
    this.accountService.updatePassword(newPassword, gmail);
    return await this.mailerService.sendMail({
      to: gmail,
      from: process.env.MAIL_HOST,
      subject: process.env.MAIL_SUBJECT,
      text: newPassword,
    });
  }

  public async checkMail(gmail: string): Promise<any> {
    const check = await this.accountService.checkGmail(gmail);
    if (!check) throw new GeneralException('Email not exist in system', 404);
    return this.sendPassword(gmail);
  }

  private async generatePassword(length: number = 6): Promise<string> {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}:"?><|~><*/';
    const randomBytes = crypto.randomBytes(length);
    let password = '';
    while (password.length < length) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
  }
}
