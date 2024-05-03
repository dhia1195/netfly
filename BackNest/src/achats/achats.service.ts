/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AchatDocument, Achats } from './achats.schema';
import mongoose, { Model } from 'mongoose';
import { Fournisseurs } from 'src/fournisseurs/fournisseurs.schema';




@Injectable()
export class AchatService {
    constructor(@InjectModel(Achats.name) private AchatModel: Model<AchatDocument>){}

    async ajouterAchat(article: string, quantity: number, prix_unitaire: number, date: Date, paiement: string,fournIds:mongoose.Types.ObjectId[]): Promise<Achats> {
        // Calculer le montant total
        const montant_total = quantity * prix_unitaire;
    
        // Créer un nouvel achat avec le montant total calculé
        const createdAchat = new this.AchatModel({
          article,
          quantity,
          prix_unitaire,
          montant_total,
          date,
          paiement,
          fournisseurs: fournIds,
        });
    
        // Sauvegarder et retourner l'achat créé
        return createdAchat.save();
      }
    
      async getAllAchats(): Promise<any> {
        const allAchats = await this.AchatModel.find().populate('fournisseurs').exec();
        return allAchats;
      }

      async updateAchat(id: string, updateData: Partial<Achats>): Promise<Achats> {
        // Vérifier si les données à mettre à jour incluent quantity ou prix_unitaire
        if (updateData.quantity !== undefined || updateData.prix_unitaire !== undefined) {
            // Récupérer l'achat existant pour obtenir les valeurs actuelles de quantity et prix_unitaire
            const existingAchat = await this.AchatModel.findById(id).exec();
    
            // Si l'achat n'existe pas, lancez une erreur
            if (!existingAchat) {
                throw new Error('Achat not found');
            }
    
            // Recalculer le montant total si la quantité ou le prix unitaire est modifié
            const newQuantity = updateData.quantity !== undefined ? updateData.quantity : existingAchat.quantity;
            const newPrixUnitaire = updateData.prix_unitaire !== undefined ? updateData.prix_unitaire : existingAchat.prix_unitaire;
            const montant_total = newQuantity * newPrixUnitaire;
    
            // Mettre à jour les données avec le nouveau montant total
            updateData.montant_total = montant_total;
        }
    
        // Mettre à jour l'achat avec les données mises à jour
        const updatedAchat = await this.AchatModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    
        // Si l'achat n'est pas trouvé, lancer une erreur
        if (!updatedAchat) {
            throw new Error('Achat not found');
        }
    
        return updatedAchat;
    }

    async deleteAchat(id: string): Promise<void> {
        await this.AchatModel.findByIdAndDelete(id).exec();
      }

    async getAchatById(id: string): Promise<Achats> {
        return this.AchatModel.findById(id).exec();
      }
      async searchAchats(query: string): Promise<Achats[]> {
        // Validate if the query is a valid number
        const numericQuery = parseFloat(query);
        if (isNaN(numericQuery)) {
          // If query is not a valid number, exclude numeric fields from search criteria
          const searchCriteria = {
            $or: [
              { article: { $regex: query, $options: 'i' } }, // Case-insensitive search for 'article'
               
              { paiement: { $regex: query, $options: 'i' } }, // Case-insensitive search for 'paiement'
              // You can add more string fields here
            ],
          };
      
          // Perform the search
          const searchResults = await this.AchatModel.find(searchCriteria).exec();
      
          return searchResults;
        } else {
          // If query is a valid number, include numeric fields in search criteria
          const searchCriteria = {
            $or: [
              { article: { $regex: query, $options: 'i' } }, // Case-insensitive search for 'article'
              { quantity: numericQuery }, // Equality search for 'quantity'
              { prix_unitaire: numericQuery }, // Equality search for 'prix_unitaire'
              { montant_total: numericQuery }, // Equality search for 'montant_total'
              
              { paiement: { $regex: query, $options: 'i' } }, // Case-insensitive search for 'paiement'
              // You can add more attributes here
            ],
          };
      
          // Perform the search
          const searchResults = await this.AchatModel.find(searchCriteria).exec();
      
          return searchResults;
        }
      }
    }
