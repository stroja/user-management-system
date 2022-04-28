import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Permission } from '../models/permission';
import { User } from '../models/user';
import { UserPermission } from '../models/user-permission';
import { UserApiService } from '../user-api.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userId: any;

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
  

  constructor(private userService: UserApiService, private route: ActivatedRoute, private router: Router) {
 
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.userId = p['id'];
    });

    if (this.userId !== undefined && this.userId !== null) {
      this.userService.getUser(this.userId)
      .subscribe(
        data => {
          this.user = data;
        },
        error => console.error(error));
    }
  }

  save() {
    const permission: Permission = {
      id: 0,
      description: '',
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
      permissionId: 0,
      permission: permission,
      user: user
    }
    
    this.user.userPermissions = [];

    this.user.userPermissions.push(userPermission);
    if (this.userId !== undefined && this.userId !== null) {
      this.userService.updateUser(this.user).subscribe(a => {
        window.location.reload();
      });
    } else {
      this.userService.addUser(this.user).subscribe(a => {
      });
    }

    this.router.navigateByUrl('');
  }

  cancel() {
    this.router.navigateByUrl('');
  }

}
