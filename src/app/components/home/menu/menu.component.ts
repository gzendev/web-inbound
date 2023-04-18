import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {mergeMap} from 'rxjs/operators';

import {CommonRestService} from '@services/common-rest.service';
import {AlertService} from '@services/alert.service';
import {Constants} from '@utils/constants';
import {Menu} from '@models/menu.model';
import {environment} from '@envs/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {

  public menus: Menu[];
  public menusRecientes: Menu[];
  public menusFrecuentes: Menu[];

  @Output()
  public toogleEvent = new EventEmitter<void>();

  constructor(private alertService: AlertService, private commonRestService: CommonRestService) {

  }

  public onToogleSideNav(): void {
    this.toogleEvent.emit();
  }

  public ngOnInit(): void {
    this.commonRestService.get(Constants.MENU_INBOUND_PATH, {sistemaId: environment.sistemaId}).pipe(
      mergeMap((menuData) => {
        this.menus = [new Menu(menuData)];
        return this.commonRestService.getList(Constants.MENU_RECIENTES_PATH, {sistemaId: environment.sistemaId});
      }),
      mergeMap((menuRecienteData) => {
        this.menusRecientes = [new Menu(menuRecienteData)];
        return this.commonRestService.getList(Constants.MENU_FRECUENTES_PATH, {sistemaId: environment.sistemaId});
      })
    ).subscribe((menuFrecuenteData) => {
      this.menusFrecuentes =  [new Menu(menuFrecuenteData)];
    }, (err) => {
      this.alertService.danger(err);
    });
  }
}
