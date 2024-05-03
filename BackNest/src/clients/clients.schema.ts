/* eslint-disable prettier/prettier */
import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClientsDocument = Clients & Document;


  

@Schema()
export class Clients{
  

  @Prop()
  nom: string;

  @Prop({ type: String })
  prenom: string;

  @Prop({ type: String })
  adresse: string;
  @Prop({ type: String })
  email: string;

  @Prop({ type: Number })
  numrTel: number;
}



export const ClientsSchema = SchemaFactory.createForClass(Clients);