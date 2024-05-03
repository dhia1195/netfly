import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ReclamationService } from 'app/service/reclamation.service';
import { UserService } from 'app/service/user.service';

@Component({
    selector: 'app-add-reclamation',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './add-reclamation.component.html',
    styleUrl: './add-reclamation.component.scss',
})
export class AddReclamationComponent {
    userList: any[] = [];
    constructor(
        private reclamationservice: ReclamationService, private userService :UserService,
        private fb: FormBuilder
    ) {}
    reclamationForm: FormGroup;
    ajoutAvecSucces: boolean = false;

    ngOnInit(): void {
        this.reclamationForm = this.fb.group({
            title: ['', [Validators.minLength(3), Validators.required]],
            description: ['', [Validators.minLength(3), Validators.required]],
            // Initialize the date with the current date
            date: [new Date().toISOString(), [Validators.required]],
            user: ['', Validators.required],
        });
    
        this.userService.getAllUser().subscribe((response: any) => {
            console.log(response); // Vérifiez la structure de la réponse
            if (Array.isArray(response) && response.length > 0) { // Vérifiez si la réponse est un tableau contenant au moins un élément
                this.userList = response; // Utilisez directement la réponse car elle contient les données attendues
            } else {
                console.error('La réponse ne contient pas les données attendues.');
            }
        });
        
        
    }
    public addReclamation() {
        console.log(this.reclamationForm.controls);
        if (this.reclamationForm.valid) {
            this.reclamationservice
                .addReclamation(this.reclamationForm.value)
                .subscribe((data) => {
                    console.log(data);
                    this.ajoutAvecSucces = true;
                    this.reclamationForm.reset();
                    // Update the date to the current date after successful addition
                    this.reclamationForm.patchValue({
                        date: new Date().toISOString(),
                    });
                });
        }
    }
}
