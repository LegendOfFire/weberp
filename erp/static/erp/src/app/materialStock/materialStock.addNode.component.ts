import { Component } from "@angular/core";
import { OnInit, Input } from "@angular/core";
import { Leaf, Node } from './../shared/tree/tree';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    moduleId: module.id,
    templateUrl: "./templates/materialStock.addNode.html",
})
export class NgbdModalAddNodeContent {
    @Input() root_node: Node;
    constructor(public activeModal: NgbActiveModal) {}    
}
