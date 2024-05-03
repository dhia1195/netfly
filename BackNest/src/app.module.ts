/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ReclamationModule } from 'src/reclamation/reclamation.module';
import { OffreModule } from './offre/offre.module';
import { ProduitsModule } from './produits/produits.module';
import { FacturesModule } from './factures/factures.module';
import { AchatsModule } from './achats/achats.module';
import { VentesModule } from './ventes/ventes.module';
import { ClientsModule } from './clients/clients.module';
import { FournisseursModule } from './fournisseurs/fournisseurs.module';
import { MailerModule } from '@nestjs-modules/mailer';






@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://meddhiadinboudali:35g6Ujan3v9gmKH8@cluster0.uwxmwfu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UserModule,
    ReclamationModule,
    OffreModule,
    ProduitsModule,
    FacturesModule,
    AchatsModule,
    VentesModule,
    ClientsModule,
    FournisseursModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'aziz1.jellazi@gmail.com',
          pass: 'rrmg bcvp nfbi xiln',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
    
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
