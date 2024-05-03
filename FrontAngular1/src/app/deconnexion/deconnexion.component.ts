import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-deconnexion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deconnexion.component.html',
  styleUrl: './deconnexion.component.scss'
})
export class DeconnexionComponent implements OnInit {
  constructor(
    
    private _router: Router
)
{
}
  ngOnInit(): void{
    localStorage.removeItem("employe")
    localStorage.removeItem("admin")
    this._router.navigate(["login"])


  }
}
