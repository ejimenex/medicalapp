import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryListComponent } from './list/country-list.component';
import { CountryAddComponent } from './create/country-create.component';

const routes: Routes = [
  {
    path: '',    
    data: {
      title: 'Parameter'
    },children: [
        {
          path: '',
          component: CountryListComponent,
          data:{title:'Country'}
        },
        {
          path: 'add',
          component: CountryAddComponent,
          data:{title:'Add'}
        }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations:[CountryAddComponent]
})
export class CountryRoutingModule {}
