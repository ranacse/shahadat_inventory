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

@Component({
  selector: 'app-update-product-quantity',
  templateUrl: './update-product-quantity.component.html',
  styleUrls: ['./update-product-quantity.component.css']
})
export class UpdateProductQuantityComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: Http) { }

  products=[];
  updatedItem=[];
  productObj:object = {};
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

  // updateQuantity(name, quantity){
    
  //   let updateProduct =  this.products.filter(x => x.name == name)[0];

  //   let newQuantity=updateProduct.Quantity - quantity;
    
  //   this.updatedItem.push({ name: name, Quantity: newQuantity });
  //   const url = `${"http://localhost:3000/updateQuntity"}`;
  //   var body = JSON.stringify(this.updatedItem);

  //   var headerOptions = new Headers({ 'Content-Type': 'application/json' });
  //   var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });

  //   let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: cpHeaders });

  //   debugger

  //   return this.http.put(url, body, { headers: headerOptions }).map(res => res.json());
      

   
  // }

  updateQuantity(name, quantity) {
    
debugger
    this.updateProduct = this.products.filter(x => x.name == name);
    this.updatedQuantity=this.updateProduct[0].Quantity + quantity;
    this.productObj = {
      'id': this.updateProduct[0].id,
      "name": name,
      "Quantity": this.updatedQuantity
    };
    
    const url = `${"http://localhost:3000/products"}`;
    this.http.put(url, JSON.stringify(this.productObj), {headers: this.headers})
      .toPromise()
      .then(() => {
        this.router.navigate(['/']);
      })
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.id = +params['id'];
    // });
    this.getAllProducts();
  }

}
