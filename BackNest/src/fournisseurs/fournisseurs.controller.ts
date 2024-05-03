/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FournisseursService } from './fournisseurs.service';
import { Fournisseurs } from './fournisseurs.schema';
import { Types } from 'mongoose';

@Controller('fournisseurs')
export class FournisseursController { constructor(private readonly fournisseursService: FournisseursService) {}

@Post('ajouter')
async ajouterSprint(
    @Body('nom') nom: string,
    @Body('adresse') adresse: string,
    @Body('numero') numero: number,
    @Body('email') email: string,
    @Body('type') type: string,
   
) {
    const nouveauFournisseur = await this.fournisseursService.ajouterFournisseur(nom, adresse, numero, email, type);
    return { fournisseur: nouveauFournisseur };}

@Get('getall')
async getAllFounisserus(){
    const allFournisseurs = await this.fournisseursService.getAllFournisseurs();
    return {fournisseurs : allFournisseurs};
}    
@Patch('update/:id')
async updateFournisseur(@Param('id') id:string, @Body() updateData: Partial<Fournisseurs>){

    const updatedFournisseur = await this.fournisseursService.updateFournisseur(id,updateData);
    return{Fournisseurs : updatedFournisseur};
}

@Delete(':id')
  async deleteFournisseur(@Param('id') id: string) {
    await this.fournisseursService.deleteFournisseur(id);
    return { message: 'fournisseur deleted successfully' };
  }

@Get('getbyid/:id')
  async getFournisseurById(@Param('id') id: string) {
    return this.fournisseursService.getFournisseurById(id);
  }

}
