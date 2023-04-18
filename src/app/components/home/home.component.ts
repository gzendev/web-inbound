import {Component, ViewChild} from '@angular/core';

import {EventService} from '@services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  @ViewChild('sidenav')
  public sidenav: any;

  constructor(public event: EventService) {
    const clickToogle = 'clickToogle';
    this.event.subscribe(clickToogle, () => {
      this.sidenav.close();
    });
  }
}
