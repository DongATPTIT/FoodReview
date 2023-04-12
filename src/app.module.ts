import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Images } from './core/entities/img/images.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './core/entities/comment/comment.entity';
import { Category } from './core/entities/category/category.entity';
import { Collections } from './core/entities/collection/collections.entity';
import { Notifications } from './core/entities/notification/notification.entity';
import { PostsDetail } from './core/entities/post/post_detail.entity';
import { Posts } from './core/entities/post/post.entity';
import { Permissions } from './core/entities/role/permissions.entity';
import { UserPermission } from './core/entities/user/user_permission.entity';
import { DeviceToken } from './core/entities/token/device_token.entity';
import { User } from './core/entities/user/user.entity';
import { UserLikePost } from './core/entities/user/user_like_post.entity';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './apps/account/controller/account.controller';
import { AuthModule } from './apps/auth/auth.module';
const modules=[AccountModule,AuthModule]
@Module({
  imports: [...modules,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Images,
        Category,
        Collections,
        Comments,
        Notifications,
        PostsDetail,
        Permissions,
        Posts,
        UserPermission, 
        User,
        DeviceToken,
        UserLikePost,
      ],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
