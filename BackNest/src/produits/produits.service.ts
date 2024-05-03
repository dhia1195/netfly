import { Injectable } from '@nestjs/common';
import { Produits, ProduitDocument } from './produits.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ProduitsService {
    constructor(@InjectModel(Produits.name) private ProduitsModel: Model<ProduitDocument>){}


async ajouterProduit(reference: string, nom: string, prix: number, quantite: number,categorie:string,offre:number,image:string): Promise<Produits> {
        const createdProduits = new this.ProduitsModel({
            reference,
            nom,
            prix,
            quantite,
            categorie,
            image,
            offre
        });
    
        return createdProduits.save();
    }
async getAllProduits(): Promise<Produits[]> {
        const allProduits = await this.ProduitsModel.find().exec();
        return allProduits;
      }

async updateProduit(id: string, updateData: Partial<Produits>): Promise<Produits> {
        const updatedProduit = await this.ProduitsModel.findByIdAndUpdate(id, updateData).exec();
        if (!updatedProduit) {
          // Handle the case where the sprint with the given ID was not found
          throw new Error('Produit not found');
        }
        return updatedProduit;
      }

async deleteProduit(id: string): Promise<void> {
        await this.ProduitsModel.findByIdAndDelete(id).exec();
      }

async getProduitById(id: string): Promise<Produits> {
        return this.ProduitsModel.findById(id).exec();
      }
}