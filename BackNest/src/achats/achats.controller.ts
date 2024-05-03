/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AchatService } from './achats.service';
import { Achats } from './achats.schema';
import { Fournisseurs } from 'src/fournisseurs/fournisseurs.schema';
import { FournisseursService } from 'src/fournisseurs/fournisseurs.service';
import mongoose from 'mongoose';

@Controller('achats')
export class AchatsController { constructor(private readonly AchatService: AchatService) {}
@Post('ajouter')
async ajouterSprint(
    @Body('article') article: string,
    @Body('quantity') quantity: number,
    @Body('prix_unitaire') prix_unitaire: number,
    @Body('date') date: Date,
    @Body('paiement') paiement:string,
    @Body('fournIds') fournIds: mongoose.Types.ObjectId[], 
    
   
) {
    const nouveauAchat = await this.AchatService.ajouterAchat(article, quantity, prix_unitaire, date, paiement, fournIds);
    return { achat: nouveauAchat };

}


@Get('getall')
async getAllAchats(){
    const allAchats = await this.AchatService.getAllAchats();
    return {achat : allAchats};
}    

@Patch('update/:id')
async updateAchat(@Param('id') id:string, @Body() updateData: Partial<Achats>){

    const updatedAchat = await this.AchatService.updateAchat(id,updateData);
    return{Achats : updatedAchat};
}

@Delete('delete/:id')
  async deleteAchat(@Param('id') id: string) {
    await this.AchatService.deleteAchat(id);
    return { message: 'achat deleted successfully' };
  }

@Get('getbyid/:id')
  async getAchatById(@Param('id') id: string) {
    return this.AchatService.getAchatById(id);
  }
  @Get('search')
  async searchAchats(@Query('query') query: string) {
    const searchResults = await this.AchatService.searchAchats(query);
    return { achats: searchResults };
  }


}