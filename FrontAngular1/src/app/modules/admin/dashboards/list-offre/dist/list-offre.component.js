"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListOffreComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var button_1 = require("@angular/material/button");
var divider_1 = require("@angular/material/divider");
var icon_1 = require("@angular/material/icon");
var menu_1 = require("@angular/material/menu");
var progress_bar_1 = require("@angular/material/progress-bar");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var router_1 = require("@angular/router");
var ng_apexcharts_1 = require("ng-apexcharts");
var ListOffreComponent = /** @class */ (function () {
    function ListOffreComponent(offreService) {
        this.offreService = offreService;
        this.searchTerm = '';
        this.displayedColumns = ['reduction', 'condition', 'date debut', 'date fin', 'action'];
        this.dataSource = [];
    }
    ListOffreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.offreService.getAllOffre().subscribe(function (data) {
            _this.offre = data;
            _this.dataSource = data;
            console.log(data);
        });
    };
    ListOffreComponent.prototype.deleteOffre = function (offre) {
        var _this = this;
        console.log("Avant suppression - ID de la offre :", offre._id);
        var confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette offre ?");
        if (confirmation) {
            // Call your service method to delete the reclamation
            this.offreService.deleteOffre(offre._id).subscribe(function () {
                // After deletion, update the data source to reflect the changes
                _this.dataSource = _this.dataSource.filter(function (item) { return item._id !== offre._id; });
                console.log("Offre supprimée avec succès.");
            }, function (error) {
                console.error("Erreur lors de la suppression de la offre :", error);
            });
        }
    };
    ListOffreComponent = __decorate([
        core_1.Component({
            selector: 'app-list-offre',
            standalone: true,
            imports: [
                common_1.CommonModule,
                button_1.MatButtonModule,
                icon_1.MatIconModule,
                menu_1.MatMenuModule,
                divider_1.MatDividerModule,
                ng_apexcharts_1.NgApexchartsModule,
                table_1.MatTableModule,
                sort_1.MatSortModule,
                common_1.NgClass,
                progress_bar_1.MatProgressBarModule,
                common_1.CurrencyPipe,
                common_1.DatePipe,
                router_1.RouterLink,
                http_1.HttpClientModule,
            ],
            templateUrl: './list-offre.component.html',
            styleUrl: './list-offre.component.scss'
        })
    ], ListOffreComponent);
    return ListOffreComponent;
}());
exports.ListOffreComponent = ListOffreComponent;
