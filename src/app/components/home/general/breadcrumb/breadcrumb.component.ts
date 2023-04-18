import {Component, OnInit, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MenuItem} from 'primeng/api';
import cloneDeep from 'lodash-es/cloneDeep';
import {environment} from '@envs/environment';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  public items: MenuItem[];

  public home: MenuItem;
  public breadcrumb: MenuItem[] = [];

  constructor(public translate: TranslateService) {

  }

  public ngOnInit(): void {
    this.home = {icon: 'pi pi-home', url: environment.frontEndBaseUrl.concat('/home')};
    this.items.forEach((item) => {
      this.translate.get(item.label).subscribe((translation: string) => {
        const itemClone = cloneDeep(item);
        itemClone.label = translation;
        itemClone.disabled = !itemClone.url;
        this.breadcrumb.push(itemClone);
      });
    });
  }
}
