import { Injectable } from '@angular/core';
import { Bebida } from '../models/bebida.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BebidasService {

  private API_URL = 'http://localhost:3000';
  private endpoint = 'bebidas';

  constructor(private http: HttpClient) { } 

  public listarBebidas(): Observable<Bebida[]> {
    return this.http.get<Bebida[]>(`${this.API_URL}/${this.endpoint}`)
    .pipe(catchError(this.pegaErro));
  }

  public pegarBebida(id: string): Observable<Bebida> {
    return this.http.get<Bebida>(`${this.API_URL}/${this.endpoint}/${id}`)
    .pipe(catchError(this.pegaErro));
  }

  public cadastrarBebida(bebida: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${this.endpoint}`, bebida)
    .pipe(catchError(this.pegaErro));
  }

  public alterarBebida(id: string, bebida: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${this.endpoint}/${id}`, bebida)
    .pipe(catchError(this.pegaErro));
  }

  public alterarNomeBebida(id: string, bebida: any): Observable<any> {
    return this.http.patch<any>(`${this.API_URL}/${this.endpoint}/${id}`, bebida)
    .pipe(catchError(this.pegaErro));
  }

  public excluirBebida(id: string): Observable<any> {
    console.log(`${this.API_URL}/${this.endpoint}/${id}`)
    return this.http.delete<any>(`${this.API_URL}/${this.endpoint}/${id}`)
    .pipe(catchError(this.pegaErro));
  }

  private pegaErro(error: HttpErrorResponse): Observable<any> {
    console.log("Ocorreu um erro: ", error);
    return throwError(() => error);
  }
}
