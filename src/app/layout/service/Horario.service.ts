import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { IResponseApi } from '../../Interfaces/iResponseApi';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HorarioService {
    private apiUrl = environment.endpoint + 'Horario/';

    constructor(private http: HttpClient) {}

    listaCatHorario(): Observable<IResponseApi> {
        return this.http.get<IResponseApi>(`${this.apiUrl}ListaCatHorario`);
    }
}
