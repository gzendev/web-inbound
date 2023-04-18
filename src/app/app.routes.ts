import {Routes} from '@angular/router';

import {AuthGuard} from '@utils/auth.guard';
// **** Common ****
import {LoginComponent} from '@components/login/login.component';
import {HomeComponent} from '@components/home/home.component';
import {RolesComponent} from '@components/home/content/roles/roles.component';
import {PermissionDeniedComponent} from '@components/home/content/permission-denied/permission-denied.component';

// **** WEBv2 ****
import {InboundsComponent} from '@components/home/content/inbounds/inbounds.component';
import {InboundPiezasComponent} from '@components/home/content/inbounds/pieza/inbound-pieza.component';
import {OutboundVehiculosComponent} from '@app/components/home/content/inbounds/vehiculo/outbound-vehiculo.component';
import {OutboundVehiculosMapComponent} from '@app/components/home/content/inbounds/vehiculo/map/outbound-vehiculo-map.component';
import {InboundDialogComponent} from '@app/components/home/content/inbounds/inbound/inbound-dialog.component';
import {InboundPiezaDialogComponent} from '@app/components/home/content/inbounds/pieza/inbound-pieza-dialog.component';
// import { RecuperoComponent } from './components/login/recupero/recupero.component';
import {ProfileComponent} from '@app/components/home/content/profile/profile.component';
import {ConfigurationComponent} from '@components/home/content/configuration/configuration.component';

export class AppRoutes {

  public static listRoutes(): Routes {
    return [
      {path: 'login', component: LoginComponent},
      // {path: 'recupero/:userRecovery', component: RecuperoComponent},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
        // **** Common *****
        {path: 'roles', component: RolesComponent},
        {path: 'permission-denied', component: PermissionDeniedComponent},
        {path: 'profile', component: ProfileComponent},
        {path:'configuration',component:ConfigurationComponent},

        // **** WEBv2 *****
        {path: 'inbounds', component: InboundsComponent},
        {path: 'inboundPiezas', component: InboundPiezasComponent},
        {path: 'outboundVehiculos', component: OutboundVehiculosComponent},
        {path: 'outboundVehiculos/:vin/map/:hojaRuta', component: OutboundVehiculosMapComponent},
        {path: 'inbounds/new', component: InboundDialogComponent},
        {path: 'inbounds/:inbound/:gestion/edit', component: InboundDialogComponent},
        {path: 'inbounds/:inbound/view', component: InboundDialogComponent},
        {path: 'inboundPiezas/:inbound/:gestion/edit', component: InboundPiezaDialogComponent},
        {path: 'inboundPiezas/:inbound/view', component: InboundPiezaDialogComponent},
        
      ]},
      {path: '**', redirectTo: 'home'},
    ];
  }
}
