import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { Order } from './order';
import { OrderService } from "./order.service";
import { Product } from './products/product';
import { ProductService } from './products/product.service';

import { MaterialOrder } from '../shared/material/material-order';
import { MaterialOrderService } from '../shared/material/material-order.service';
// import { MaterialOrderComponent } from '../shared/material/material-order.component';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { DetailMaterialRequriment } from './detail-material/detail-material'
import { StockService } from './../stock/stock.service';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { TreeService } from '../shared/tree/tree.service';
import { NgbdModalStockRecord } from './../stock/stock.record.component'

@Component({
    //selector is not needed here because we use routing.
    //selector: 'order-detail',
    moduleId: module.id,
    templateUrl: "static/erp/src/app/orders/templates/order-detail.component.html"
})

export class OrderDetailComponent implements OnInit {

    /* Class Member Declarations */
    title: string; //Initialization must be put in constructor; otherwise there is no effect. Don't know why.

    orderDetail: Order;

    productList: Product[];
    materialItemList: DetailMaterialRequriment[];
    productListBeforeEdit: Product[];

    addedProductList: Product[];
    deletedProductList: Product[];

    productListEditable: Boolean;
    errorMessage: string;

    materialOrderList: MaterialOrder[];

    closeResult: string;

    serviceReady: Boolean;
    modalOptions: NgbModalOptions = { size: "lg" }

    /* Constructor */
    constructor(
        private route: ActivatedRoute,  //Inject ActivatedRoute to pull params from routing
        private router: Router,
        private order_service: OrderService,
        private product_service: ProductService,
        private material_order_service: MaterialOrderService,
        private material_stock_service: StockService,
        private ts: TreeService,
        private modalService: NgbModal,
    ) {

        this.orderDetail = new Order();
        this.title = 'Order Detail';    //Initialize title attribute here!!!
        this.productListEditable = false;
        this.productListBeforeEdit = [];
        this.addedProductList = [];
        this.deletedProductList = [];
        this.materialItemList = [];
        this.materialOrderList = [];

        this.serviceReady = false;

    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.order_service.getOrder(+params['id']))
            .subscribe((order: Order) => {
                this.orderDetail.deserialize(order);
                this.product_service.getProducts(this.orderDetail.id)
                    .subscribe(products => {
                        this.productList = this.copyProductList(products);
                        this.updateDetailmaterialItemInfo();
                    },
                    error => this.errorMessage = <any>error);

                this.material_order_service.getMaterialOrders(this.orderDetail.id)
                    .subscribe(materialOrders => {
                        // this.materialOrderList = this.copyMaterialOrders(materialOrders);
                        materialOrders.forEach(mo => {
                            let tmpMO = new MaterialOrder(0);
                            tmpMO.deserialize(mo);
                            tmpMO.modifyMode = false;
                            this.materialOrderList.push(tmpMO);
                        })
                        // this.materialOrderList.forEach(mo => mo.modifyMode = false);
                    },
                    error => this.errorMessage = <any>error,
                );
            });

        if (!this.ts.readyForServe()) {
            let that = this;
            this.ts.regCallBack(function () {
                console.log("Callback function is called!");
                that.serviceReady = true;
            })
        }
        else {
            this.serviceReady = true;
        }
    }

    private onEditProducts(): void {

        if (!this.productListEditable) {
            this.productListBeforeEdit = this.copyProductList(this.productList);
        }

        this.productListEditable = !this.productListEditable;
    }

    private onSubmitEdit(): void {

        this.productListEditable = !this.productListEditable;

        this.addedProductList.forEach(newProduct => {
            newProduct.orderId = this.orderDetail.id;
            // let result: Product;
            this.product_service.addProducts(newProduct)
                .subscribe(product => {
                    newProduct = Object.assign({}, product);
                    this.updateDetailmaterialItemInfo();
                },
                error => this.errorMessage = <any>error);
        })

        this.addedProductList = [];

        this.deletedProductList.forEach(delProduct => {
            let result: string;
            this.product_service.delProducts(delProduct)
                .subscribe(message => {
                    result = message;
                    this.updateDetailmaterialItemInfo();
                },
                error => this.errorMessage = <any>error);
        })

        this.deletedProductList = [];

        this.getUpdatedProducts().forEach(chgProduct => {
            // let result: Product;
            this.product_service.updateProducts(chgProduct)
                .subscribe(product => chgProduct = Object.assign({}, product),
                error => this.errorMessage = <any>error);
        })
    }

    private onCancelEdit(): void {
        this.productList = this.copyProductList(this.productListBeforeEdit);
        this.addedProductList = [];
        this.deletedProductList = [];
        this.productListEditable = !this.productListEditable;
    }

    private copyProductList(arraySrc: Product[]): Product[] {
        var arrayDest: Product[] = [];
        arraySrc.forEach((product) => arrayDest.push(Object.assign({}, product)));
        return arrayDest;
    }

    private getUpdatedProducts(): Product[] {
        let updatedProductList: Product[] = [];

        this.productListBeforeEdit.forEach(product_b => {
            this.productList.forEach(product_a => {
                if (product_a.id == product_b.id) {
                    if (!this.jsonEqual(product_a, product_b)) {
                        updatedProductList.push(product_a);
                    }
                }
            })
        })

        return updatedProductList;
    }

    private jsonEqual(product_a: Product, product_b: Product): Boolean {
        return JSON.stringify(product_a) == JSON.stringify(product_b);
    }

    private updateDetailmaterialItemInfo() {
        this.updatematerialItemList();
        this.materialItemList.forEach(meterialItem => {
            this.material_stock_service.getMaterialStockById(meterialItem.materialId).
                subscribe(material_stock => {
                    meterialItem.shoppingNum = material_stock.shoppingNum;
                    meterialItem.instockNum = material_stock.instockNum;
                })
        })
    }

    private updatematerialItemList() {
        this.materialItemList = [];
        var isExist: Boolean;

        this.productList.forEach(product_iter => {
            isExist = false;
            for (var i = 0; i < product_iter.materialRequrimentList.length; i++) {
                var materialItem_iter = product_iter.materialRequrimentList[i];
                isExist = false;
                for (var m in this.materialItemList) {
                    if (this.materialItemList[m].materialId == materialItem_iter.materialId) {
                        this.materialItemList[m].requrimentNum += Number(materialItem_iter.count);
                        isExist = true;
                    }
                }

                if (isExist == false) {
                    var tmp_materialitem = new DetailMaterialRequriment;
                    tmp_materialitem.name = materialItem_iter.name;
                    tmp_materialitem.id = materialItem_iter.id;
                    tmp_materialitem.materialId = materialItem_iter.materialId;
                    tmp_materialitem.requrimentNum = Number(materialItem_iter.count);
                    this.materialItemList.push(tmp_materialitem);
                }
            }

        })
    }

    onFetchCheckOut() {
        this.material_stock_service.getSalerOrderCheckOutInfo(this.orderDetail.id).subscribe(info => {
            const modalRef = this.modalService.open(NgbdModalStockRecord, this.modalOptions);
            modalRef.componentInstance.info = info;
        });
    }
}
