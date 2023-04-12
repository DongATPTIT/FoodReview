import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerController } from './controller/mailer.controller';
import { MailService } from './service/mailer.service';
import { AccountModule } from '../account/account.module';
@Module({
  imports: [
    AccountModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          requireTLS: false,
          auth: {
            user: 'maivantri309@gmail.com',
            pass: 'lqwimgwyzrymhdbk',
          },
          service: 'gmail',
          secure: false, // STARTTLS
        },
      }),
    }),
  ],
  controllers: [MailerController],
  providers: [MailService],
})
export class MailModule {}
