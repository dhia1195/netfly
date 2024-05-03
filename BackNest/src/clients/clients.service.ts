/* eslint-disable prettier/prettier */
import { Delete, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Clients, ClientsDocument } from './clients.schema';
import { Model } from 'mongoose';
import { VentesService } from 'src/ventes/ventes.service';
import { EmailfactureService } from './email/emailfacture.service';
import { Produits } from 'src/produits/produits.schema';
import { ProduitsService } from 'src/produits/produits.service';

@Injectable()
export class ClientsService {

  

  
  constructor(
    @InjectModel(Clients.name) private clientModel: Model<ClientsDocument>,
    private emailService: EmailfactureService, 
    private venteService: VentesService,
    private produitService: ProduitsService,
  ) {}
 

    async ajouterClient(nom: string, prenom: string, adresse: string, email: string, numrTel: number): Promise<Clients> {
        const createdClient = new this.clientModel({
            nom,
            prenom,
            adresse,
            email,
            numrTel,
        });
        
    
        const savedClient = await createdClient.save();
       

        
        //  await this.emailService.sendEmail(
        //      email, 
        //      'New Client Added', 
        //      'A new client has been added.', 
        //  );

        return savedClient;
    }

    async getAllClients(): Promise<Clients[]> {
        const allClients = await this.clientModel.find().exec();
        return allClients;
      }

      async deleteClient(id: string): Promise<void> {
        await this.clientModel.findByIdAndDelete(id).exec();
      }

      async updateClients(id: string, updateData: Partial<Clients>): Promise<Clients> {
        const updatedClient = await this.clientModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updatedClient) {
          // Handle the case where the client with the given ID was not found
          throw new Error('client not found');
        }
        return updatedClient;
      }

      async getClientsById(id: string): Promise<any> {
        return this.clientModel.findById(id).exec();
       
      }
      async sendEmailFacture(id:string):Promise<any>
      {
        try {
          const clientData = await this.clientModel.findById(id); 
          if (!clientData) {
            
            throw new Error('Facture not found');
        }
        //get the vente by id clicnt 
        const ventes = await this.venteService.getVentesByClientId(clientData._id);

    
        
        const emailSubject = 'Facture Details';
        
        const emailRecipient = clientData.email; // Assuming email is stored in the facture data
        
        console.log("email data ",clientData)
        const emailData = {
          client: clientData,
          ventes: ventes,
          produits: await Promise.all(ventes.map(async (v) => {
            const podN = await Promise.all(v.produits.map(async (p) => {
              const pD = await this.produitService.getProduitById(p.id_produit);
              p.prod = pD;
              console.log("z", p);
              return p;
            }));
            console.log("h", podN);
            return podN;
          }))
        };
        
      console.log("datae",emailData.produits)
       
    
        // Send email with the facture data
        await this.emailService.sendMailWithTemplate(emailRecipient, emailSubject, emailData);
    
        
    } catch (error) {
        // Handle errors
        throw new Error(`Failed to send email: ${error.message}`);
    }
      }
      
      async searchClient(query: string): Promise<Clients[]> {
        // Validate if the query is a valid number
        const numericQuery = parseFloat(query);
        if (isNaN(numericQuery)) {
          // If query is not a valid number, exclude numeric fields from search criteria
          const searchCriteria = {
            $or: [
              { nom: { $regex: query, $options: 'i' } }, // Case-insensitive search for 'article'
               
              { prenom: { $regex: query, $options: 'i' } }, // Case-insensitive search for 'paiement'
              // You can add more string fields here
            ],
          };
      
          // Perform the search
          const searchResults = await this.clientModel.find(searchCriteria).exec();
      
          return searchResults;
        } else {
          // If query is a valid number, include numeric fields in search criteria
          const searchCriteria = {
            $or: [
              { nom: { $regex: query, $options: 'i' } }, // Case-insensitive search for 'article'
              { prenom: { $regex: query, $options: 'i' }}, // Equality search for 'quantity'
              { adresse: { $regex: query, $options: 'i' } }, // Equality search for 'prix_unitaire'
              { email: { $regex: query, $options: 'i' } }, // Equality search for 'montant_total'
              
              { numrTel: numericQuery }, // Case-insensitive search for 'paiement'
              // You can add more attributes here
            ],
          };
      
          // Perform the search
          const searchResults = await this.clientModel.find(searchCriteria).exec();
      
          return searchResults;
        }
      }

    
}
