import { Router } from '@angular/router';
import { EMPTY, Observable, forkJoin, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

import { TemplateEvent } from '@components/gefco/gefco-template/gefco-template.component';
import { Metadata, MetadataItem } from '@components/gefco/gefco-filters/gefco-filters.component';

import { AlertService } from '@services/alert.service';
import { CommonRestService } from '@services/common-rest.service';
import { RestService } from '@services/rest.service';
import { TableService } from '@services/table.service';
import { Constants } from '@utils/constants';
import { StorageUtils } from '@utils/storage.utils';
import { TableColumn } from '@models/table-column.model';
import { TableTemplate } from '@models/table-template.model';
import { environment } from '@envs/environment';

export abstract class BaseCrudComponent {

  public breadcrumb: MenuItem[];
  public allTemplates: TableTemplate[] = [];
  public currentTemplate: TableTemplate;
  public filtersMetadata: Metadata = {};
  public rows: any[] = [];
  public listPermission = false;
  public readPermission = false;
  public writePermission = false;
  public loading = true;

  private recoverTemplate: TableTemplate;

  protected constructor(protected alertService: AlertService, protected restService: RestService, protected commonRestService: CommonRestService, protected tableService: TableService, protected router: Router) {

  }

  public init(): Observable<void> {
    return this.loadPermissions().pipe(
      mergeMap(() => {
        if (this.listPermission) {
          this.saveMenuLog();
          return of(null);
        }

        this.router.navigate(['/home/permission-denied'], { skipLocationChange: true });
        return EMPTY;
      }),
      mergeMap(() => {
        return this.loadPaisesFiltersMetadata();
      }),
      mergeMap(() => {
        return this.loadFiltersMetadata();
      }),
      mergeMap(() => {
        return this.loadAll();
      })
    );
  }

  public useLocationFiltersMetadata(): void {
    this.filtersMetadata.pais = { component: 'select', selectCallback: (item: MetadataItem) => { this.onPaisSelected(item); }, placeholder: 'seleccione-pais' };
    this.filtersMetadata.provincia = { component: 'select', selectCallback: (item: MetadataItem) => { this.onProvinciaSelected(item); }, placeholder: 'seleccione-pais' };
    this.filtersMetadata.ciudad = { component: 'select', selectCallback: (item: MetadataItem) => { this.onCiudadSelected(item); }, placeholder: 'seleccione-provincia' };
    this.filtersMetadata.localidad = { component: 'select', placeholder: 'seleccione-ciudad' };
  }

  public onTemplateCreate(event: TemplateEvent): void {
    this.tableService.createTemplate(event.template).pipe(
      mergeMap((template) => {
        this.currentTemplate = new TableTemplate(template);
        StorageUtils.setTemplate(this.currentTemplate);
        return this.loadAll();
      })
    ).subscribe(() => {
      event.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public onTemplateUpdate(event: TemplateEvent): void {
    this.currentTemplate.name = event.template.name;
    this.currentTemplate.description = event.template.description;
    this.currentTemplate.publicTemplate = event.template.publicTemplate;
    StorageUtils.setTemplate(this.currentTemplate);
    this.tableService.updateTemplate(event.template).pipe(
      mergeMap(() => {
        return this.loadAll();
      })
    ).subscribe(() => {
      if (event.dialogRef) {
        event.dialogRef.close();
      }
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public onTemplateDelete(template: TableTemplate): void {
    this.tableService.deleteTemplate(template).pipe(
      mergeMap(() => {
        StorageUtils.setTemplate(null);
        return this.loadAll();
      })
    ).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public onTemplateSelect(template: TableTemplate): void {
    this.currentTemplate = template;
    StorageUtils.setTemplate(this.currentTemplate);
    this.recoverTemplate = new TableTemplate(this.currentTemplate);
    this.loadRows().subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
    if (template.id) {
      this.tableService.updateTemplateDateOfUse(template).subscribe(() => {
        // Nothing to do...
      }, (err) => {
        this.alertService.danger(err);
      });
    } else {
      for (const currentTemplate of this.allTemplates) {
        if (currentTemplate.id) {
          this.tableService.clearTemplateDateOfUse(currentTemplate).subscribe(() => {
            // Nothing to do...
          }, (err) => {
            this.alertService.danger(err);
          });
        }
      }
    }
  }

  public onTemplateRestart(): void {
    const index = this.allTemplates.findIndex((template) => {
      return template.id === this.currentTemplate.id;
    });
    this.currentTemplate = new TableTemplate(this.recoverTemplate);
    StorageUtils.setTemplate(this.currentTemplate);
    this.allTemplates[index] = this.currentTemplate;
    this.loadRows().subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public getDefaultTemplate(): TableTemplate {
    return this.allTemplates.find((template) => {
      return template.defaultTemplate;
    });
  }

  public onExportTable(tableColumns: TableColumn[]): void {
    this.tableService.exportRows(this.currentTemplate.crud, tableColumns).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      console.log(err);
      this.alertService.danger(err);
    });
  }

  public onFilterSearch(tableColumns: TableColumn[]): void {
    this.currentTemplate.columns = tableColumns;
    this.tableService.getRows(this.currentTemplate.crud, this.currentTemplate.columns).subscribe((rows) => {
      this.rows = rows;
      this.currentTemplate.pageFirst = 0;
      StorageUtils.setTemplate(this.currentTemplate);
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public loadRows(): Observable<void> {
    return this.tableService.getRows(this.currentTemplate.crud, this.currentTemplate.columns).pipe(
      mergeMap((rows) => {      
        this.rows = rows;
        return of(null);
      })
    );
  }

  public loadAll(): Observable<void> {
    return this.tableService.getTemplates(this.getCrudName()).pipe(
      mergeMap((templates) => {
        if (templates.length === 0) {
          return of(null);
        }
        this.allTemplates = templates;
        this.currentTemplate = !templates[0].dateOfUse ? this.getDefaultTemplate() : templates[0];
        this.recoverTemplate = new TableTemplate(this.currentTemplate);
        const storedTemplate = StorageUtils.getTemplate();
        if (storedTemplate && storedTemplate.crud === this.getCrudName()) {
          this.currentTemplate = templates.find(element => element.id == storedTemplate.id) ? storedTemplate : this.getDefaultTemplate();
        } else {
          StorageUtils.setTemplate(this.currentTemplate);
        }
        return this.loadRows();
      })
    );
  }

  public onPaisSelected(item: MetadataItem): void {
    this.filtersMetadata.provincia.items = [];
    this.filtersMetadata.ciudad.items = [];
    this.filtersMetadata.localidad.items = [];
    if (item) {
      this.commonRestService.find(Constants.PROVINCIA_PATH, { paisId: item.id }).subscribe((provinciasData) => {
        this.filtersMetadata.provincia.items = this.createMetadataItems(provinciasData);
        this.filtersMetadata.provincia.placeholder = 'seleccione-provincia';
      }, (err) => {
        this.alertService.danger(err);
      });
    }
  }

  public onProvinciaSelected(item: MetadataItem): void {
    this.filtersMetadata.ciudad.items = [];
    this.filtersMetadata.localidad.items = [];
    if (item) {
      this.commonRestService.find(Constants.CIUDAD_PATH, { provinciaId: item.id }).subscribe((ciudadesData) => {
        this.filtersMetadata.ciudad.items = this.createMetadataItems(ciudadesData);
        this.filtersMetadata.ciudad.placeholder = 'seleccione-ciudad';
      }, (err) => {
        this.alertService.danger(err);
      });
    }
  }

  public onCiudadSelected(item: MetadataItem): void {
    this.filtersMetadata.localidad.items = [];
    if (item) {
      this.commonRestService.find(Constants.LOCALIDAD_PATH, { ciudadId: item.id }).subscribe((localidadesData) => {
        this.filtersMetadata.localidad.items = this.createMetadataItems(localidadesData);
        this.filtersMetadata.localidad.placeholder = 'seleccione-localidad';
      }, (err) => {
        this.alertService.danger(err);
      });
    }
  }

  public createMetadataItems(itemsData: any[]): MetadataItem[] {
    return itemsData.map((itemData) => {
      return { id: itemData.id, description: itemData.descripcion };
    });
  }

  protected abstract getCrudName(): string;

  protected abstract getFunctionId(): string;

  protected abstract loadFiltersMetadata(): Observable<void>;

  private loadPermissions(): Observable<void> {
    return forkJoin(
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, { functionId: this.getFunctionId(), sistemaId: environment.sistemaId }),
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, { functionId: `${this.getFunctionId()}.Read`, sistemaId: environment.sistemaId }),
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, { functionId: `${this.getFunctionId()}.Write`, sistemaId: environment.sistemaId })
    ).pipe(
      mergeMap((permissions) => {
        this.listPermission = !permissions[0].denied;
        this.readPermission = !permissions[1].denied;
        this.writePermission = !permissions[2].denied;
        return of(null);
      })
    );
  }

  private loadPaisesFiltersMetadata(): Observable<void> {
    if (!this.filtersMetadata.pais) {
      return of(null);
    }
    return this.commonRestService.getAll(Constants.PAIS_PATH).pipe(
      mergeMap((paisesData) => {
        this.filtersMetadata.pais.items = this.createMetadataItems(paisesData);
        return of(null);
      })
    );
  }

  private saveMenuLog(): void {
    this.commonRestService.save(Constants.MENU_PATH, null, { sistemaId: environment.sistemaId, menuId: this.getFunctionId() }).subscribe(() => {
      // Nothing to do...
    });
  }
}
