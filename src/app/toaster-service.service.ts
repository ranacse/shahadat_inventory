import { Injectable } from '@angular/core';
import * as toastr from 'toastr';

@Injectable()
export class ToasterService {


  constructor() { }

  Success(title: string, message?:string){

    
    toastr.success(title,message);
  }

}
