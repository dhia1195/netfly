/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OffreService } from './offre.service';
import { OffreController } from './offre.controller';
import { OffreSchema } from './entities/offre.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from 'src/reclamation/email/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
    
        name: "offre",
        schema: OffreSchema
     }])
    ],
  providers: [OffreService, EmailService],
  controllers: [OffreController]
})
export class OffreModule {}
