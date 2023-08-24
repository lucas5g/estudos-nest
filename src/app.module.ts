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

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl:60,
      limit: 10
    }),
    PlaceModule,
    ModalityModule,
    forwardRef(() =>  UserModule),
    forwardRef(() => AuthModule),
    FileModule,    
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
