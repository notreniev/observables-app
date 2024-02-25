import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Component } from '@angular/core';
import { EMPTY, Subject, catchError, combineLatest, map } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

  public selectedProduct$ = this.productService.productSelected$;

  public vm$ = combineLatest([this.products$, this.selectedProduct$]).pipe(
    map(([products, selectedProduct]) => ({ products, selectedProduct })),
    catchError((err) => {
      this.errorMessage$Subject.next(err);
      return EMPTY;
    })
  );

  public onSelected(productId: number): void {
    this.productService.selectedProductChanged(productId);
  }
}
