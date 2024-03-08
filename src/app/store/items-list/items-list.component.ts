import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {IItem} from "../../types/item.interface";
import {catchError, finalize, Observable, ReplaySubject, takeUntil, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss'
})
export class ItemsListComponent implements OnInit, OnDestroy {
  public items: IItem[] = [];
  public isLoadingList: boolean;
  private onDestroy$: ReplaySubject<void>

  constructor(private dataService: DataService) {
    this.onDestroy$ = new ReplaySubject<void>(1);
    this.isLoadingList = true;
  }

  public ngOnInit(): void {
    this.getItems();
  }

  public ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public getItems(): void {
    this.dataService.getItems().pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      finalize(() => this.isLoadingList = false),
      takeUntil(this.onDestroy$)
    ).subscribe((items: IItem[]) => {
      this.items = items;
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    alert('Непредвиденная ошибка');
    return throwError(() => error);
  }
}
