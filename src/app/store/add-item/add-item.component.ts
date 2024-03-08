import {Component, OnDestroy, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {catchError, Observable, ReplaySubject, takeUntil, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent implements OnDestroy {
  public addNewItemForm: FormGroup;
  private onDestroy$: ReplaySubject<void>;

  @ViewChild('addNewItemFormReset') addNewItemFormReset!: NgForm;

  constructor(private dataService: DataService) {
    this.addNewItemForm = new FormGroup({
      name: new FormControl('', [Validators.required, this.nameValidator]),
      category: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, this.descriptionValidator]),
      price: new FormControl('', [Validators.required, this.priceValidator])
    });

    this.onDestroy$ = new ReplaySubject<void>(1);
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onSubmit(): void {
    this.dataService.addNewItem(this.addNewItemForm.value).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error)),
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      this.addNewItemFormReset.resetForm();
      alert("Товар успешно добавлен")
    })
  }

  private priceValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value || control.value === 0) {
      const price: number = control?.value;
      const validPrice: boolean = price > 0;

      return validPrice ? null : {invalidPrice: true};
    }
    return null
  }

  private descriptionValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const value: string = control?.value;
      const validLength: boolean = value.length <= 60;

      return validLength ? null : {invalidDescriptionLength: true};
    }
    return null
  }

  private nameValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const value: string = control.value;
      const validName: boolean = /^[A-Za-zА-Яа-я0-9\s]*$/.test(value);
      return validName ? null : {invalidName: true};
    }
    return null;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    alert('Непредвиденная ошибка');
    return throwError(() => error);
  }
}
