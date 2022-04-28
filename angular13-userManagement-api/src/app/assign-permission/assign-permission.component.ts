import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserApiService } from '../user-api.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserPermission } from '../models/user-permission';
import { Permission } from '../models/permission';

@Component({
  selector: 'app-assign-permission',
  templateUrl: './assign-permission.component.html',
  styleUrls: ['./assign-permission.component.css']
})
export class AssignPermissionComponent implements OnInit {

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    emailAddress: '',
    status: false,
    password: '',
    userName: '',
    userPermissions: []
  };

  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private userService: UserApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.route.params.subscribe(p => {
    //   this.userId = p['id'];
    // });
    this.route.queryParams.subscribe(params => {
      this.user = JSON.parse(params["user"]);
    });

    this.dropdownList = [
      { id: 1, description: 'Admin' },
      { id: 2, description: 'User' },
      { id: 3, description: 'Approver' },
      { id: 4, description: 'Financer' },
      { id: 5, description: 'Team Lead' }
    ];

    this.user.userPermissions.forEach(
      up => {
          this.selectedItems.push(
            {
              id: up.permission.id,
              description: up.permission.description
            }
          );
      }
    );

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'description',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  onItemSelect(item: any) {
    this.selectedItems.push(item);

  }
  onSelectAll(items: any) {
    console.log(items);
  }

  save() {
    this.selectedItems = this.selectedItems.filter((value: any, index: any, self: any) =>
      index === self.findIndex((t: any) => (
        t.id === value.id && t.description === value.description
      ))
    );

    this.user.userPermissions = [];
    
    this.selectedItems.forEach((i: { id: number, description: string }) => {

      const permission: Permission = {
        id: i.id,
        description: i.description,
        code: '',
        userPermissions: []
      }

      const user: User = {
        id: 0,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        emailAddress: '',
        status: false,
        password: '',
        userName: '',
        userPermissions: []
      }

      const userPermission: UserPermission = {
        userId: this.user.id,
        permissionId: i.id,
        permission: permission,
        user: user
      }

      this.user.userPermissions.push(userPermission);
      
    });

    this.userService.updateUser(this.user).subscribe(a => {
      this.router.navigateByUrl('');
    });
  }

  cancel() {
    this.router.navigateByUrl('');
  }

}
