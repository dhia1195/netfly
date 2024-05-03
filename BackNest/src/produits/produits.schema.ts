import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProduitDocument = Produits & Document;

export enum Categorie{
    service = 'service',
    produit = 'produit'
}


@Schema()
export class Produits{
  

  @Prop()
  reference: string;

  @Prop()
  nom: string;

  @Prop()
  prix: number;

  @Prop()
  quantite: number;

  @Prop()
  image: string;
  
  @Prop({ type: String, enum: Object.values(Categorie)})
  categorie: Categorie;

  @Prop()
  offre: number;

}



export const ProduitSchema = SchemaFactory.createForClass(Produits);