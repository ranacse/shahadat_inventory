import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ProductSellComponent } from '../product-sell/product-sell.component';
import { SelectorListContext } from '@angular/compiler';
import * as autoTable from 'jspdf-autotable';
import 'tabletojson';


@Component({
  selector: 'app-show-invoice',
  templateUrl: './show-invoice.component.html',
  // template: '  Message: {{message}} <app-product-sell (messageEvent)="receiveMessage($event)"></app-product-sell>',
  styleUrls: ['./show-invoice.component.css']
})


export class ShowInvoiceComponent implements OnInit {

  // @ViewChild('content') content: ElementRef;
  // @ViewChild(ProductSellComponent) child;

  // @ViewChild(ProductSellComponent)
  // private numberComponent: ProductSellComponent;


  productForSell = [];
  sellProducts=[];
  currentProducts = [];
  exist = false;
  invoiceNumber = 0;
  productObj: object = {};
  private headers = new Headers({ 'Content-Type': 'application/json' });
  data: object = {};
  fullAmount = 0;
  lastProductInvoice: any;
  totalAmount:any=0;

  myDate = new Date();
  public todayDate = new Date(Date.parse(Date()));


  constructor(private http: Http) { }

  message123: any;

  receiveMessage($event) {
    debugger
    this.message123 = $event;
  }

  updateValue(newValue: any) {
    console.log("The value of x from Child: ", newValue);
  }



  downloadPdf() {
    debugger
    var date = new Date();
    var FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    let doc = new jsPDF();
    var pdfName = "Invoice_".concat(this.invoiceNumber.toString()).concat("_Date_").concat(FromDate).concat(".pdf");

    doc.addHTML(document.getElementById("obrz"), function () {
      doc.save(pdfName);
    });
  }


  user: any;


  ngOnInit() {



    this.myDate = new Date();
    this.todayDate = new Date(Date.parse(Date()));

    var date = new Date();
    var FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    this.http.get("http://localhost:3000/sell").subscribe(
      (res: Response) => {
        
        let invoiceNumber = res.json();
        this.lastProductInvoice = invoiceNumber[0].lastInvoieNumber;

        const url = `${"http://localhost:3000/sellitems"}/${this.lastProductInvoice}`;
        return this.http.get(url, { headers: this.headers }).subscribe((res: Response) => {
          this.sellProducts = res.json();
          for(let i=0;i<this.sellProducts.length; i++){
            this.totalAmount = this.totalAmount + this.sellProducts[i].TotalSellAmount ;
            this.sellProducts[i].sellId=i+1;
          }
          
debugger
        })
          
      }
    )

    debugger
    // var asd=this.child.invoiceId;


  }



}
