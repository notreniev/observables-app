import { Component, LOCALE_ID } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {
  AsyncPipe,
  CommonModule,
  JsonPipe,
  NgIf,
  getLocaleId,
} from '@angular/common';
import { combineLatest, filter, map } from 'rxjs';
import { LocalizedString } from '@angular/compiler';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  public pageTitle = 'Product Details';

  constructor(protected productService: ProductService) {}

  public product$ = this.productService.productSelected$.pipe(
    filter((product) => Boolean(product)),
    map((product) => product)
  );
}
