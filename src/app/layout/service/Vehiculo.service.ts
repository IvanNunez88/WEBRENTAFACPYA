import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { IResponseApi } from '../../Interfaces/iResponseApi';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VehiculoService {
    private apiUrl = environment.endpoint + 'Vehiculo/';

    constructor(private http: HttpClient) {}

    listaVehiculos(): Observable<IResponseApi> {
        return this.http.get<IResponseApi>(`${this.apiUrl}ListaVehiculos`);
    }
}
