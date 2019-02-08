import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private http: Http) { }
  confirmationString:string = "New product has been added";
  failConfirmationString:string = "Failed to add Product";
  isAdded: boolean = false;
  productObj:object = {};
  finalProduct:object={};
  // productName:any;
  // productQuantity:any;

  addNewProduct = function(product) {
    
    this.productObj = {
      "name": product.name,
      "Quantity": product.quantityProduct
    }
    debugger
    this.http.post("http://localhost:3000/products/", this.productObj).subscribe((res:Response) => {
      debugger
      if(res.status==200){
        this.isAdded = true;
        this.productName=null;
        this.productQuantity=null;
      }
     


    })
  }

  ngOnInit() {
  }

}
