"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListReclamationComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var button_1 = require("@angular/material/button");
var divider_1 = require("@angular/material/divider");
var icon_1 = require("@angular/material/icon");
var menu_1 = require("@angular/material/menu");
var progress_bar_1 = require("@angular/material/progress-bar");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var ng_apexcharts_1 = require("ng-apexcharts");
var common_2 = require("@angular/common");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var ListReclamationComponent = /** @class */ (function () {
    function ListReclamationComponent(reclamationService) {
        this.reclamationService = reclamationService;
        this.searchTerm = '';
        this.displayedColumns = ['title', 'description', 'date', 'action'];
        this.dataSource = [];
    }
    ListReclamationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reclamationService.getAllReclamation().subscribe(function (data) {
            _this.reclamation = data;
            _this.dataSource = data;
            console.log(data);
        });
    };
    ListReclamationComponent.prototype.deleteReclamation = function (reclamation) {
        var _this = this;
        console.log("Avant suppression - ID de la réclamation :", reclamation._id);
        var confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette réclamation ?");
        if (confirmation) {
            // Call your service method to delete the reclamation
            this.reclamationService.deleteReclamation(reclamation._id).subscribe(function () {
                // After deletion, update the data source to reflect the changes
                _this.dataSource = _this.dataSource.filter(function (item) { return item._id !== reclamation._id; });
                console.log("Réclamation supprimée avec succès.");
            }, function (error) {
                console.error("Erreur lors de la suppression de la réclamation :", error);
            });
        }
    };
    ListReclamationComponent = __decorate([
        core_1.Component({
            selector: 'app-list-reclamation',
            standalone: true,
            templateUrl: './list-reclamation.component.html',
            styleUrl: './list-reclamation.component.scss',
            imports: [
                common_1.CommonModule,
                button_1.MatButtonModule,
                icon_1.MatIconModule,
                menu_1.MatMenuModule,
                divider_1.MatDividerModule,
                ng_apexcharts_1.NgApexchartsModule,
                table_1.MatTableModule,
                sort_1.MatSortModule,
                common_2.NgClass,
                progress_bar_1.MatProgressBarModule,
                common_2.CurrencyPipe,
                common_2.DatePipe,
                router_1.RouterLink,
                http_1.HttpClientModule,
            ]
        })
    ], ListReclamationComponent);
    return ListReclamationComponent;
}());
exports.ListReclamationComponent = ListReclamationComponent;
