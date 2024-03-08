import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IItem} from "../types/item.interface";

@Injectable()
export class DataService {
  private apiUrl: string = 'http://localhost:3000/items';

  constructor(private http: HttpClient) { }

  public getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.apiUrl);
  }

  public getItemById(id:string): Observable<IItem> {
    return this.http.get<IItem>(this.apiUrl + `/${id}`);
  }

  public addNewItem(item: IItem): Observable<any> {
    return this.http.post<IItem>(this.apiUrl, item);
  }
}
