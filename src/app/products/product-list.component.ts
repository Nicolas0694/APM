import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { Productservice } from "./product.service";


@Component({
    templateUrl: './product-list.component.html',
    styleUrls : ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
 
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage : Boolean = false;
    errorMessage: any;
    sub: Subscription | undefined; // For typescript strict checking 


    constructor(private productService : Productservice) {


    }

 
    private _listFilter : string = '';
    get listFilter(): string {

      return this._listFilter;
    }
    set listFilter(value : string) {
      this._listFilter = value;
      console.log('in setter ', value);
      this.filteredProducts = this.performFilter(value);

    }

    ngOnInit() : void {
      this.sub = this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        }, error: err => this.errorMessage = err
      });
    }

    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }

    filteredProducts : IProduct[] = [];

    products : IProduct[] = [];

    performFilter(filterBy : string) : IProduct[] {

      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product : IProduct ) =>
        product.productName.toLocaleLowerCase().includes(filterBy));
      
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    onRatingClicked(message : string): void {
      this.pageTitle = 'Product List: '+ message;
    }

}