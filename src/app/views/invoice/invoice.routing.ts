import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {InvoiceListComponent  } from './list/list-invoice.component';
import { InvoiceAddComponent } from './create/create-inoice.component';
import {TranslateService} from '@ngx-translate/core';
import { DefaultLayoutComponent } from '../../containers';
import { RoleGuard } from '../../service/guard';
import { Permission } from '../../model/enum/permission.enum';
import { InvoiceEditComponent } from './edit/edit-invoice.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Invoice'
    },
    
    children: [
   {
      path: '',
      component:InvoiceListComponent,
      canActivate:[RoleGuard],
      data: {
        title: 'Invoice',expectedPermission: Permission.invoiceList
      }},
      {
        path: 'add',
        component: InvoiceAddComponent,
        canActivate:[RoleGuard],
        data: {
          title: 'Add Invoice',expectedPermission: Permission.invoiceCreate
        }      
      },
      {
        path: 'edit/:id',
        component: InvoiceEditComponent,
        canActivate:[RoleGuard],
        data: {
          title: 'Edit Invoice',expectedPermission: Permission.invoiceEdit
        }      
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}
