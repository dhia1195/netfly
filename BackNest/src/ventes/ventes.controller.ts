/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { VentesService } from './ventes.service';
import { Ventes } from './ventes.schema';
import mongoose, { Date, Types } from 'mongoose';
import { ProduitsService } from 'src/produits/produits.service';
import { ClientsService } from 'src/clients/clients.service';


@Controller('ventes')
export class VentesController {


    constructor(private readonly ventesService: VentesService,
                private clientsService: ClientsService,
                private produitsService: ProduitsService) {}

@Post('ajouter')
async ajouterVente(
    @Body('produits') produits: { id_produit: string, quantite: number }[], // Array of objects containing product ID and joiture quantity
    @Body('dateV') dateV: Date,
    @Body('statut_paiement') statut_paiement: boolean,
    @Body('clients') clientIds: string, 
){
   
  
  
  
  // Check if the products exist and have sufficient quantity
  

  const nouveauVentes = await this.ventesService.ajouterVente(produits, dateV, statut_paiement, clientIds);
  return { vente: nouveauVentes };
    }
    @Get('getall')
    async getAllVentes() {
      const allVentes = await this.ventesService.getAllVentes();
      return { ventes: allVentes};
  }
  @Delete('delete/:id')
  async deleteVente(@Param('id') id: string) {
    await this.ventesService.deleteVente(id);
    return { message: 'vente deleted successfully' };
  }
  @Patch('update/:id')
  async updateVente(@Param('id') id: string, @Body() updateData: Partial<Ventes>) {
    const updatedVente = await this.ventesService.updateVente(id, updateData);
    return { Vente: updatedVente };
  }
  @Get('getbyid/:id')
  async getById(@Param('id') id: string) {
    return this.ventesService.getById(id);
  }
  @Get('client/:clientId')
  async getVentesByClientId(@Param('clientId') clientId: string) {
      try {
          const ventes = await this.ventesService.getVentesByClientId(clientId);
          return ventes;
      } catch (error) {
          return { success: false, message: error.message };
      }
  }
}