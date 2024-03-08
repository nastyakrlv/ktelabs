import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";
import {IItem} from "../../types/item.interface";
import {catchError, finalize, Observable, ReplaySubject, takeUntil, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  public id: string | null;
  public item: IItem = {} as IItem;
  public isLoadingItem: boolean;
  private onDestroy$: ReplaySubject<void>

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.onDestroy$ = new ReplaySubject<void>(1);
    this.isLoadingItem = true;
  }

  public ngOnInit(): void {
    if (this.id) {
      this.getItemById(this.id);
    }
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public getItemById(id: string): void {
    this.dataService.getItemById(id).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      takeUntil(this.onDestroy$),
      finalize(() => this.isLoadingItem = false)
    ).subscribe((item: IItem) => {
      this.item = item;
    })
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    alert('Непредвиденная ошибка');
    return throwError(() => error);
  }
}
