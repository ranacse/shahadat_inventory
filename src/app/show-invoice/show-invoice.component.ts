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

  downloadPdf() {
    debugger
    var date = new Date();
    var FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

    let doc = new jsPDF();
    var pdfName = "Invoice_".concat(this.invoiceNumbber.toString()).concat("_Date_").concat(FromDate).concat(".pdf") ;

    doc.addHTML(document.getElementById("obrz"), function () {
      doc.save(pdfName);
    });
  }


  user: any;

  ngOnInit() {
    debugger
    this.myDate = new Date();
    this.todayDate = new Date(Date.parse(Date()));

    var date = new Date();
    var FromDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

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
