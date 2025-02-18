import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Carne } from '../models/carne.interface';
import { Bebida } from '../models/bebida.interface';

@Injectable({
  providedIn: 'root'
})
export class CarnesService {
  private API_URL = 'http://localhost:3000';
  private endpoint = 'carnes';

  constructor(private http: HttpClient) { } 

  public listarCarnes(): Observable<Carne[]> {
    return this.http.get<Carne[]>(`${this.API_URL}/${this.endpoint}`)
    .pipe(catchError(this.pegaErro));
  }

  public pegarCarne(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${this.endpoint}/${id}`)
    .pipe(catchError(this.pegaErro));
  }

  public cadastrarCarne(carne: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${this.endpoint}`, carne)
    .pipe(catchError(this.pegaErro));
  }

  public alterarCarne(id: string, carne: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${this.endpoint}/${id}`, carne)
    .pipe(catchError(this.pegaErro));
  }

  public alterarNomeCarne(id: string, carne: any): Observable<any> {
    return this.http.patch<any>(`${this.API_URL}/${this.endpoint}/${id}`, carne)
    .pipe(catchError(this.pegaErro));
  }

  public excluirCarne(id: string): Observable<any> {
    console.log(`${this.API_URL}/${this.endpoint}/${id}`)
    return this.http.delete<any>(`${this.API_URL}/${this.endpoint}/${id}`)
    .pipe(catchError(this.pegaErro));
  }

  private pegaErro(error: HttpErrorResponse): Observable<any> {
    console.log("Ocorreu um erro: ", error);
    return throwError(() => error);
  }
}
