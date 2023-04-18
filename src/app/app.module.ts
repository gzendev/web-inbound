import {NgModule, LOCALE_ID} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {registerLocaleData} from '@angular/common';
import es from '@angular/common/locales/es';
import en from '@angular/common/locales/en';
import pt from '@angular/common/locales/pt';

registerLocaleData(es);
registerLocaleData(en); 
registerLocaleData(pt);

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatGridListModule,
  DateAdapter,
  MatSnackBarModule
} from '@angular/material';



import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {AgmCoreModule} from '@agm/core';
import {AlertModule} from 'ngx-alerts';
import {NgxMaskModule} from 'ngx-mask';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {PickListModule} from 'primeng/picklist';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {MessageModule} from 'primeng/message';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {TreeModule} from 'primeng/tree';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';


// Font Awesome
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faAddressBook} from '@fortawesome/free-solid-svg-icons/faAddressBook';
import {faChevronCircleDown} from '@fortawesome/free-solid-svg-icons/faChevronCircleDown';
import {faChevronCircleUp} from '@fortawesome/free-solid-svg-icons/faChevronCircleUp';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons/faEllipsisV';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen';
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt';

library.add(faEye);
library.add(faPen);
library.add(faTrash);
library.add(faAddressBook);
library.add(faEllipsisV);
library.add(faChevronCircleUp);
library.add(faChevronCircleDown);
library.add(faMapMarkedAlt);

// Routes
import {AppRoutes} from '@app/app.routes';

// Components
// ***** Common ******
import {AppComponent} from '@app/app.component';
import {LoginComponent} from '@components/login/login.component';
import {HomeComponent} from '@components/home/home.component';
import {HeaderComponent} from '@components/home/header/header.component';
import {MenuComponent} from '@components/home/menu/menu.component';
import {MenuItemsComponent} from '@components/home/menu/menu-items/menu-items.component';
import {ContentComponent} from '@components/home/content/content.component';
import {PermisosRolComponent} from '@components/home/content/roles/permisos-rol/permisos-rol.component';
import {RolesComponent} from '@components/home/content/roles/roles.component';
import {PermissionDeniedComponent} from '@components/home/content/permission-denied/permission-denied.component';
import {AsignarCuentasRolesComponent} from '@components/home/content/asignar-cuentas-roles/asignar-cuentas-roles.component';
import {ProfileComponent} from '@app/components/home/content/profile/profile.component';
import {ConfigurationComponent} from '@components/home/content/configuration/configuration.component';


// ***** WEBv2 ******
import {InboundsComponent} from '@components/home/content/inbounds/inbounds.component';
import {InboundPiezasComponent} from '@components/home/content/inbounds/pieza/inbound-pieza.component';
import {OutboundVehiculosComponent} from '@app/components/home/content/inbounds/vehiculo/outbound-vehiculo.component';
import {OutboundVehiculosMapComponent} from '@app/components/home/content/inbounds/vehiculo/map/outbound-vehiculo-map.component';



// Shared Components
import {GefcoImporterComponent} from '@components/gefco/gefco-importer/gefco-importer.component';
import {GefcoTableComponent} from '@components/gefco/gefco-table/gefco-table.component';
import {GefcoTemplateComponent} from '@components/gefco/gefco-template/gefco-template.component';
import {GefcoFiltersComponent} from '@components/gefco/gefco-filters/gefco-filters.component';
import {GefcoMatFilterComponent} from '@components/gefco/gefco-mat-filter/gefco-mat-filter.component';
import {AuditComponent} from '@components/home/general/audit/audit.component';
import {EmailsComponent} from '@components/home/general/emails/emails.component';
import {TelefonosComponent} from '@components/home/general/telefonos/telefonos.component';
import {BreadcrumbComponent} from '@components/home/general/breadcrumb/breadcrumb.component';

// Dialogs
// **** Common ****
import {ConfirmDialogComponent} from '@components/home/general/confirm-dialog/confirm-dialog.component';
import {DeleteRowDialogComponent} from '@components/gefco/gefco-table/delete-row-dialog/delete-row-dialog.component';
import {TemplateDialogComponent} from '@components/gefco/gefco-template/template-dialog/template-dialog.component';
import {ImporterDialogComponent} from '@app/components/gefco/gefco-importer/importer-dialog/importer-dialog.component';
import {EmailDialogComponent} from '@components/home/general/emails/email-dialog/email-dialog.component';
import {TelefonoDialogComponent} from '@components/home/general/telefonos/telefono-dialog/telefono-dialog.component';
import {RolDialogComponent} from '@components/home/content/roles/rol-dialog/rol-dialog.component';
import {AsignarCuentasRolesDialogComponent} from '@components/home/content/asignar-cuentas-roles/asignar-cuentas-roles-dialog/asignar-cuentas-roles-dialog.component';

// **** WEBv2 ****
import {InboundDialogComponent} from './components/home/content/inbounds/inbound/inbound-dialog.component';
import {InboundPiezaDialogComponent} from './components/home/content/inbounds/pieza/inbound-pieza-dialog.component';


// Services
// **** Common ****
import {AuthenticationService} from '@services/authentication.service';
import {RestService} from '@services/rest.service';
import {CommonRestService} from '@services/common-rest.service';
import {TableService} from '@services/table.service';
import {CommonEmailService} from '@services/common-email.service';
import {CommonTableService} from '@services/common-table.service';
import {ProveedorPinService} from '@services/proveedor-pin.service';
import {EmailService} from '@services/email.service';
import {AlertService} from '@services/alert.service';
import {EventService} from '@services/event.service';
// **** WEBv2 ****
import {InboundService} from '@services/inbound.service';
import {ConfigurationEmailService} from '@services/configuration-email.service';

// Utils
import {AuthGuard} from '@utils/auth.guard';
import {AngularMaterialDateAdapter, MaxValidatorDirective, MinValidatorDirective} from '@utils/angular.utils';
import {StorageUtils} from '@utils/storage.utils';
import { RecuperoComponent } from './components/login/recupero/recupero.component';
import { EmailListComponent } from './components/home/content/configuration/email/email-list/email-list.component';
import { ConcesionariaSelectComponent } from './components/home/content/configuration/email/concesionaria-select/concesionaria-select.component';
import { BocasSelectComponent } from './components/home/content/configuration/email/bocas-select/bocas-select.component';
// import {environment} from '@envs/environment';

// AoT requires an exported function for factories
export function httpLoaderFactory(httpClient: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

export function getIdioma(): string {
  const idioma = StorageUtils.getIdioma();
  let localeId;
  if (idioma && idioma === 'en') {
    localeId = 'en-US-POSIX';
  } else if (idioma && idioma === 'pt') {
    localeId = 'pt-BR';
  } else {
    localeId = 'es-ES';
  }
  return localeId;
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    AmazingTimePickerModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 10000, position: 'right'}),
    NgxMaskModule.forRoot(),
    AgmCoreModule.forRoot({
      // apiKey: environment.googleApiKey,
      libraries: ['places'],
    }),
    RouterModule.forRoot(AppRoutes.listRoutes()),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    BreadcrumbModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    FlexLayoutModule,
    LoadingBarHttpClientModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    PickListModule,
    TreeModule,
    ToggleButtonModule,
    TriStateCheckboxModule,
    TableModule,
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,
    FontAwesomeModule,
    MatSnackBarModule
  ],
  declarations: [
    // **** Common ****
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    MenuItemsComponent,
    ContentComponent,
    RolesComponent,
    PermisosRolComponent,
    PermissionDeniedComponent,
    AsignarCuentasRolesComponent,
    ProfileComponent,
    ConfigurationComponent,

    // **** WEBv2 ****
    InboundsComponent,
    InboundPiezasComponent,
    OutboundVehiculosComponent,
    OutboundVehiculosMapComponent,

    // Shared Components
    GefcoTableComponent,
    GefcoTemplateComponent,
    GefcoFiltersComponent,
    GefcoImporterComponent,
    GefcoMatFilterComponent,
    AuditComponent,
    EmailsComponent,
    TelefonosComponent,
    BreadcrumbComponent,
    // Dialogs
    // **** Common ****
    DeleteRowDialogComponent,
    TemplateDialogComponent,
    ImporterDialogComponent,
    EmailDialogComponent,
    TelefonoDialogComponent,
    ConfirmDialogComponent,
    RolDialogComponent,
    AsignarCuentasRolesDialogComponent,

    // **** WEBv2 ****
    InboundDialogComponent,
    InboundPiezaDialogComponent,

    // Directives
    MinValidatorDirective,
    MaxValidatorDirective,
    RecuperoComponent,
    EmailListComponent,
    ConcesionariaSelectComponent,
    BocasSelectComponent,

  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    RestService,
    CommonRestService,
    TableService,
    CommonTableService,
    EmailService,
    CommonEmailService,
    ProveedorPinService,
    AlertService,
    EventService,
    MessageService,
    {provide: DateAdapter, useClass: AngularMaterialDateAdapter},
    {provide: LOCALE_ID, useValue: getIdioma()},
    InboundService,
    ConfirmDialogModule,
    ConfigurationEmailService,
    GefcoFiltersComponent
  ],
  entryComponents: [
    // **** Commons ****
    DeleteRowDialogComponent,
    TemplateDialogComponent,
    ImporterDialogComponent,
    EmailDialogComponent,
    TelefonoDialogComponent,
    ConfirmDialogComponent,
    RolDialogComponent,

    // **** WEBv2 ****
    InboundDialogComponent,
    InboundPiezaDialogComponent

  ],
})
export class AppModule {

}
