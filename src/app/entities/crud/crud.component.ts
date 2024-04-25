import { Component, OnInit } from '@angular/core';
import { CrudService } from './services/crud.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ItemModel } from './models/item.model';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss',
})
export class CrudComponent implements OnInit {
  list$!: Observable<ItemModel[]>;
  counts$!: Observable<number>;

  constructor(protected readonly crudService: CrudService) {}

  ngOnInit(): void {
    this.getList();
    this.getCounts();
  }

  getList(): void {
    this.list$ = this.crudService.items$;
  }

  markAsRead(item: ItemModel): void {
    this.crudService.markAsRead(item.id);
  }

  markAsDeleted(item: ItemModel): void {
    this.crudService.markAsDeleted(item.id);
  }

  getCounts(): void {
    this.counts$ = this.crudService.getTotalUnreads();
  }
}
