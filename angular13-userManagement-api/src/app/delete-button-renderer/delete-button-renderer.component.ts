import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgRendererComponent } from 'ag-grid-angular';
import { UserApiService } from '../user-api.service';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-delete-button-renderer',
  templateUrl: './delete-button-renderer.component.html',
  styleUrls: ['./delete-button-renderer.component.css']
})
export class DeleteButtonRendererComponent implements AgRendererComponent {

  params: any;

  constructor(public dialog: MatDialog, public userService: UserApiService, private router: Router) { }

  agInit(params: any): void {
      this.params = params;
  }

  refresh(params: any): boolean {
      return false;
  }

  showModal() {
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(this.params.data.id).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }

}
