import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from '@ionic/angular';

import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { OrgHeaderComponent } from './org-header/org-header.component';
import { OrgFooterComponent } from './org-footer/org-footer.component';

const COMPONENTS: any[] = [GoogleMapsComponent, OrgHeaderComponent, OrgFooterComponent];

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [COMPONENTS],
  exports: [...COMPONENTS]
})
export class ComponentsModule { }
