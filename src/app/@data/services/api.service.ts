import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';

import { ImagenTemp } from '../model/imagen/imagenTemp';

@Injectable()
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  requestFilter(request: any): string {
    let api = '';
    Object.keys(request).forEach((key) => {
      const oldVal = request[key];
      const newVal =
        oldVal || oldVal === 0
          ? typeof oldVal === 'string'
            ? oldVal.trim()
            : oldVal
          : null;
      if (newVal || newVal === 0) {
        api += `${key}=${newVal}&`;
      }
    });
    api = api.substr(0, api.length - 1);
    return api;
  }

  public formatErrors(err: HttpErrorResponse) {
    //debuger;
    const messageError = err.error ? err.error : err;
    if (
      err &&
      err.error &&
      err.error.status &&
      err.error.status.error &&
      err.error.status.error.messages
    ) {
      // Extract the error message from payload.message
      const errorMessage = err.error.payload ? err.error.payload.message : 'An error occurred';
      return throwError(errorMessage);
    }
    return throwError(messageError);
  }

  get(path: string, params?: any): Observable<any> {
    return this.http.get(path, { params }).pipe(
      catchError((error) => {
        //mensje
        return this.formatErrors(error);
      })
    );
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(path, body).pipe(
      catchError((error) => {
        //mensje
        return this.formatErrors(error);
      })
    );
  }

  patch(path: string, body: object = {}): Observable<any> {
    return this.http.patch(path, body).pipe(
      catchError((error) => {
        //mensje
        return this.formatErrors(error);
      })
    );
  }

  post(path: string, body: any): Observable<any> {
    //debuger;
    return this.http.post(path, body).pipe();
  }

  // ... (other methods)


  /*postToFile(path: string, body: any, file: any): Observable<any> {
    const formData: FormData = new FormData();
   

    formData.append('archivo', file);

    let params = new HttpParams();
    params = params.append('archivo', file);

    const req = new HttpRequest('POST', path, params, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
*/
  postToFile(path: string, body: ImagenTemp): Observable<any> {
    return this.http.post(path, body).pipe(
      catchError((error) => {
        //mensje
        return this.formatErrors(error);
      })
    );
  }
  postFile(path: string, body: FormData): Observable<any> {
    return this.http.post(path, body).pipe(
      catchError((error) => {
        return this.formatErrors(error);
      })
    );
  }
  createFormdata(imagenTemp: ImagenTemp) {
    const formdata = new FormData();
    //    const json = JSON.stringify(body);
    //formdata.append('archivo', imagenTemp?.imagenTempFile?.file);
    return formdata;
  }
  putHTML(path: string, body: object = {}): Observable<any> {
    return this.http
      .put(path, body, {
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          //mensje
          return this.formatErrors(error);
        })
      );
  }

  postHTML(path: string, body: object = {}): Observable<any> {
    return this.http
      .post(path, body, {
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          //mensje
          return this.formatErrors(error);
        })
      );
  }

  getHTML(path: string): Observable<any> {
    return this.http
      .get(path, {
        responseType: 'text',
      })
      .pipe(
        catchError((error) => {
          //mensje
          return this.formatErrors(error);
        })
      );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(path).pipe(
      catchError((error) => {
        //mensje
        return this.formatErrors(error);
      })
    );
  }
}
