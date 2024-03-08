import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemsListComponent} from "./items-list/items-list.component";
import {ItemDetailComponent} from "./item-detail/item-detail.component";
import {AddItemComponent} from "./add-item/add-item.component";
import {StoreComponent} from "./store.component";


const storeRoutes: Routes = [
  {
    path: '',
    component: StoreComponent,
    children: [
      {path: '', redirectTo: 'items-list', pathMatch: 'full'},
      {path: 'items-list', component: ItemsListComponent},
      {path: 'items-list/:id', component: ItemDetailComponent},
      {path: 'add-item', component: AddItemComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(storeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StoreRoutingModule {
}
