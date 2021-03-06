import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { ShillComponent } from './shill/shill.component';

export const routes: Routes = [
  {
      path: '',
      component: BaseComponent,
  },
  {
      path: 'shill',
      component: ShillComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
