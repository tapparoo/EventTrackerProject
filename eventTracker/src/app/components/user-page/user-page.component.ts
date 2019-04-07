import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  users = [];
  selected = null;
  newUser = null;
  editMode = false;

  editUser(form: NgForm) {
    const user = new User();
    user.username = form.value.username;
    user.firstName = form.value.firstName;
    user.lastName = form.value.lastName;
    user.email = form.value.email;
    user.password = form.value.password;
    user.age = form.value.age;
    user.heightInInches = form.value.heightInInches;
    user.weightInPounds = form.value.weightInPounds;
    user.active = form.value.active;
    user.admin = form.value.admin;
    user.id = this.selected.id;

    this.userService.update(user).subscribe(
      data => {
        this.selected = data;
        this.editMode = false;
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  displayUserTable() {
    this.userService.index().subscribe(
      data => {
        this.users = data;
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  displayUser(id: number) {
    this.userService.showUser(id).subscribe(
      data => {
        this.selected = data;
        this.userService.showUserGroups(this.selected.id).subscribe(
          groupData => {
            this.selected.groups = groupData;
          }
        );
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  deleteUser(id: number) {
    this.userService.destroy(id).subscribe(
      data => {
        this.selected = null;
        this.editMode = false;
        this.router.navigateByUrl(`/users`);
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  removeFromGroup(uid: number, gid: number) {
    this.userService.removeFromGroup(uid, gid).subscribe(
      data => {
        this.userService.showUserGroups(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
          groupData => {
            this.selected.groups = groupData;
          }
        );
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  joinGroup(uid: number, gid: number) {
    this.userService.addToGroup(uid, gid).subscribe(
      data => {
        this.userService.showUserGroups(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
          groupData => {
            this.selected.groups = groupData;
          }
        );
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  reload(): void {
      this.userService.index().subscribe(
        data => this.users = data,

        err => console.error('Observer got an error: ' + err)
      );
  }


  constructor(private router: Router, private userService: UserService, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
      this.userService.showUser(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
        userData => {
          this.selected = userData;
          this.userService.showUserGroups(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
            groupData => {
              this.selected.groups = groupData;
            }
          );
        },

        err => {
          this.router.navigateByUrl('not-found');
          console.error('Observer got an error: ' + err);
        }
      );
    } else {
      this.displayUserTable();
    }
  }

}
