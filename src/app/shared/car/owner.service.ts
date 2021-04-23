import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OwnerService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public CAR_API = this.API + '/owners';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/owners');
  }

  get(id: string) {
    return this.http.get(this.CAR_API + '/' + id);
  }

  save(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['href']) {
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.CAR_API, owner);
    }
    return result;
  }

  delete(href: string) {
    return this.http.delete(href);
  }
}
