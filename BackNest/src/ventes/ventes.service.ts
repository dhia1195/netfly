/* eslint-disable prettier/prettier */
import { Delete, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ventes, VentesDocument } from './ventes.schema';
import mongoose, { Date, Model } from 'mongoose';
import { Clients } from 'src/clients/clients.schema';




  @Injectable()
  export class VentesService {
  
  
  
      constructor(@InjectModel(Ventes.name) private venteModel: Model<VentesDocument>){}
  
      async ajouterVente(produits: any[], dateV: Date, statut_paiement: boolean, clients: string): Promise<Ventes> {
        console.log(produits)
        const createdVente = new this.venteModel({
            produits,
            dateV,
            statut_paiement,
            clients, 
        });
      
        return createdVente.save();
    }
  
      async getAllVentes(): Promise<Ventes[]> {
        const allVentes = await this.venteModel.find().populate('produits').populate('clients').exec();
        return allVentes;
        }
      async deleteVente(id: string): Promise<void> {
          await this.venteModel.findByIdAndDelete(id).exec();
        }
      
      async updateVente(id: string, updateData: Partial<Ventes>): Promise<Ventes> {
          const updatedVente = await this.venteModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
          if (!updatedVente) {
            // Handle the case where the sprint with the given ID was not found
            throw new Error('vente not found');
          }
          return updatedVente;
        }
        async getById(id: string): Promise<Ventes> {
          return this.venteModel.findById(id).exec();
        }
        async getVentesByClientId(clientId: string): Promise<Ventes[]> {
          const ventes = await this.venteModel.find({ clients: clientId }).populate('produits').exec();
          return ventes;
      }
       
  
  }