/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { FacturesService } from './factures.service';
import { Factures } from './factures.schema';

@Controller('factures')
export class FacturesController {
     constructor(private readonly factureService: FacturesService) {}

     @Post('ajouter')
     async ajouterVente(
       @Body('customerOrSupplierId') customerOrSupplierId: string,
       @Body('salesOrPurchaseId') salesOrPurchaseId: string,
       @Body('facture_date') facture_date: Date,
       @Body('total_amount') total_amount: number,
       @Body('real_total_amount') real_total_amount: number,
       @Body('facture_type') facture_type: string
     ) {
       const nouvelleFacture = await this.factureService.ajouterVente(
         customerOrSupplierId,
         salesOrPurchaseId,
         facture_date,
         total_amount,
         real_total_amount,
         facture_type,
       );
       return { facture: nouvelleFacture };
     }
   
 
@Get('getall')
async getAllVentes(
) {
  try{
    const factures = await this.factureService.getAllFactures();
      return {factures : factures};
  }
     catch (error) {
      // Handle any errors that occur during the process
      console.error('Error fetching factures:', error);
      // Return an appropriate error response
      return { error: 'An error occurred while fetching factures' };
    }
}
@Delete('delete/:id')
async deleteFactures(@Param('id') id: string) {
await this.factureService.deleteFactures(id);
return { message: 'vente deleted successfully' };
}
@Patch('update/:id')
async updateFactures(@Param('id') id: string, @Body() updateData: Partial<Factures>) {
const updatedVente = await this.factureService.updateFactures(id, updateData);
return { Vente: updatedVente };
}
@Get('getbyid/:id')
async getById(@Param('id') id: string) {
return this.factureService.getById(id);
}
}