import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Component } from '@angular/core';
import { EMPTY, Subject, catchError } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, JsonPipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  public pageTitle = 'Produts list';
  protected errorMessage$Subject = new Subject<string>();
  public errorMessage$ = this.errorMessage$Subject.asObservable();

  constructor(protected productService: ProductService) {}

  public products$ = this.productService.products$.pipe(
    catchError((err) => {
      this.errorMessage$Subject.next(err);
      return EMPTY;
    })
  );

  public onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
