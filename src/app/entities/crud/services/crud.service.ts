import { Injectable } from '@angular/core';
import { Observable, map, of, combineLatest, BehaviorSubject, tap } from 'rxjs';
import { ItemModel } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private itemActionSubject$ = new BehaviorSubject<{
    action: 'READ' | 'DELETE' | '';
    value: string | number;
  }>({ action: '', value: '' });
  public itemActionSelected$ = this.itemActionSubject$.asObservable();

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

  items$ = combineLatest([this.getList(), this.itemActionSelected$]).pipe(
    map(([items, itemActionSubject]) => {
      if (itemActionSubject.action === 'READ') {
        const foundRead = items.find((i) => i.id === itemActionSubject.value);
        if (foundRead) {
          foundRead.read = true;
        }
      }

      if (itemActionSubject.action === 'DELETE') {
        const foundDeleted = items.findIndex(
          (i) => i.id === itemActionSubject.value
        );
        if (foundDeleted > -1) {
          items.splice(foundDeleted, 1);
        }
      }

      return items;
    })
  );

  markAsRead(itemId: number): void {
    this.itemActionSubject$.next({ action: 'READ', value: itemId });
  }

  markAsDeleted(itemId: number): void {
    this.itemActionSubject$.next({ action: 'DELETE', value: itemId });
  }

  getTotalUnreads(): Observable<number> {
    return this.items$.pipe(
      map((response) => response.filter((res) => !res.read).length),
      tap((response) => console.log('counting: ', response))
    );
  }
}
