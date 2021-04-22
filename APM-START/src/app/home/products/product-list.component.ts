
import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { Component, OnDestroy, OnInit } from "@angular/core"
import { Subscription } from "rxjs";

import { IProduct } from "./product";
import { Productservice } from "./product.service";

@Component({
    selector:'pm-products',
    templateUrl:'./product-list.component.html',
    styleUrls:['./product-list.components.css']
})
export class ProductListComponent implements OnInit,OnDestroy{
pageTitle:string='Product List'
imageWidth:number=50;
imageMargin:number=2;
showImage:boolean=false;
errorMessage:string='';
sub!: Subscription;
private _listFilter:string='';
get listFilter():string{
return this._listFilter;
}
set listFilter(v : string) {
    this._listFilter = v;
    console.log('In setter',v);
    this.filteredProducts=this.performFilter(v);
}


filteredProducts:IProduct[]=[];
products:IProduct[]=[

];

constructor(private productService:Productservice){}

performFilter(filterBy:string):IProduct[]{
filterBy=filterBy.toLocaleLowerCase();
return this.products.filter((product:IProduct)=>
    product.productName.toLocaleLowerCase().includes(filterBy)
);
}

toggleImage():void{
this.showImage=!this.showImage;
}

ngOnInit():void{
  this.sub=this.productService.getProducts().subscribe({
    next:products=>{this.products=products;
      this.filteredProducts=this.products;
    },
    error:err=>this.errorMessage=err
  });

}

ngOnDestroy():void{
  this.sub.unsubscribe();
}

onRatingClicked(message:string):void{
    this.pageTitle='Product List: '+ message;
}
}

