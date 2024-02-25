import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Review } from './entities/review/models/review.model';
import { Product } from './entities/product/models/product.model';
import { ProductData } from './entities/product/mocks/product.data';
import { ReviewData } from './entities/review/mocks/review.data';

export class AppData implements InMemoryDbService {
  createDb(): { products: Product[]; reviews: Review[] } {
    const products = ProductData.products;
    const reviews = ReviewData.reviews;
    return { products, reviews };
  }
}
