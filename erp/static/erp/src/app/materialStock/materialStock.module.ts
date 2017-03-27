import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule }    from '@angular/http';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { MaterialStockComponent} from './materialStock.component'
import {MaterialStockService} from './materialStock.service'

import {MaterialStockRoutingModule} from './materialStock-routing.module'
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        NgbModule,
        MaterialStockRoutingModule,
    ],

    declarations: [
        MaterialStockComponent,
    ],
    providers: [
        MaterialStockService
    ]
})

export class MaterialStockModule {}
