import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from 'app/service/reclamation.service';

@Component({
    selector: 'app-update-reclamation',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './update-reclamation.component.html',
    styleUrl: './update-reclamation.component.scss',
})
export class UpdateReclamationComponent {
    reclamationForm: FormGroup;

    constructor(
        private reclamationService: ReclamationService,
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}
    _id: string;
    modifierAvecSucces: boolean = false;

    ngOnInit(): void {
        this.reclamationForm = this.fb.group({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            date: new FormControl('', Validators.required),
        });
        this._id = this.activatedRoute.snapshot.params.id;
        console.log('this is id ', this._id);

        this.reclamationService
            .getReclamationById(this._id)
            .subscribe((data) => {
                console.log('this is data ', data);
                this.reclamationForm.patchValue({ title: data['title'] });
                this.reclamationForm.patchValue({
                    description: data['description'],
                });
                this.reclamationForm.patchValue({ date: data['date'] });

                console.log(
                    'reclamation form here ',
                    this.reclamationForm.value
                );
            });
    }

    updateReclamation(): void {
        console.log(this.reclamationForm);

        if (this.reclamationForm.valid) {
          const reclamationData = this.reclamationForm.value;
          reclamationData._id = this._id; // Assuming _id is obtained and stored correctly

          this.reclamationService.updateReclamation(this._id, reclamationData).subscribe(
            (data: any) => {
              console.log("Update success:", data);
              this.modifierAvecSucces = true;
              this.reclamationForm.reset();
              this.router.navigate(["dashboards/listreclamation"]);
            },
            (error: any) => {
              console.error("Error updating reclamation:", error);
              // Handle error accordingly, e.g., show error message
            }
          );
        } else {
          // Form is invalid, handle accordingly
        }
    }
}
