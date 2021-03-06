import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { OrdersModule } from './orders/orders.module';
import { ProcurementModule } from './procurement/procurement.module';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { InventoryComponent } from './inventory/inventory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockModule } from './stock/stock.module'
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports:      [ 
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    OrdersModule,
    SharedModule,
    ProcurementModule,
    StockModule,
    CoreModule,
    AppRoutingModule
  ],

  declarations: [ 
    AppComponent,
    DashboardComponent,
    InventoryComponent
  ],

  bootstrap:    [ AppComponent ]
})

export class AppModule { }
