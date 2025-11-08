import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { IResponseApi } from '../../Interfaces/iResponseApi';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TamanoService {
    private apiUrl = environment.endpoint + 'Tamano/';

    constructor(private http: HttpClient) {}

    listaCatTamano(): Observable<IResponseApi> {
        return this.http.get<IResponseApi>(`${this.apiUrl}ListaCatTamano`);
    }
}
