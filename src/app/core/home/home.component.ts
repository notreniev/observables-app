import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ProductListComponent } from '../../entities/product/components/product-list/product-list.component';
import { ProductDetailComponent } from '../../entities/product/components/product-detail/product-detail.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavigationComponent, ProductListComponent, ProductDetailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
