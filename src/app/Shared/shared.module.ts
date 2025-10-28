import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppConfigurator } from '../layout/component/app.configurator';

// COMPONENTES PRIMENG
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TagModule } from 'primeng/tag';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import localeEsMX from '@angular/common/locales/es-MX';
import { FileUploadModule } from 'primeng/fileupload';

import { DatePipe } from '@angular/common';
registerLocaleData(localeEsMX, 'es-MX');

@NgModule({
    declarations: [],
    imports: [CommonModule, AppConfigurator],
    exports: [
        CommonModule,
        DatePickerModule,
        MultiSelectModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        RippleModule,
        FloatLabelModule,
        ProgressBarModule,
        ToastModule,
        MessageModule,
        AppConfigurator,
        TableModule,
        ToolbarModule,
        IconFieldModule,
        InputIconModule,
        SelectModule,
        ToggleSwitchModule,
        DynamicDialogModule,
        DialogModule,
        InputGroupModule,
        InputGroupAddonModule,
        TooltipModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        InputNumberModule,
        KeyFilterModule,
        InputMaskModule,
        TagModule,
        FileUploadModule
    ],
    providers: [DatePipe, MessageService, DialogService, ConfirmationService, { provide: LOCALE_ID, useValue: 'es-MX' }]
})
export class SharedModule {}
