/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Ventes, VentesSchema } from './ventes.schema';
import { VentesService } from './ventes.service';
import { VentesController } from './ventes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProduitsService } from 'src/produits/produits.service';
import { ClientsService } from 'src/clients/clients.service';
import { ProduitsController } from 'src/produits/produits.controller';
import { ClientsController } from 'src/clients/clients.controller';
import { ProduitSchema, Produits } from 'src/produits/produits.schema';
import { Clients, ClientsSchema } from 'src/clients/clients.schema';
import { EmailfactureService } from 'src/clients/email/emailfacture.service';
@Module({
    imports: [
      MongooseModule.forFeature([
        {
          // eslint-disable-next-line prettier/prettier
          name: "vente",
          schema: VentesSchema,
        },
      ]),
      MongooseModule.forFeature([{ name: Ventes.name, schema: VentesSchema}]),
      MongooseModule.forFeature([{ name: Produits.name, schema: ProduitSchema}]),
      MongooseModule.forFeature([{ name: Clients.name, schema: ClientsSchema}])
    ],
    controllers: [VentesController, ProduitsController, ClientsController],
    providers: [VentesService, ProduitsService, ClientsService, EmailfactureService],
  })
  export class VentesModule {}
