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
  selector: 'app-update-product-quantity',
  templateUrl: './update-product-quantity.component.html',
  styleUrls: ['./update-product-quantity.component.css']
})
export class UpdateProductQuantityComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: Http, private popup: Popup) { }


  products=[];
  updatedItem=[];
  productObj:object = {};
  asd:boolean=false;
  //id:number;
  updateProduct={};
  updatedQuantity:number;
  private headers = new Headers({ 'Content-Type': 'application/json'});

  getAllProducts = function () {

    this.http.get("http://localhost:3000/products").subscribe(
      (res: Response) => {
        this.products = res.json();


      }
    )

  }

 
  updateQuantity(updateProductQuan) {
    
debugger
    this.updateProduct = this.products.filter(x => x.name == updateProductQuan.name);
    this.updatedQuantity=this.updateProduct[0].Quantity + updateProductQuan.quantity;
    this.productObj = {
      'id': this.updateProduct[0].id,
      "name": updateProductQuan.name,
      "Quantity": this.updatedQuantity
    };
    
    const url = `${"http://localhost:3000/products"}`;
    this.http.put(url, JSON.stringify(this.productObj), {headers: this.headers})
      .toPromise()
      .then(() => {
        this.asd=true;
        this.router.navigate(['/']);
        // this.router.navigate(['/']);
      });
      this.asd=true;
      this.updateProduct={};
      // this.popup.show(this.popup.options);
  }

  YourConfirmEvent(){
    this.router.navigate(['/']);
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.id = +params['id'];
    // });
    this.getAllProducts();
  }

}
