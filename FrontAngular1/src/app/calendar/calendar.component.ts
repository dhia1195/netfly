import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fuseAnimations } from '@fuse/animations';
import { HammerModule } from '@angular/platform-browser';
import { ListeVentesService } from 'app/service/liste-ventes.service';
import { AchatService } from 'app/service/achat.service';
import {IGX_CALENDAR_DIRECTIVES} from 'igniteui-angular';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [ HammerModule, IGX_CALENDAR_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations, 
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  

  
})
export class CalendarComponent {
  viewDate: Date = new Date();
  // events: CalendarEvent[] = [
  //   {
  //     start: new Date(),
  //     title: 'Event 1'
  //   },
  //   {
  //     start: new Date(),
  //     title: 'Event 2'
  //   }
  // ];
  constructor(
  private venteS:ListeVentesService,
  private achatS:AchatService
)
{
}

public activeViewChanged(event: any) {
  let date = new Date(event);
  let msg=""
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`;
  console.log(formattedDate);
 
  this.venteS.getAllVentes().subscribe({
    next:(ventes:any)=>{
      console.log(ventes)
      for(var v of ventes.ventes){
        let dateV=new Date(v.dateV)
        const formattedDateV = `${dateV.getDate()}/${dateV.getMonth() + 1}/${dateV.getFullYear().toString().slice(2)}`;
        console.log(formattedDateV)
        if(date.getDate() === dateV.getDate() && date.getMonth() === dateV.getMonth() && date.getFullYear() === dateV.getFullYear() ){
          msg+="liste des produits vendu au client avec id "+v.clients+" : \n"
          for(var p of v.produits){
            msg+="id :"+p.id_produit +" quantite : "+p.quantite+"\n"
          }
         
          
        }
       
      }
      if(!msg){
        alert("no event")
      }
      else{
       alert(msg)
      }
      
    }
  })
  
 }
 

}
