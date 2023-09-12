import {
  HttpClient,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  public getUserList(page: number) {
    return this.httpClient.get('https://reqres.in/api/users', {
      params: this.getPageParam(page),
    });
  }

  private getPageParam(page: number) {
    return new HttpParams({
      fromObject: { page },
    });
  }
}
