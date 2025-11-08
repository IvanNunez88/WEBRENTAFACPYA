import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../Shared/shared.module';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalVehiculoComponent } from './ModalVehiculo/ModalVehiculo.component';
import { VehiculoService } from '../../../layout/service/Vehiculo.service';

@Component({
    selector: 'app-Vehiculo',
    templateUrl: './Vehiculo.component.html',
    styleUrls: ['./Vehiculo.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class VehiculoComponent implements OnInit {
    mostrarLoading: boolean = false;
    ref: DynamicDialogRef | undefined;
    listaReporteVehiculo: rptVehiculo[] = [];
    columnasTabla: string[] = ['vehiculo', 'tamaño', 'capacidad', 'pRenta', 'estatus'];

    constructor(
        private messageService: MessageService,
        private _vehiculoServicio: VehiculoService,
        private dialog: DialogService
    ) {}

    async ngOnInit(): Promise<void> {
        await this.cargarTabla();
    }

    async registrarVehiculo() {
        this.ref = this.dialog.open(ModalVehiculoComponent, {
            header: 'Registrar Vehículo',
            width: '603px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            data: null
        });

        this.ref.onClose.subscribe(async (result) => {
            if (result) {
                await this.cargarTabla();
            }
        });
    }

    async editarVehiculo(vehiculo: rptVehiculo) {
        this.ref = this.dialog.open(ModalVehiculoComponent, {
            header: 'Editar Vehículo',
            width: '603px',
            modal: true,
            focusOnShow: false,
            closable: true,
            draggable: true,
            data: vehiculo
        });

        this.ref.onClose.subscribe(async (result) => {
            if (result) {
                await this.cargarTabla();
            }
        });
    }

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
