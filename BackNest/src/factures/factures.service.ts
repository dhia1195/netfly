/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Factures } from './factures.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offre } from 'src/offre/entities/offre.entity';

@Injectable()
export class FacturesService {
  constructor(
    @InjectModel(Factures.name) private factureModel: Model<Factures>,
    @InjectModel(Offre.name) private offreModel: Model<Offre>,
  ) {}

  async ajouterVente(
    customerOrSupplierId: string,
    salesOrPurchaseId: string,
    facture_date: Date,
    total_amount: number,
    real_total_amount: number,
    facture_type: string,
  ): Promise<Factures> {
    // Créer une nouvelle vente
    const createdVente = new this.factureModel({
      customerOrSupplierId,
      salesOrPurchaseId,
      facture_date,
      total_amount,
      facture_type,
      real_total_amount // Set real_total_amount initially to total_amount
    });
  
    // Vérifier si une offre existe pour les produits achetés
    // const offre = await this.offreModel.findOne({ produits }).exec();
  
    // // Si une offre existe et que le nombre de ventes correspond aux conditions de l'offre, appliquer la réduction
    // if (offre) {
    //   const nombreVentes = await this.factureModel.countDocuments({ customerOrSupplierId, produits }).exec();
    //   if (nombreVentes >= offre.condition) {
    //     const reduction = (offre.reduction / 100) * total_amount;
    //     createdVente.real_total_amount = total_amount - reduction;
    //   }
    // }
  
    // Enregistrer la vente dans la base de données
    return createdVente.save();
  }
  

  async getAllFactures(): Promise<Factures[]> {
    const allFactures = await this.factureModel.find().exec();
    return allFactures;
  }
  async deleteFactures(id: string): Promise<void> {
    await this.factureModel.findByIdAndDelete(id).exec();
  }

  async updateFactures(
    id: string,
    updateData: Partial<Factures>,
  ): Promise<Factures> {
    const updateFactures = await this.factureModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updateFactures) {
      // Handle the case where the sprint with the given ID was not found
      throw new Error('vente not found');
    }
    return updateFactures;
  }
  async getById(id: string): Promise<Factures> {
    return this.factureModel.findById(id).exec();
  }
}
