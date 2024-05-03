"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddOffreComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var AddOffreComponent = /** @class */ (function () {
    function AddOffreComponent(offreService, fb) {
        this.offreService = offreService;
        this.fb = fb;
        this.ajoutAvecSucces = false;
    }
    AddOffreComponent.prototype.ngOnInit = function () {
        this.offreForm = this.fb.group({
            reduction: ['', [forms_1.Validators.minLength(3), forms_1.Validators.required]],
            condition: ['', [forms_1.Validators.minLength(3), forms_1.Validators.required]],
            dateD: ['', [forms_1.Validators.minLength(3), forms_1.Validators.required]],
            dateF: ['', [forms_1.Validators.minLength(3), forms_1.Validators.required]]
        });
    };
    AddOffreComponent.prototype.addOffre = function () {
        var _this = this;
        console.log(this.offreForm.controls);
        if (this.offreForm.valid) {
            this.offreService
                .addOffre(this.offreForm.value)
                .subscribe(function (data) {
                console.log(data);
                _this.ajoutAvecSucces = true;
                _this.offreForm.reset();
            });
        }
    };
    AddOffreComponent = __decorate([
        core_1.Component({
            selector: 'app-add-offre',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule],
            templateUrl: './add-offre.component.html',
            styleUrl: './add-offre.component.scss'
        })
    ], AddOffreComponent);
    return AddOffreComponent;
}());
exports.AddOffreComponent = AddOffreComponent;
