import {Component, Input} from '@angular/core';
import {EventService} from '@services/event.service';
import {Menu} from '@models/menu.model';

export interface Event {
  name: string;
  value: any;
}

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
})
export class MenuItemsComponent {

  @Input()
  public menus: Menu[];
  @Input()
  public level: number;

  constructor(public event: EventService) {
    this.level = 1;
  }

  public toggle(menu: any): void {
    menu.expand = !menu.expand;
  }

  public onToggleSideNav(): void {
    const clickToogle = 'clickToogle';
    this.event.publish(clickToogle, null);
  }
}
