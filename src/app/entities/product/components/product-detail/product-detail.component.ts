import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { combineLatest, filter, map } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgIf],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  public pageTitle = 'Product Details';

  constructor(protected productService: ProductService) {}

  // public product$ = this.productService.productSelected$;

  public product$ = this.productService.productSelected$.pipe(
    filter((product) => Boolean(product)),
    map((product) => product)
  );
}
