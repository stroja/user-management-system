import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { User } from '../models/user';
import { ButtonCellRenderer } from '../button-cell-renderer/button-cell-renderer.component';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';
import { MatDialog } from '@angular/material/dialog';
import { GridApi, GridOptions } from 'ag-grid-community';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
  private destroy$: Subject<void> = new Subject();
  
  rowData: User[] = [];
  gridOptions: GridOptions;

  constructor(private userService: UserApiService, public dialog: MatDialog, private router: Router, private appRef: ApplicationRef) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.pagination = true;
    this.gridOptions.paginationPageSize = 10;
    this.gridOptions.context = { component: this };
    this.gridOptions.columnDefs = [];

    this.router.events.pipe(
      takeUntil(this.destroy$),
      // If it is a NavigationEnd event re-init the component
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.refresh();
    });
  }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.createGrid(data);
          //this.rowData = data;
        },
        error => console.error(error));
  }

  refresh(): void {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.createGrid(data);
        },
        error => console.error(error));
  }

  createGrid(data: any) {
    this.appRef.tick();

    const columnDefs = [
      { headerName: 'Username', field: 'userName', sortable: true, filter: true },
      { headerName: 'First Name', field: 'firstName', sortable: true, filter: true },
      { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true },
      { headerName: 'Email', field: 'email', sortable: true, filter: true },
      { headerName: 'Status', field: 'status', filter: true },
      {
        headerName: 'Edit',
        field: '',
        cellRenderer: ButtonCellRenderer,
        cellRendererParams: {
          inRouterLink: '/user',
          buttonText: 'Edit',
        },
        cellClass : ['edit', 'btn']
      },
      {
        headerName: 'Permission',
        field: '',
        cellRenderer: ButtonCellRenderer,
        cellRendererParams: {
          inRouterLink: '/assign',
          buttonText: 'Assign',
        },
        cellClass : ['edit', 'btn']
      },
      {
        headerName: 'Delete',
        field: '',
        cellRenderer: DeleteButtonRendererComponent ,
        cellRendererParams: {
          buttonText: 'Delete',
          gridData: data
        },
        cellClass :  ['delete', 'btn']
      },
    ];

    this.gridOptions?.api?.setColumnDefs(columnDefs);
    this.gridOptions?.api?.setRowData(data);
  }

  addUser() {
    this.router.navigate(['user/new']);
  }
}
