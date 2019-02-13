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
 
  styleUrls: ['./product-sell.component.css']
})
export class ProductSellComponent implements OnInit {

  constructor(private toasterService: ToasterService, private router: Router, private http: Http, private popup: Popup) { }

  @Output() messageEvent = new EventEmitter<string>();


  confirmationString: string = "Sucessfully finish transection";
  errorToChoseProduct: string = "Product already choosen"
  isAdded: boolean = false;
  products = [];
  finalEachProduct = [];
  productsAllForSell = [];
  productSellObj = [];
  updateProductObj = [];
  updateSingleProductObject = [];
  updateObj = [];
  productObj: object = {};
  updateProductQuantity=[];
  totalAmount = 0;
  errorMessage = false;
  invoiceId: any;
  message: string = "Hola Mundo!"

  i: any = 0;
  index: any;
  remainQuantity: any;

  finalProduct: any = {};
  private headers = new Headers({ 'Content-Type': 'application/json' });


  message12 = 'from product Sell!';
  invoiceIdFromNode: string;

  count: number = 0;



  success() {

    this.toasterService.Success("Successfully Got All Product", "Set Product");
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

      this.remainQuantity = this.searchTotalQuantityForEachProduct[this.index].Quantity - newProduct.quantityProduct;
      this.amount = newProduct.priceProduct * newProduct.quantityProduct;

      this.totalAmount = this.totalAmount + this.amount;

      this.productSellObj.push({
        id: this.productsAllForSell[this.index].id, name: newProduct.name, Price: newProduct.priceProduct,
        remainQuantity: this.remainQuantity, Quantity: newProduct.quantityProduct, totalPrice: this.amount
      });
 
      this.updateProductObj.push({ id: this.productsAllForSell[this.index].id, name: newProduct.name, Price: newProduct.priceProduct, Quantity: newProduct.quantityProduct, amount: this.amount });
      this.index2 = this.searchTotalQuantityForEachProduct.findIndex(presentProduct => presentProduct.name === newProduct.name);

      this.products = this.products.filter(function (obj) {
        return obj.name !== newProduct.name;
      });

      this.productsAllForSell[this.index].Quantity = this.productsAllForSell[this.index].Quantity - newProduct.quantityProduct;
      this.finalProduct = {};
      this.index = null;


    }   

  }


  submitTotalSell = function (id) {

    console.log("start function  .........");

    this.http.post("http://localhost:3000/sellProducts/", this.updateProductObj).subscribe((res: Response) => {

      if (res.status == 200) {

        this.isAdded = true;
        this.productName = null;
        this.productQuantity = null;
        this.finalProducts(this.updateProductObj);


        this.success();
      }
    })

    this.priceProduct = null;
    this.quantityProduct = null;
    this.productSellObj = [];

    this.totalAmount = null;
    this.isAdded = true;
    this.getAllProducts();


  }


  finalProducts(item) {
    
    this.updateObj = [];
    for (let i = 0; i < item.length; i++) {



      this.index = this.products.findIndex(presentProduct => presentProduct.name === item[i].name);

      this.remainQuantity = this.finalEachProduct[this.index].Quantity - item[i].Quantity;

      this.updateProductQuantity.push({id : item[i].id, name:item[i].name, Quantity:this.remainQuantity});


      this.isAdded = true;
      console.log("finish update : " + " ........start update quantity function  .........");
    }

      var body = JSON.stringify(this.updateObj);

      var headerOptions = new Headers({ 'Content-Type': 'application/json' });
      var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });

      let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: cpHeaders });


      
      const url = `${"http://localhost:3000/products"}`;
      this.http.put(url, JSON.stringify(this.updateProductQuantity), { headers: this.headers })
        .subscribe(data => {

        });

  }
  getAllProducts = function () {

    this.http.get("http://localhost:3000/products").subscribe(
      (res: Response) => {
        this.products = res.json();
        this.productsAllForSell = res.json();
        this.searchTotalQuantityForEachProduct = res.json();
        this.finalEachProduct = res.json();

      }
    )

  }

  deleteProductFromList(id) {


    const indexForDelete = this.productSellObj.findIndex(product => product.id === id);
    var tempoProduct = this.productSellObj[indexForDelete];
    this.totalAmount = this.totalAmount - (this.productSellObj[indexForDelete].Quantity * this.productSellObj[indexForDelete].Price);
    this.productSellObj.splice(indexForDelete, 1);

    var length = this.products.length;
    this.products.splice(length, 0, tempoProduct);

  }


  ngOnInit() {
    this.message12 = 'from product Sell!';
    this.getAllProducts();
  }

}
