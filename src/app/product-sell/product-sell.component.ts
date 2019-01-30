import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-product',
  templateUrl: './product-sell.component.html',
  styleUrls: ['./product-sell.component.css']
})

@Component({
  selector: 'app-product-sell',
  templateUrl: './product-sell.component.html',
  styleUrls: ['./product-sell.component.css']
})
export class ProductSellComponent implements OnInit {

  constructor(private http: Http, private popup: Popup) { }

  confirmationString: string = "Sucessfully finish transection";
  errorToChoseProduct: string = "Product already choosen"
  isAdded: boolean = false;
  products = [];
  productsAllForSell=[];
  productSellObj = [];
  updateObj = [];
  totalAmount = 0;
  errorMessage = false;
  i: any = 0;
  index:any;



  sellProducts = function (newProduct) {
    
    let selectedProduct = this.products.filter(x => x.name == newProduct.name);
    if (newProduct.quantityProduct > selectedProduct[0].Quantity) {
      this.popup.options = {
        color: "red",
        header: "Quantity Problem"
      }
      this.popup.show();

    }
    else {

      this.amount = newProduct.priceProduct * newProduct.quantityProduct;

      this.totalAmount = this.totalAmount + this.amount;
      this.index = this.products.findIndex(presentProduct => presentProduct.name === newProduct.name);

      this.productSellObj.push({ id:this.products[this.index].id, name: newProduct.name, Price: newProduct.priceProduct, Quantity: newProduct.quantityProduct, totalPrice: this.amount });
      

      //new code

      this.index = this.products.findIndex(presentProduct => presentProduct.name === newProduct.name);
      this.products.splice(this.index, 1);
      // this.productsAllForSell = res.json();
      debugger
      this.productsAllForSell[this.index].Quantity=this.productsAllForSell[this.index].Quantity - newProduct.quantityProduct;

      this.priceProduct = '';
      this.quantityProduct = '';
      this.nameProduct = null;
      
     

      

      //end new code

      // this.per = this.productSellObj.filter(x => x.name == product.name);

      // if (this.productSellObj.length == 0) {  //if before no more added

      //   this.amount = product.price * product.quantityProduct;

      //   this.totalAmount = this.totalAmount + this.amount;
      //   this.productSellObj.push({ name: product.name, Price: product.price, Quantity: product.quantityProduct, totalPrice: this.amount });
      //   this.priceProduct = null;
      //   this.quantityProduct = null;
      //   this.nameProduct = null;
      // }
      // else {  // if more product added before

      //   if (this.per.length == 0) {  //if same product not added before
      //     this.amount = product.price * product.quantityProduct;

      //     this.totalAmount = this.totalAmount + this.amount;
      //     this.productSellObj.push({ name: product.name, Price: product.price, Quantity: product.quantityProduct, totalPrice: this.amount });
      //     this.priceProduct = null;
      //     this.quantityProduct = null;
      //     this.nameProduct = null;
      //     product.name=null;
      //   }
      //   else {
      //     // this.popup.options={  //add same product
      //     //   color:"red"
      //     // }
      //     // this.popup.show();
      //     this.errorMessage= true;

      //   }


      // }
    }   //end of first else


  }

  deleteProduct(id) {
    debugger

    const indexForDelete = this.productSellObj.findIndex(product => product.id === id);
    var tempoProduct= this.productSellObj[indexForDelete];
    this.totalAmount = this.totalAmount - (this.productSellObj[indexForDelete].Quantity * this.productSellObj[indexForDelete].Price);
    this.productSellObj.splice(indexForDelete, 1);

    //this.productsAllForSell.splice(2, 0, indexForDelete);
    var length=this.products.length;
    this.products.splice(length, 0, tempoProduct);
    


    

    debugger
    


  }


  //   sart testing
  finishSell = function (id) {

    console.log("start function  .........")

    this.http.delete("http://localhost:3000/products/9999", { headers: this.headers }).subscribe((res: Response) => {

      if (res.status == 200) {

        this.productSellObj.forEach(item => {
          var currentProductQuantity = item.Quantity;
          this.http.post("http://localhost:3000/sellProducts/", item).subscribe((res: Response) => {

            if (res.status == 200) {
              console.log("step :  ........start post function  .........");
              this.finalProducts(item);

            }

          })

        });

      }

    })   //------------------------------------------------finsh delete

    this.priceProduct = null;
    this.quantityProduct = null;
    this.getAllProducts();


  }

  finalProducts(item) {

    // this.productSellObj.forEach(item => {
    this.updateObj = [];
    var SellProduct = this.products.find(x => x.name === item.name);
    var currentSellProduct = this.products.find(x => x.name === item.name);
    var remainQuantity = currentSellProduct.Quantity - item.Quantity;
    this.updateObj.push({ name: SellProduct.name, quantity: remainQuantity });
    this.isAdded = true;
    console.log("finish update : " + " ........start update quantity function  .........");

    const url = `${"http://localhost:3000/products"}`;
    var body = JSON.stringify(this.updateObj);

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });

    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });

    debugger

    return this.http.put(url, body, { headers: headerOptions }).map(res => res.json());



  }



  getAllProducts = function () {

    this.http.get("http://localhost:3000/products").subscribe(
      (res: Response) => {
        this.products = res.json();
        this.productsAllForSell = res.json();


      }
    )

  }

  ngOnInit() {
    this.getAllProducts();
  }

}
