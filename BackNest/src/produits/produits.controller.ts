import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { Produits } from './produits.schema';

@Controller('produits')
export class ProduitsController { constructor(private readonly produitsService: ProduitsService) {}

@Post('ajouter')
async ajouterSprint(
    @Body('reference') reference: string,
    @Body('nom') nom: string,
    @Body('prix') prix: number,
    @Body('quantite') quantite: number,
    @Body('categorie') categorie: string,
    @Body('image') image: string,
    @Body('offre') offre: number
   
) {
    const nouveauProduits = await this.produitsService.ajouterProduit(reference,nom,prix,quantite,categorie,offre,image);
    
    return  nouveauProduits ;
  }


@Get('all')
async getAllProduits(
  @Query('page') page: string = '1',
  @Query('size') size: string = '10',
  @Query('sort') sort: string = 'nom',
  @Query('order') order: string = 'asc',
  @Query('search') search: string
){

try{
  let products: any[] | null = await this.produitsService.getAllProduits();
  if (!products) {
    return {
      produits: [],
      pagination: {
        length: 0,
        size,
        page,
        lastPage: 1,
        startIndex: 0,
        endIndex: -1,
      },
    };
  }

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(size, 10);
  // Sort the products
  if ( sort === 'nom' )
  {
      products.sort((a, b) =>
      {
          const fieldA = a[sort].toString().toUpperCase();
          const fieldB = b[sort].toString().toUpperCase();
          return order === 'asc' ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
      });
  }
  else
  {
      products.sort((a, b) => order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]);
  }

  // If search exists...
  if (search) {
  if (products) {
    products = products.filter(product =>
      (product.nom && product.nom.toLowerCase().includes(search.toLowerCase())) ||
      (product.reference && product.reference.toLowerCase().includes(search.toLowerCase()))
    );
  }
}

  // Paginate - Start
  const productsLength = products.length;

  const begin = pageNumber * pageSize;
                const end = Math.min((pageSize * (pageNumber + 1)), productsLength);
                const lastPage = Math.max(Math.ceil(productsLength / pageSize), 1);

                // Prepare the pagination object
                let pagination = {};

                if ( pageNumber > lastPage )
                {
                    products = null;
                    pagination = {
                        lastPage,
                    };
                }
                else
                {
                    // Paginate the results by size
                    products = products.slice(begin, end);

                    // Prepare the pagination mock-api
                    pagination = {
                        length    : productsLength,
                        size      : pageSize,
                        page      : pageNumber,
                        lastPage  : lastPage,
                        startIndex: begin,
                        endIndex  : end - 1,
                    };
                }
                console.log(pagination);
    //const allproduits = await this.produitsService.getAllProduits();
    return {produits : products, pagination};
}
   catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching products:', error);
    // Return an appropriate error response
    return { error: 'An error occurred while fetching products' };
  }
}    
@Patch('update/:id')
async updateProduits(@Param('id') id:string, @Body() updateData: Partial<Produits>){

    const updatedProduits = await this.produitsService.updateProduit(id,updateData);
    return{produits : updatedProduits};
}

@Delete(':id')
  async deleteProduits(@Param('id') id: string) {
    await this.produitsService.deleteProduit(id);
    return { message: 'Produits deleted successfully' };
  }

@Get('getProduitsbyid/:id')
  async getProduitsById(@Param('id') id: string) {
    return this.produitsService.getProduitById(id);
  }



}