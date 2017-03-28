import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {OrdersComponent} from "./orders/orders.component";
import {ProcurementComponent} from "./procurement/procurement.component";
import {InventoryComponent} from "./inventory/inventory.component";

const appRoutes : Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
    }, {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }, {
        path: 'inventory',
        component: InventoryComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}