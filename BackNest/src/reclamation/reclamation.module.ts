/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ReclamationService } from 'src/reclamation/reclamation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReclamationSchema } from 'src/reclamation/entities/reclamation.entity';
import { ReclamationController } from 'src/reclamation/reclamtion.controller';
import { EmailService } from './email/email.service';
@Module({
    imports: [
    MongooseModule.forFeature([
      {
        // eslint-disable-next-line prettier/prettier
        name: "reclamation",
        schema: ReclamationSchema
     }])
    ],
    controllers: [ReclamationController],
  providers: [ReclamationService, EmailService],
  })
  export class ReclamationModule {}
  