/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Produits } from 'src/produits/produits.schema';

@Schema()
export class Offre extends Document {
  @Prop()
  reduction: number;

  @Prop()
  condition: number;
  @Prop()
  name: string;
  @Prop()
  dateD: Date;

  @Prop()
  dateF: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produits' }] })
  produits: Produits[];
}

export const OffreSchema = SchemaFactory.createForClass(Offre);
