/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Fournisseurs, FournisseursDocument } from './fournisseurs.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Injectable()
export class FournisseursService {
    constructor(@InjectModel(Fournisseurs.name) private FournisseursModel: Model<FournisseursDocument>){}


async ajouterFournisseur(nom: string, adresse: string, numero: number,email:string,type:string): Promise<Fournisseurs> {
        const createdFournisseurs = new this.FournisseursModel({
            nom,
            adresse,
            numero,
            email,
            type,
        });
    
        return createdFournisseurs.save();
    }
async getAllFournisseurs(): Promise<Fournisseurs[]> {
        const allFournisseurs = await this.FournisseursModel.find().exec();
        return allFournisseurs;
      }

async updateFournisseur(id: string, updateData: Partial<Fournisseurs>): Promise<Fournisseurs> {
        const updatedFournisseur = await this.FournisseursModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updatedFournisseur) {
          // Handle the case where the sprint with the given ID was not found
          throw new Error('fournisseur not found');
        }
        return updatedFournisseur;
      }

async deleteFournisseur(id: string): Promise<void> {
        await this.FournisseursModel.findByIdAndDelete(id).exec();
      }

async getFournisseurById(id: string): Promise<Fournisseurs> {
        return this.FournisseursModel.findById(id).exec();
      }
}
