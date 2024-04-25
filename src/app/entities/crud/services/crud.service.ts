import { Injectable } from '@angular/core';
import { Observable, map, of, combineLatest, BehaviorSubject, tap } from 'rxjs';
import { ItemModel } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private itemReadSubject$ = new BehaviorSubject<number>(0);
  public itemReadSelected$ = this.itemReadSubject$.asObservable();

  private itemDeletedSubject$ = new BehaviorSubject<number>(0);
  public itemDeletedSelected$ = this.itemDeletedSubject$.asObservable();

  constructor() {}

  private getList(): Observable<ItemModel[]> {
    return of([
      { id: 1, name: 'item 1', read: false },
      { id: 2, name: 'item 2', read: false },
      { id: 3, name: 'item 3', read: false },
      { id: 4, name: 'item 4', read: false },
      { id: 5, name: 'item 5', read: false },
    ]);
  }

  items$ = combineLatest([
    this.getList(),
    this.itemReadSubject$,
    this.itemDeletedSubject$,
  ]).pipe(
    map(([items, itemRead, itemDeleted]) => {
      if (itemRead) {
        const foundRead = items.find((i) => i.id === itemRead);
        if (foundRead) {
          foundRead.read = true;
        }
      }

      if (itemDeleted) {
        const foundDeleted = items.findIndex((i) => i.id === itemDeleted);
        if (foundDeleted > -1) {
          items.splice(foundDeleted, 1);
        }
      }

      return items;
    })
  );

  markAsRead(itemId: number): void {
    this.itemReadSubject$.next(itemId);
  }

  markAsDeleted(itemId: number): void {
    this.itemDeletedSubject$.next(itemId);
  }

  getTotalUnreads(): Observable<number> {
    return this.items$.pipe(
      map((response) => response.filter((res) => !res.read).length),
      tap((response) => console.log('counting: ', response))
    );
  }
}
