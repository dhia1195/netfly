/* eslint-disable prettier/prettier */
import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FournisseursDocument = Fournisseurs & Document;

export enum TypeF {
    service = 'service',
    produit = 'produit',
  }

@Schema()
export class Fournisseurs{
  

  @Prop({ required: true})
  nom: string;

  @Prop({ required: true})
  adresse: string;

  @Prop({ required: true})
  numero: number;

  @Prop({ required: true})
  email: string;

 
  @Prop({ type: String, enum: Object.values(TypeF) })
  type: TypeF;




  
}



export const FournisseursSchema = SchemaFactory.createForClass(Fournisseurs);//taati l acces ll les class lokhrin