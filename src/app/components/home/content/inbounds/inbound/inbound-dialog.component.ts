import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Observable, of, forkJoin, EMPTY} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
//import {CalendarModule} from 'primeng/calendar';

import {BaseComponent} from '../../base.component';

import {AlertService} from '@app/services/alert.service'; // 'ngx-alerts';
import {RestService} from '@app/services/rest.service';
import {CommonRestService} from '@app/services/common-rest.service';
import {Constants} from '@app/utils/constants';
import {Helpers} from '@utils/helpers';
import {Inbound} from '@app/models/inbound.model';
import {InboundService} from '@app/services/inbound.service';
import {InboundGestion} from '@app/models/inbound-gestion.model';
import {environment} from '@envs/environment';
import {TableColumn} from '@models/table-column.model';
import {ComboOptions} from '@models/combo-options.model';
import {ConfirmationService} from 'primeng/api';
//import { runInThisContext } from 'vm';

@Component({
  selector: 'app-inbound-dialog',
  templateUrl: './inbound-dialog.component.html',
  providers: [ConfirmationService],
})
export class InboundDialogComponent extends BaseComponent implements OnInit {

  public displayFullDescription = Helpers.displayFullDescription;
  public loading: boolean;
  public viewing: boolean;
  public inbound: Inbound;
  public compareId = Helpers.compareId;
  public inboundId: string;
  public gestion: InboundGestion;
  public title: string;
  public gestionEditPermission = false;
  public tableColumn: TableColumn[];
  public multiple: String;
  public showDialogEta: boolean = false;
  public cambioEtaTable: any[];
  public histDescargaTable: any[];
  public historicoEstadoLiberacionTable: any[];
  public showDialogEstadoLiberacion: boolean = false;
  public showDialogSolicitudDescarga: boolean = false;
  public showConfirmarEntrega: boolean = false;
  public confirmed: boolean = false;

  // Autocomplete lists
  public gefRoTerminalList: string[];
  public gefRoDespachanteList: string[];
  public gefRoTipoCntList: string[];
  public gefRoUOList: string[];
  public comJdCompradorList: string[];

  public filteredGefRoTerminalList: string[];
  public filteredGefRoDespachanteList: string[];
  public filteredGefRoTipoCntList: string[];
  public filteredGefRoUOList: string[];
  public filteredComJdCompradorList: string[];

  //combo ok/no-ok
  public okCombo: ComboOptions[];

  //Fecha minima solicitud de descarga
  public minDate: Date;
  public comboProveedores: ComboOptions[];
  public asd: any;

  constructor(private alertService: AlertService, protected commonRestService: CommonRestService, protected restService: RestService, protected router: Router,  private activatedRoute: ActivatedRoute, private _location: Location
    ,         private inboundService: InboundService, private confirmationService: ConfirmationService) {
    super(commonRestService, router);
    this.breadcrumb = [
      Constants.PROCESS_LOGISTICS_BREADCRUMB,
      Constants.INBOUNDS_BREADCRUMB,
      Constants.DETALLE_INBOUNDS_BREADCRUMB,
    ];
  }

  ngOnInit(): void {
    this.multiple = Constants.INBOUND_MULTIPLES_VALORES;
    this.inboundId = this.activatedRoute.snapshot.paramMap.get(Constants.INBOUND_PATH);
   // if(this.inboundId == Constants.INBOUND_MULTIPLE){
    this.tableColumn = history.state.filtros? history.state.filtros : null;
    this.tableColumn ? sessionStorage.setItem('tableColumn', JSON.stringify(this.tableColumn)) : null;
    !this.tableColumn ? this.tableColumn = JSON.parse(sessionStorage.getItem('tableColumn')) : null;
    this.loadComboOk();
    this.minDate = new Date();
    
    this.viewing =  this.activatedRoute.snapshot.url[this.activatedRoute.snapshot.url.length - 1].path === 'view';

    forkJoin(
      super.init(),
      this.validateInit(
        this.activatedRoute.snapshot.url[this.activatedRoute.snapshot.url.length - 1].path
        , this.activatedRoute.snapshot.url[this.activatedRoute.snapshot.url.length - 2].path)
    ).pipe(
      mergeMap(() => {
        if(!this.tableColumn)
          return this.loadInbound(this.inboundId);
        else
          return this.loadInboundMultiple(this.tableColumn);
      }),
      mergeMap(() => {
        return this.loadAutocompletes();
      })
    ).subscribe(() => {
      this.title = this.viewing ? 'inbound.title.view' : (this.gestion.title + '.edit');
      this.loading = false;
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public onBackClicked(): void {
    this._location.back();
  }

  public clear(): void {
    this.inbound = new Inbound();
  }

  public updateInbound(): void {
    if (this.inbound.gefRoTurnoHora && isNaN(this.inbound.gefRoTurnoHora.getTime())){
      this.inbound.gefRoTurnoHora.setFullYear(Constants.DATE_TO_IGNORE_UPDATE);
    }
    
    this.inboundService.updateByGestion(this.tableColumn, this.gestion.id, this.inbound, '/inbound/').subscribe(async () => {
      this.alertService.success(Constants.EXITO);
      await Helpers.delay(1000);
      this.onBackClicked();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public updateInboundAlmacen(): void {
    this.setObservaciones();
    if(this.inbound.almJdOkDescarga != null  && !this.inbound.almJdOkDescarga && !this.fieldWasChanged())
      this.noChangesWarning();
    else
      this.updateInbound();
  }

  public onComJdCompradorChanged(): void {
    const filterValue = this.inbound.comJdComprador.toLowerCase();
    this.filteredComJdCompradorList =
      this.comJdCompradorList.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  public onGefRoTerminalChanged(): void {
    const filterValue = this.inbound.gefRoTerminal.toLowerCase();
    this.filteredGefRoTerminalList =
      this.gefRoTerminalList.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  public onGefRoDespachanteChanged(): void {
    const filterValue = this.inbound.gefRoDespachante.toLowerCase();
    this.filteredGefRoDespachanteList =
      this.gefRoDespachanteList.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  public onGefRoTipoCntChanged(): void {
    const filterValue = this.inbound.gefRoTipoCnt.toLowerCase();
    this.filteredGefRoTipoCntList =
      this.gefRoTipoCntList.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  public onGefRoUOChanged(): void {
    const filterValue = this.inbound.gefRoUO.toLowerCase();
    this.filteredGefRoUOList =
      this.gefRoUOList.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private setObservaciones(): void{
    if(this.inbound.almJdOkDescarga == null) {
      this.inbound.almObservSolicDescarga = this.inbound.almJdObservaciones;
      this.inbound.almObservacionDescarga = "";
    } else {
      this.inbound.almObservacionDescarga = this.inbound.almJdObservaciones;
      this.inbound.almObservSolicDescarga = "";
    }      
  }

  /*
  public isComJdCriticoDisabled(): boolean {
    return this.viewing || this.inbound.comJdCritico;
  }

  public onComJdCriticoClick(): void {
    this.inbound.comJdFechaCritico = new Date();
    this.inbound.comJdAudtCritico = this.inboundService.getComJdAudtCritico();
  }

*/
  protected getFunctionId(): string {
    return Constants.INBOUND_FUNCTION_ID;
  }

  private loadAutocompletes(): Observable<void> {
    const calls = [];
    if (!this.viewing && this.gestion == Constants.INBOUND_GESTION_IJDA) {
      calls.push(this.inboundService.getComJdCompradorList());
    } else if (!this.viewing && this.gestion == Constants.INBOUND_GESTION_GEFCO_OVS) {
      calls.push(this.inboundService.getGefRoTerminalList());
      calls.push(this.inboundService.getGefRoDespachanteList());
      calls.push(this.inboundService.getGefRoTipoCntList());
      calls.push(this.inboundService.getGefRoUOList());
    } else { return of(null); }
    return forkJoin(...calls).pipe(
      mergeMap((lists) => {
        if (!this.viewing && this.gestion == Constants.INBOUND_GESTION_IJDA) {
          this.comJdCompradorList = lists[0];
          this.filteredComJdCompradorList = this.comJdCompradorList;
        }
        if (!this.viewing && this.gestion == Constants.INBOUND_GESTION_GEFCO_OVS) {
          this.gefRoTerminalList = lists[0];
          this.gefRoDespachanteList = lists[1];
          this.gefRoTipoCntList = lists[2];
          this.gefRoUOList = lists[3];
          this.filteredGefRoTerminalList = this.gefRoTerminalList;
          this.filteredGefRoDespachanteList = this.gefRoDespachanteList;
          this.filteredGefRoTipoCntList = this.gefRoTipoCntList;
          this.filteredGefRoUOList = this.gefRoUOList;
        }
        return of(null);
      })
    );
  }

  private loadInbound(inboundId: string): Observable<void> {
    if (!inboundId) {
      this.inbound = new Inbound();
      return of(null);
    }

    if(inboundId.indexOf(","))
      return this.restService.get(Constants.INBOUND_PATH, {id: inboundId}).pipe(
        mergeMap((inboundData) => {
          this.inbound = new Inbound(inboundData);
          return of(null);

        })
      );
    return this.restService.get(Constants.INBOUND_PATH, {id: inboundId}).pipe(
      mergeMap((inboundData) => {
        this.inbound = new Inbound(inboundData);
      return of(null);

      })
    );
  }
  private loadInboundMultiple(params: TableColumn[]): Observable<void> {
    return forkJoin(
      this.inboundService.getMultiple(Constants.INBOUND_PATH + '/findForUpdate', params),
      this.commonRestService.get(Constants.CODIGO_FIND_PATH, {type: 'INB_SECTOR_DESCARGA'})
    ).pipe(
      mergeMap((inboundData) => {
        this.inbound = new Inbound(inboundData[0]);
        
        if(this.inbound.gefRoTurnoHora) {
          this.inbound.gefRoTurnoHora = new Date(this.inbound.gefRoTurnoHora);
        }
        if(this.inbound.almJdHoraSolicDescarga) {
          this.inbound.almJdHoraSolicDescarga = new Date(this.inbound.almJdHoraSolicDescarga);
        }
        if(this.inbound.almJdHorarioDeDescarga) {
          this.inbound.almJdHorarioDeDescarga = new Date(this.inbound.almJdHorarioDeDescarga);
        }

        if (this.inbound.almJdFechaSolicDescarga && this.inbound.almJdHoraSolicDescarga && this.inbound.almJdLugarSolicDescarga)
          this.showConfirmarEntrega = true;

      this.loadComboProveedores(inboundData[1]);
        return of(null);
      })
    );
  }
  
  private validateInit(action: string, gestion: string): Observable<void> {
    if (action === 'view') {
      return of(null);
    }
    this.gestion = this.inboundService.getGestion(gestion);
    if (this.gestion == null || (action != 'edit')) {
      this.router.navigate(['/home/permission-denied'], {skipLocationChange: true});
      return EMPTY;
    }
    return this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, {functionId: this.gestion.function, sistemaId: environment.sistemaId}).pipe(
      mergeMap((permission) => {
        if (!permission.denied) {
          return of(null);
        }
        this.router.navigate(['/home/permission-denied'], {skipLocationChange: true});
        return EMPTY;
      })
    );
  }

  public isComJdCriticoDisabled(): boolean {
    return this.viewing || this.inbound.comJdCritico === true;
  }

  public onComJdCriticoClick() {
    this.inbound.comJdFechaCritico = new Date();
    this.inbound.comJdAudtCritico = this.inboundService.getComJdAudtCritico();
  }

  public loadComboOk() { 
  this.okCombo = [];
  this.okCombo.push(new ComboOptions({option:'OK' , value: true}));
  this.okCombo.push(new ComboOptions({option:'NO OK' , value: false}));
  }

  public showDialog() {
    this.cambioEtaTable = this.inbound.histCambioEta;
    this.showDialogEta = true;
  }

  public showDialogEstLiberacion() {
    this.historicoEstadoLiberacionTable = this.inbound.histEstadosLiberacion;
    this.showDialogEstadoLiberacion = true;
  }

  public showDialogHistDescarga() {
    this.histDescargaTable = this.inbound.histDescarga;
    this.showDialogSolicitudDescarga = true;
  }

  public onEditRow(campo: string) {
    this.confirmationService.confirm({
      message: 'Si continúa, ésta acción no se puede deshacer.',
      accept: () => {
        this.inbound[campo] = null;
      },
  });
    
  }
  public numberOnly(event : any, field : any): boolean {
    let campo : string;
    if(field != undefined)
      campo = field.toString();
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (field == undefined || charCode != 46)) {
      return false;
    }
    if(field != undefined)
      if(charCode == 46 && campo.includes("."))
          return false;
    
    return true;
  }

  private loadComboProveedores(data: any[]) {
    this.comboProveedores = [];
    data.forEach(combo =>{
      (combo.activo)
        this.comboProveedores.push(new ComboOptions({option:combo.descripcion , value: combo.descripcion}));
    });
    
  }
  copyValues(event: Event) {
    if(event != null && !event){
      this.inbound.gefJdFechaDeDescarga = this.inbound.almJdFechaSolicDescarga;
      this.inbound.almJdHorarioDeDescarga = this.inbound.almJdHoraSolicDescarga;
      this.inbound.almJdLugarDescarga = this.inbound.almJdLugarSolicDescarga;
    }
  }

  public fieldWasChanged() : boolean {
    return !(this.inbound.gefJdFechaDeDescarga == this.inbound.almJdFechaSolicDescarga &&
     this.inbound.almJdHorarioDeDescarga == this.inbound.almJdHoraSolicDescarga &&
     this.inbound.almJdLugarDescarga == this.inbound.almJdLugarSolicDescarga);
  }

  public noChangesWarning() {
    this.confirmationService.confirm({
      message: 'Confirma que no realizará cambios en ningún campo?',
      accept: () => {
        this.inbound.almJdOkDescarga = true;
        this.updateInbound();
      },
    });
  }

}
