import { Module } from '@nestjs/common';
import { ModalityService } from './modality.service';
import { ModalityController } from './modality.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ModalityController],
  providers: [ModalityService],
})
export class ModalityModule {}
