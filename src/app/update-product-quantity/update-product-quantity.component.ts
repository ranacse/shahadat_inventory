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
import { ToasterService } from '../toaster-service.service';

@Component({
  selector: 'app-update-product-quantity',
  templateUrl: './update-product-quantity.component.html',
  styleUrls: ['./update-product-quantity.component.css']
})
export class UpdateProductQuantityComponent implements OnInit {

  constructor(private toasterService: ToasterService, private router: Router, private route: ActivatedRoute, private http: Http, private popup: Popup) { }


  products = [];
  updatedItem = [];
  productObj: object = {};
  asd: boolean = false;
  //id:number;
  updatePro = {};
  updateProduct ={
    name:'',
    quantity:null
  };
  updateProductQuan ={
    name:'',
    quantity:''
  };
  updatedQuantity: number;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  success() {
    this.toasterService.Success("Successfully Updated Product ", "Update Product");
  }

  getAllProducts = function () {
    
    this.http.get("http://localhost:3000/products").subscribe(
      (res: Response) => {
        this.products = res.json();
      }
    )

  }
  

  updateApi(){
debugger
    const url = `${"http://localhost:3000/updateProductQuantity"}`;
    this.http.put(url, JSON.stringify(this.productObj), { headers: this.headers }).subscribe( data  => { 
      console.log("PUT Request is successful ", data);
    },error  => {
      console.log("Rrror", error);
    });
  }

  notificationMessage(){
    this.success();
  }
  async updateQuantity(updateProductQuan) {
debugger
 
      this.updatePro = {};
      if(updateProductQuan.quantity== undefined || updateProductQuan.quantity==null){
        alert("Please input Quantity");
      }
      else if(updateProductQuan.name== undefined || updateProductQuan.name==null){
        alert("Please Select Product Name");
      }

      else{
        this.updatePro = this.products.filter(x => x.name == updateProductQuan.name);
        this.updatedQuantity = this.updatePro[0].Quantity + updateProductQuan.quantity;
        this.productObj = {
          'id': this.updatePro[0].id,
          "name": updateProductQuan.name,
          "Quantity": this.updatedQuantity
        };
        await this.updateApi();
        await this.notificationMessage();
      }
      
  
    
    
  }

  YourConfirmEvent() {
    this.router.navigate(['/']);
  }

  ngOnInit() {

    this.getAllProducts();
  }

}
