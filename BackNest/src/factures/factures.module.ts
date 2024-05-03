/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FactureSchema, Factures } from './factures.schema';
import { FacturesController } from './factures.controller';
import { FacturesService } from './factures.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Offre, OffreSchema } from 'src/offre/entities/offre.entity';
import { OffreModule } from 'src/offre/offre.module';

@Module({
    imports: [
      MongooseModule.forFeature([
        {
          // eslint-disable-next-line prettier/prettier
          name: "factures",
          schema: FactureSchema,
        },
      ]),
      MongooseModule.forFeature([{ name: Factures.name, schema: FactureSchema}]),
      MongooseModule.forFeature([{ name: 'Offre', schema: OffreSchema }]), 

    ],
    controllers: [FacturesController],
    providers: [FacturesService],
  })
export class FacturesModule {}
