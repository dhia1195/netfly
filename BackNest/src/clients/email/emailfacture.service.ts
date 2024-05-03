/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as ejs from 'ejs';
import * as path from 'path';

@Injectable()
export class EmailfactureService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmail(to: string, subject: string, body: any) {
        try {
            await this.mailerService.sendMail({
                to,
                subject,
                html: body,
            });
            console.log("Email sent successfully");
        } catch (error) {
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }

    async sendMailWithTemplate(to: string, subject: string, data: any) {
        try {
            const currentDate = new Date();
            const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // Note: Month is zero-based, so January is 0
const year = currentDate.getFullYear();
const formattedDate = `${day}/${month}/${year}`;
let text=``;
let total=0;
for (const list of data.produits){
    console.log(list)
    for (let p of list) {

        let t=p.quantite*p.prod.prix
        total +=t
        text+=` <tr>
                 <td>${ p.prod.nom }</td>
                 <td>${ p.quantite }</td>
                 <td>${ p.prod.prix }</td>
                 <td>${ t }</td> 
        </tr>`


    }
}
// <tbody>
                    //     <tr *ngFor="let produit of produits">
                    //         <td>{{ produit.soldProduct.nom }}</td>
                    //         <td>{{ produit.quantity }}</td>
                    //         <td>${ produit.soldProduct.prix }</td>
                    //         <td>${ produit.total }</td> 
                    // </tbody>
            const htmlContent = `
            <html>
                <head>
                    <title>${subject}</title>
                </head>
                <body>
                <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
                <div class="flex items-center justify-between mb-8">
                    <div class="flex items-center">
                        <img class="h-8 w-8 mr-2" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                            alt="Logo" />
                        <div class="text-gray-700 font-semibold text-lg">Business Management</div>
                    </div>
                    <div class="text-gray-700">
                        <div class="font-bold text-xl mb-2">INVOICE</div>
                        <div class="text-sm">Date: ${formattedDate}</div>
                        <div class="text-sm">Invoice #: INV12345</div>
                    </div>
                </div>
                <div class="border-b-2 border-gray-300 pb-8 mb-8">
                    <h2 class="text-2xl font-bold mb-4">Bill To:</h2>
                    <div class="text-gray-700 mb-2">${data.client.prenom} ${data.client.nom}</div>
                    <div class="text-gray-700 mb-2">${data.client.adresse}</div>
                    <div class="text-gray-700 mb-2">${data.client.numrTel}</div>
                    <div class="text-gray-700">${data.client.email}}</div>
                </div>
                <table class="w-full text-left mb-8">
                    <thead>
                        <tr>
                            <th class="text-gray-700 font-bold uppercase py-2">Description</th>
                            <th class="text-gray-700 font-bold uppercase py-2">Quantity</th>
                            <th class="text-gray-700 font-bold uppercase py-2">Price</th>
                            <th class="text-gray-700 font-bold uppercase py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>

        `+text+`
        </tbody>


                    
                </table>
                
                
                <div class="flex justify-end mb-8">
                    <div class="text-gray-700 mr-2">Total:</div>
                    <div class="text-gray-700 font-bold text-xl">${total}</div>
                </div>
                <div class="border-t-2 border-gray-300 pt-8 mb-8">
                    <div class="text-gray-700 mb-2">Payment is due within 30 days. Late payments are subject to fees.</div>
                    <div class="text-gray-700 mb-2">Please make checks payable to Your Company Name and mail to:</div>
                    <div class="text-gray-700">Ariana Essoghra, Esprit</div>
                </div>
            </div>
                </body>
            </html>
        `;
            // Render the email template using EJS
            
            // Send the email with the rendered template
            await this.mailerService.sendMail({
                to,
                subject,
                html: htmlContent,
            });
            console.log("Email sent successfully with template");
        } catch (error) {
            throw new Error(`Failed to send email with template: ${error.message}`);
        }
    }
}
