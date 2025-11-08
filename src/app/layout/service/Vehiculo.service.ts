import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { IResponseApi } from '../../Interfaces/iResponseApi';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VehiculoService {
    private urlApi = environment.endpoint + 'Vehiculo/';

    constructor(private http: HttpClient) {}

    listaVehiculos(): Observable<IResponseApi> {
        return this.http.get<IResponseApi>(`${this.urlApi}ListaVehiculos`);
    }

    agregarVehiculo(pDicDatos: Record<string, any>): Observable<IResponseApi> {
        return this.http.request<IResponseApi>('post', `${this.urlApi}AgregarVehiculo`, {
            body: {
                descrip: pDicDatos['descrip'],
                idTamaño: pDicDatos['idTamaño'],
                capacidad: pDicDatos['capacidad'],
                pRenta: pDicDatos['pRenta']
            }
        });
    }

    actualizarVehiculo(pDicDatos: Record<string, any>): Observable<IResponseApi> {
        return this.http.request<IResponseApi>('put', `${this.urlApi}ActualizarVehiculo`, {
            body: {
                idVehiculo: pDicDatos['idVehiculo'],
                descrip: pDicDatos['descrip'],
                idTamaño: pDicDatos['idTamaño'],
                capacidad: pDicDatos['capacidad'],
                pRenta: pDicDatos['pRenta'],
                isEstado: pDicDatos['isEstatus']
            }
        });
    }
}
