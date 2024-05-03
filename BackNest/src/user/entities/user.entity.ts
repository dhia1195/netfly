/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export const UserSchema = new mongoose.Schema({
     name: String,
     number:Number,
     birthD: Date,
     email: {type :String, unique: "true"},
     password: String,
     role: String,
     state: Boolean,
});
export interface User extends Document {
    name: string,
    number:number,
    birthD: Date,
    email: string,
    password: string,
    role: string,
    state: boolean,
}