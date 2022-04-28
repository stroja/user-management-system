import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserGridComponent } from './user-grid/user-grid.component';

const routes: Routes = [
  {
    path: '',
    component: UserGridComponent
  },
  {
    path: 'user/new',
    component: UserEditComponent
  },
  {
    path: 'user/:id',
    component: UserEditComponent
  },
  {
    path: 'assign',
    component: AssignPermissionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
