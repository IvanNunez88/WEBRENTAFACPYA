import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../Shared/shared.module';
import { Table } from 'primeng/table';
import { VehiculoService } from '../../../layout/service/Vehiculo.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-Vehiculo',
    templateUrl: './Vehiculo.component.html',
    styleUrls: ['./Vehiculo.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class VehiculoComponent implements OnInit {
    mostrarLoading: boolean = false;
    listaReporteVehiculo: rptVehiculo[] = [];
    columnasTabla: string[] = ['vehiculo', 'tamaño', 'capacidad', 'pRenta', 'estatus'];

    constructor(
        private messageService: MessageService,
        private _vehiculoServicio: VehiculoService
    ) {}

    async ngOnInit(): Promise<void> {
        await this.cargarTabla();
    }

    async registrarVehiculo() {}

    async onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    async cargarTabla() {
        this.mostrarLoading = true;

        this._vehiculoServicio.listaVehiculos().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaReporteVehiculo = data.value;
                } else {
                    this.listaReporteVehiculo = [];
                }
            },
            complete: () => {
                this.mostrarLoading = false;
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un error, favor de contactar al administrador del sitio.', life: 3000 });
                this.mostrarLoading = false;
            }
        });
    }
}

interface rptVehiculo {
    idVehiculo: number;
    vehiculo: string;
    idTamaño: number;
    tamano: string;
    capacidad: number;
    pRenta: null;
    isActivo: boolean;
    estatus: string;
}
