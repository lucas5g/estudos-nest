import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaceModule } from './modules/place/place.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ModalityModule } from './modules/modality/modality.module';
import { FileModule } from './file/file.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    PrismaModule,
    ThrottlerModule.forRoot({
      ttl:60,
      limit: 10
    }),
    PlaceModule,
    ModalityModule,
    forwardRef(() =>  UserModule),
    forwardRef(() => AuthModule),
    MailerModule.forRoot({
      transport:{
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth:{
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      },
      defaults:{
        from:'"nest-modules" '
      },
      template:{
        dir: `${__dirname}/templates`,
        adapter: new PugAdapter(),
        options:{
          strict: true
        }
      }
    }),
    FileModule,
    CategoriesModule,
    VideosModule,    
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
