import { FilterUsersPipe } from './../../pipes/filter-users.pipe';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.selected.username = form.value.username;
    this.selected.firstName = form.value.firstName;
    this.selected.lastName = form.value.lastName;
    this.selected.email = form.value.email;
    this.selected.password = form.value.password;
    this.selected.age = form.value.age;
    this.selected.heightInInches = form.value.heightInInches;
    this.selected.weightInPounds = form.value.weightInPounds;
    this.selected.active = form.value.active;
    this.selected.admin = form.value.admin;
    this.selected.id = this.selected.id;
    this.userService.update(this.selected).subscribe(
      data => {
        this.selected = data;
        this.editMode = false;
        this.reload();
        this.displayUser(this.selected.id);
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
        if (this.selected.heightInInches > 0 && this.selected.weightInPounds > 0) {
          const bmi = '' + (this.selected.weightInPounds
              / (this.selected.heightInInches * this.selected.heightInInches) * 705.0);
          if (bmi.length > 4) {
            this.selected.bmi = bmi.substring(0, 4);
          }
        } else {
          this.selected.bmi = 0.0;
        }

        this.userService.showUserGroups(this.selected.id).subscribe(
          groupData => {
            this.selected.usergroups = groupData;
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
        this.reload();
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
            this.selected.usergroups = groupData;
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
            this.selected.usergroups = groupData;
          }
        );
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  reload(): void {
      this.userService.index().subscribe(
        data => {
          this.users = data;
        },

        err => console.error('Observer got an error: ' + err)
      );
  }


  constructor(private router: Router, private userService: UserService, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
      this.userService.showUser(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
        userData => {
          this.selected = userData;
          if (this.selected.heightInInches > 0 && this.selected.weightInPounds > 0) {
            const bmi = '' + (this.selected.weightInPounds
                / (this.selected.heightInInches * this.selected.heightInInches) * 705.0);
            if (bmi.length > 4) {
              this.selected.bmi = bmi.substring(0, 4);
            }
          } else {
            this.selected.bmi = 0.0;
          }
          this.userService.showUserGroups(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
            groupData => {
              this.selected.usergroups = groupData;
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
