import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemsListComponent} from './items-list/items-list.component';
import {StoreRoutingModule} from "./store-routing.module";
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {AddItemComponent} from './add-item/add-item.component';
import {StoreComponent} from './store.component';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "./data.service";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ItemsListComponent, ItemDetailComponent, AddItemComponent, StoreComponent, HeaderComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [DataService]
})
export class StoreModule {
}
