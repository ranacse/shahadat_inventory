import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import 'rxjs/add/operator/map';
import { Popup } from 'ng2-opd-popup';
import { ShowInvoiceComponent } from "../show-invoice/show-invoice.component";
import { ToasterService } from '../toaster-service.service';

@Component({
  selector: 'app-product-sell',
  
  templateUrl: './product-sell.component.html',
  // template: `<button (click)="sendMessage()">Send Message</button>`,
  styleUrls: ['./product-sell.component.css']
})
export class ProductSellComponent implements OnInit {

  constructor(private router: Router, private http: Http, private popup: Popup) { }


  // @Output() messageEvent = new EventEmitter<any>();
  @Output() messageEvent = new EventEmitter<string>();


  confirmationString: string = "Sucessfully finish transection";
  errorToChoseProduct: string = "Product already choosen"
  isAdded: boolean = false;
  products = [];
  productsAllForSell = [];
  productSellObj = [];
  updateProductObj = [];
  updateSingleProductObject = [];
  updateObj = [];
  productObj: object = {};
  totalAmount = 0;
  errorMessage = false;
  invoiceId:any;
  message: string = "Hola Mundo!"
 
  i: any = 0;
  index: any;

  finalProduct: any = {};
  private headers = new Headers({ 'Content-Type': 'application/json' });


 // message: string;
  
  message12 = 'from product Sell!';
  invoiceIdFromNode:string;
  
  count: number = 0;
  



  sendMessage() {
    debugger
    this.messageEvent.emit(this.invoiceId);
  }
  sellProducts = function (newProduct) {

    let selectedProduct = this.products.filter(x => x.name == newProduct.name);
    if (newProduct.quantityProduct > selectedProduct[0].Quantity) {
      this.popup.options = {
        color: "red",
        header: "Quantity Problem",
        showButtons: true,
        confirmBtnContent: "OK", // The text on your confirm button
        cancleBtnContent: "Cancel"
      }
      this.popup.show(this.popup.options);

    }
    else {

      this.index = this.searchTotalQuantityForEachProduct.findIndex(presentProduct => presentProduct.name === newProduct.name);

      let remainQuantity = this.searchTotalQuantityForEachProduct[this.index].Quantity - newProduct.quantityProduct;
      this.amount = newProduct.priceProduct * newProduct.quantityProduct;

      this.totalAmount = this.totalAmount + this.amount;

      this.productSellObj.push({
        id: this.productsAllForSell[this.index].id, name: newProduct.name, Price: newProduct.priceProduct,
        remainQuantity: remainQuantity, Quantity: newProduct.quantityProduct, totalPrice: this.amount
      });

      this.updateProductObj.push({ id: this.productsAllForSell[this.index].id, name: newProduct.name, Quantity: remainQuantity });


      //new code

      this.index2 = this.searchTotalQuantityForEachProduct.findIndex(presentProduct => presentProduct.name === newProduct.name);
      //this.products.splice(this.index2, 1);
      this.products = this.products.filter(function (obj) {
        return obj.name !== newProduct.name;
      });


      this.productsAllForSell[this.index].Quantity = this.productsAllForSell[this.index].Quantity - newProduct.quantityProduct;

      // this.priceProduct = '';
      // this.quantityProduct = '';
      // this.nameProduct = null;
      this.finalProduct = {};
      this.index = null;
      

    }   //end of first else

    // this.getAllProducts();
  }


  deleteProductFromList(id) {


    const indexForDelete = this.productSellObj.findIndex(product => product.id === id);
    var tempoProduct = this.productSellObj[indexForDelete];
    this.totalAmount = this.totalAmount - (this.productSellObj[indexForDelete].Quantity * this.productSellObj[indexForDelete].Price);
    this.productSellObj.splice(indexForDelete, 1);

    var length = this.products.length;
    this.products.splice(length, 0, tempoProduct);

  }


  //   start testing
  submitTotalSell = function (id) {

    console.log("start function  .........");

    this.http.post("http://localhost:3000/sellProducts/", this.productSellObj).map(res => {
      debugger
      this.invoiceId = res.text();
      this.message = String(this.invoiceId);
      this.notify.emit(this.message);
     // this.sendMessage();

      if (res.status < 200 || res.status >= 300) {
        throw new Error('This request has failed ' + res.status);
      }
      else {
        console.log("going to update quantity  .........")
      }
    })
      .subscribe(
        (data) => this.data = this.invoiceId, // Reach here if res.status >= 200 && <= 299
        (err) => this.error = err); // Reach here if fails

    this.priceProduct = null;
    this.quantityProduct = null;
    this.productSellObj = [];
debugger
    
    this.totalAmount = null;
    this.isAdded = true;

    this.success();

  }
  
  //update product quantity

  finalProducts(item) {

    this.updateObj = [];

    this.productObj = {
      'id': item.id,
      "name": item.name,
      "Quantity": item.Quantity
    };

    this.isAdded = true;
    console.log("finish update : " + " ........start update quantity function  .........");

    // const url = `${"http://localhost:3000/products"}`;
    var body = JSON.stringify(this.updateObj);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });

    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });



    const url = `${"http://localhost:3000/products"}`;
    this.http.put(url, JSON.stringify(this.productObj), { headers: this.headers })
      .toPromise()
      .then(() => {
        // this.getAllProducts();
        this.sendMessage();
        //this.router.navigate(['/']);
      });

    // this.getAllProducts();
    //this.sendMessage();


  }



  getAllProducts = function () {

    this.http.get("http://localhost:3000/products").subscribe(
      (res: Response) => {
        this.products = res.json();
        this.productsAllForSell = res.json();
        this.searchTotalQuantityForEachProduct = res.json();


      }
    )

  }

 

  ngOnInit() {
    this.message12 = 'from product Sell!';
    this.getAllProducts();
  }

}
