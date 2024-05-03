/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Produits, ProduitSchema } from './produits.schema';
import { ProduitsService } from './produits.service';
import { ProduitsController } from './produits.controller';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [
      MongooseModule.forFeature([
        {
          // eslint-disable-next-line prettier/prettier
          name: "produit",
          schema: ProduitSchema,
        },
      ]),
      MongooseModule.forFeature([{ name: Produits.name, schema: ProduitSchema}])
    ],
    controllers: [ProduitsController],
    providers: [ProduitsService],
  })
  export class ProduitsModule {}