import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {PopupModule} from 'ng2-opd-popup' ;
import { ToasterService} from './toaster-service.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductSellComponent } from './product-sell/product-sell.component';
import { ShowInvoiceComponent } from './show-invoice/show-invoice.component';
import { UpdateProductQuantityComponent } from './update-product-quantity/update-product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    UpdateProductComponent,
    ProductSellComponent,
    ShowInvoiceComponent,
    UpdateProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: "", component: HomeComponent},
      {path: "product", component: ProductComponent},
      {path: "updateProduct/:id", component: UpdateProductComponent},
      {path: "sellProducts" , component: ProductSellComponent},
      {path: "invoice" , component: ShowInvoiceComponent},
      {path: "updateQuntity" , component: UpdateProductQuantityComponent}

    ]),
    PopupModule.forRoot(),
  ],
  providers: [ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
