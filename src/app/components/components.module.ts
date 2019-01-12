import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";

const COMPONENTS: any[] = [GoogleMapsComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [COMPONENTS],
  exports: [...COMPONENTS]
})
export class ComponentsModule {}
