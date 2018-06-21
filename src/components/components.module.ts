import { NgModule } from '@angular/core';
import { LogoutComponent } from './logout/logout';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [LogoutComponent],
	imports: [IonicModule, CommonModule],
	exports: [LogoutComponent]
})
export class ComponentsModule {}
