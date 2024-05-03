"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateReclamationComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var UpdateReclamationComponent = /** @class */ (function () {
    function UpdateReclamationComponent(reclamationService, fb, router, activatedRoute) {
        this.reclamationService = reclamationService;
        this.fb = fb;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.modifierAvecSucces = false;
    }
    UpdateReclamationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reclamationForm = this.fb.group({
            title: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required),
            date: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this._id = this.activatedRoute.snapshot.params.id;
        console.log('this is id ', this._id);
        this.reclamationService
            .getReclamationById(this._id)
            .subscribe(function (data) {
            console.log('this is data ', data);
            _this.reclamationForm.patchValue({ title: data['title'] });
            _this.reclamationForm.patchValue({
                description: data['description']
            });
            _this.reclamationForm.patchValue({ date: data['date'] });
            console.log('reclamation form here ', _this.reclamationForm.value);
        });
    };
    UpdateReclamationComponent.prototype.updateReclamation = function () {
        var _this = this;
        console.log(this.reclamationForm);
        if (this.reclamationForm.valid) {
            var reclamationData = this.reclamationForm.value;
            reclamationData._id = this._id; // Assuming _id is obtained and stored correctly
            this.reclamationService.updateReclamation(this._id, reclamationData).subscribe(function (data) {
                console.log("Update success:", data);
                _this.modifierAvecSucces = true;
                _this.reclamationForm.reset();
                _this.router.navigate(["dashboards/listreclamation"]);
            }, function (error) {
                console.error("Error updating reclamation:", error);
                // Handle error accordingly, e.g., show error message
            });
        }
        else {
            // Form is invalid, handle accordingly
        }
    };
    UpdateReclamationComponent = __decorate([
        core_1.Component({
            selector: 'app-update-reclamation',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
            templateUrl: './update-reclamation.component.html',
            styleUrl: './update-reclamation.component.scss'
        })
    ], UpdateReclamationComponent);
    return UpdateReclamationComponent;
}());
exports.UpdateReclamationComponent = UpdateReclamationComponent;
