import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
//import { ProductSellComponent } from ./product-sell/product-sell;
import { ProductSellComponent } from '../product-sell/product-sell.component';
import { SelectorListContext } from '@angular/compiler';
import * as autoTable from 'jspdf-autotable';
import 'tabletojson';

@Component({
  selector: 'app-show-invoice',
  templateUrl: './show-invoice.component.html',
  styleUrls: ['./show-invoice.component.css']
})


export class ShowInvoiceComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  productForSell = [];
  currentProducts = [];
  exist = false;
  invoiceNumbber = 0;
  productObj: object = {};
  private headers = new Headers({ 'Content-Type': 'application/json' });
  data: object = {};
  fullAmount = 0;

  myDate = new Date();
  public todayDate = new Date(Date.parse(Date()));


  constructor(private http: Http) { }

  public downloadPDF() {
    debugger
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('shahadat_print.pdf');

  }


  user: any;

  ngOnInit() {

    //console.log(this.asd.products[0]);

    this.http.get("http://localhost:3000/sellProducts").subscribe(
      (res: Response) => {
        let serialNo = 1;
        this.currentProducts = res.json();


        for (let i = 0; i < this.currentProducts.length; i++) {
          this.fullAmount = this.fullAmount + this.currentProducts[i].TotalAmount;
          this.currentProducts[i].serialNo = serialNo;
          serialNo++;

          this.invoiceNumbber = this.currentProducts[i].id + 1000;
        }

        debugger

        console.log(this.todayDate);

      }
    )

  }



}
