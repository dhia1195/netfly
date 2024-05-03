/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Clients } from './clients.schema';

@Controller('clients')
export class ClientsController {

    constructor(private readonly clientsService: ClientsService) {}

    @Post('ajouter')
    async ajouterClient(
        @Body('nom') nom: string,
        @Body('prenom') prenom: string,
        @Body('adresse') adresse: string,
        @Body('email') email: string,
        @Body('numrTel') numrTel: number,
        
    ) {
        const nouveauClients = await this.clientsService.ajouterClient(nom, prenom, adresse, email, numrTel);
        return { client: nouveauClients };
    }

    @Get('getall')
  async getAllCients() {
    const allClients = await this.clientsService.getAllClients();
    return { clients: allClients };
}

@Delete('delete/:id')
  async deleteClient(@Param('id') id: string) {
    await this.clientsService.deleteClient(id);
    return { message: 'client deleted successfully' };
  }


  @Patch('update/:id')
  async updateClient(@Param('id') id: string, @Body() updateData: Partial<Clients>) {
    const updatedClient = await this.clientsService.updateClients(id, updateData);
    return { Client: updatedClient };
  }

  @Get('getbyid/:id')
  async getClientById(@Param('id') id: string) {
    return this.clientsService.getClientsById(id);
    
  }

  @Get('search')
  async searchAchats(@Query('query') query: string) {
    const searchResults = await this.clientsService.searchClient(query);
    return { clients: searchResults };
  }

  @Post('sendEmail/:id')
async sendEmail(@Param('id') id: string) {
return this.clientsService.sendEmailFacture(id);
}


}
