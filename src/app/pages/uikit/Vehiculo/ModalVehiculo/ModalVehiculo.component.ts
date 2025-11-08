import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../Shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TamanoService } from '../../../../layout/service/Tamano.service';
import { VehiculoService } from '../../../../layout/service/Vehiculo.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-ModalVehiculo',
    templateUrl: './ModalVehiculo.component.html',
    styleUrls: ['./ModalVehiculo.component.css'],
    standalone: true,
    imports: [SharedModule]
})
export class ModalVehiculoComponent implements OnInit {
    boton: string = 'Guardar';
    marginLeft: string = '485px';
    mostrarLoading: boolean = false;
    mostrarSwitch: boolean = false;
    frmVehiculo: FormGroup;
    vehiculo?: rptVehiculo;
    listaCatTamano: iCatTamano[] = [];

    constructor(
        private ref: DynamicDialogRef,
        private fb: FormBuilder,
        private config: DynamicDialogConfig,
        private _tamanoServicio: TamanoService,
        private _vehiculoServicio: VehiculoService,
        private messageService: MessageService
    ) {
        this.frmVehiculo = this.fb.group({
            vehiculo: ['', Validators.required],
            idTamano: [0, Validators.required],
            capacidad: ['', Validators.required],
            pRenta: ['', Validators.required],
            isEstatus: []
        });

        if (this.config.data != null) {
            this.vehiculo = this.config.data as rptVehiculo;
            this.boton = 'Actualizar';
            this.marginLeft = '480px';
            this.mostrarSwitch = true;

            this.frmVehiculo.patchValue({
                vehiculo: this.vehiculo.vehiculo,
                idTamano: this.vehiculo.idTamaño,
                capacidad: this.vehiculo.capacidad,
                pRenta: this.vehiculo.pRenta,
                isEstatus: this.vehiculo.isActivo
            });
        }
    }

    async ngOnInit(): Promise<void> {
        await this.cargarCatTamano();
    }

    private async cargarCatTamano() {
        this._tamanoServicio.listaCatTamano().subscribe({
            next: async (data) => {
                if (data.status) {
                    this.listaCatTamano = data.value;
                }
            }
        });
    }

    async guardar_editarVehiculo() {
        this.mostrarLoading = true;

        if (this.vehiculo == null) {
            // Guardar
            const dicDatos: Record<string, any> = {
                descrip: this.frmVehiculo.value.vehiculo,
                idTamaño: this.frmVehiculo.value.idTamano,
                capacidad: this.frmVehiculo.value.capacidad,
                pRenta: this.frmVehiculo.value.pRenta
            };

            this._vehiculoServicio.agregarVehiculo(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Vehículo actualizado', life: 3000 });
                        this.ref.close(true);
                    } else {
                        this.mostrarLoading = false;
                        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: data.msg, life: 3000 });
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
        } else {
            // Editar
            const dicDatos: Record<string, any> = {
                idVehiculo: this.vehiculo.idVehiculo,
                descrip: this.frmVehiculo.value.vehiculo,
                idTamaño: this.frmVehiculo.value.idTamano,
                capacidad: this.frmVehiculo.value.capacidad,
                pRenta: this.frmVehiculo.value.pRenta,
                isEstatus: this.frmVehiculo.value.isEstatus
            };

            this._vehiculoServicio.actualizarVehiculo(dicDatos).subscribe({
                next: async (data) => {
                    if (data.status) {
                        this.messageService.add({ severity: 'success', summary: 'Información', detail: 'Vehículo actualizado', life: 3000 });
                        this.ref.close(true);
                    } else {
                        this.mostrarLoading = false;
                        this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: data.msg, life: 3000 });
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

interface iCatTamano {
    idTamaño: number;
    descrip: string;
}
