/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Fournisseurs, FournisseursSchema } from './fournisseurs.schema';
import { FournisseursController } from './fournisseurs.controller';
import { FournisseursService } from './fournisseurs.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
      MongooseModule.forFeature([{ name: Fournisseurs.name, schema: FournisseursSchema}])
    ],
    controllers: [FournisseursController],
    providers: [FournisseursService]
  })
export class FournisseursModule {}
