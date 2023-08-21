import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaceModule } from './place/place.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ModalityModule } from './modality/modality.module';

@Module({
  imports: [
    PlaceModule,
    ModalityModule,
    forwardRef(() =>  UserModule),
    forwardRef(() => AuthModule),    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
