"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateOffreComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var UpdateOffreComponent = /** @class */ (function () {
    function UpdateOffreComponent(offreService, fb, router, activatedRoute) {
        this.offreService = offreService;
        this.fb = fb;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.modifierAvecSucces = false;
    }
    UpdateOffreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.offreForm = this.fb.group({
            reduction: new forms_1.FormControl('', forms_1.Validators.required),
            condition: new forms_1.FormControl('', forms_1.Validators.required),
            dateD: new forms_1.FormControl('', forms_1.Validators.required),
            dateF: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this._id = this.activatedRoute.snapshot.params.id;
        console.log('this is id ', this._id);
        this.offreService
            .getOffreById(this._id)
            .subscribe(function (data) {
            console.log('this is data ', data);
            _this.offreForm.patchValue({ reduction: data['reduction'] });
            _this.offreForm.patchValue({ condition: data['condition'] });
            _this.offreForm.patchValue({ dateD: data['dateD'] });
            _this.offreForm.patchValue({ dateF: data['dateF'] });
            console.log('offre form here ', _this.offreForm.value);
        });
    };
    UpdateOffreComponent.prototype.updateOffre = function () {
        var _this = this;
        console.log(this.offreForm);
        if (this.offreForm.valid) {
            var offreData = this.offreForm.value;
            offreData._id = this._id; // Assuming _id is obtained and stored correctly
            this.offreService.updateOffre(this._id, offreData).subscribe(function (data) {
                console.log("Update success:", data);
                _this.modifierAvecSucces = true;
                _this.offreForm.reset();
                _this.router.navigate(["dashboards/listoffre"]);
            }, function (error) {
                console.error("Error updating offre:", error);
                // Handle error accordingly, e.g., show error message
            });
        }
        else {
            // Form is invalid, handle accordingly
        }
    };
    UpdateOffreComponent = __decorate([
        core_1.Component({
            selector: 'app-update-offre',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
            templateUrl: './update-offre.component.html',
            styleUrl: './update-offre.component.scss'
        })
    ], UpdateOffreComponent);
    return UpdateOffreComponent;
}());
exports.UpdateOffreComponent = UpdateOffreComponent;
