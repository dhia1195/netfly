/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { Clients, ClientsSchema } from './clients.schema';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailfactureService } from './email/emailfacture.service';
import { VentesService } from 'src/ventes/ventes.service';
import { Ventes, VentesSchema } from 'src/ventes/ventes.schema';
import { ProduitsService } from 'src/produits/produits.service';
import { Produits, ProduitSchema } from 'src/produits/produits.schema';




@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Clients',
        schema: ClientsSchema,
      },
    ]),
    MongooseModule.forFeature([{ name: Ventes.name, schema: VentesSchema }]),
    MongooseModule.forFeature([{ name: Produits.name, schema: ProduitSchema }]),
    
  ],
  controllers: [ClientsController],
  providers: [ClientsService, EmailfactureService, VentesService,ProduitsService], 
})
export class ClientsModule {}
