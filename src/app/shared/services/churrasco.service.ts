import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Churrasco } from '../models/churrasco.interface';

@Injectable({
  providedIn: 'root'
})
export class ChurrascoService {
private API_URL = 'http://localhost:3000';
  private endpoint = 'churrascos';

  constructor(private http: HttpClient) { } 

  public listarChurrascos(): Observable<Churrasco[]> {
    return this.http.get<Churrasco[]>(`${this.API_URL}/${this.endpoint}`)
    .pipe(catchError(this.pegaErro));
  }

  public pegarChurrasco(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${this.endpoint}/${id}`)
    .pipe(catchError(this.pegaErro));
  }

  public cadastrarChurrasco(churrasco: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/${this.endpoint}`, churrasco)
    .pipe(catchError(this.pegaErro));
  }

  public alterarChurrasco(id: string, churrasco: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${this.endpoint}/${id}`, churrasco)
    .pipe(catchError(this.pegaErro));
  }

  public alterarNomeChurrasco(id: string, churrasco: any): Observable<any> {
    return this.http.patch<any>(`${this.API_URL}/${this.endpoint}/${id}`, churrasco)
    .pipe(catchError(this.pegaErro));
  }

  public excluirChurrasco(id: string): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${this.endpoint}/${id}`)
    .pipe(catchError(this.pegaErro));
  }

  private pegaErro(error: HttpErrorResponse): Observable<any> {
    console.log("Ocorreu um erro: ", error);
    return throwError(() => error);
  }
}
