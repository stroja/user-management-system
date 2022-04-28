import {HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {UserApiService} from './user-api.service';
import { UserGridComponent } from './user-grid/user-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonCellRenderer } from './button-cell-renderer/button-cell-renderer.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteButtonRendererComponent } from './delete-button-renderer/delete-button-renderer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalDialogComponent } from './delete-button-renderer/modal-dialog/modal-dialog.component';
import { AssignPermissionComponent } from './assign-permission/assign-permission.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    UserGridComponent,
    ButtonCellRenderer,
    UserEditComponent,
    DeleteButtonRendererComponent,
    ModalDialogComponent,
    AssignPermissionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    NgMultiSelectDropDownModule,
    AgGridModule.withComponents([ButtonCellRenderer]),
  ],
  providers: [UserApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
