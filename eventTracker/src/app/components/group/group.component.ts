import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/models/group';

@Component( {
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  groups = [];
  selected = null;
  editMode = false;

  editGroup(form: NgForm) {
    const group = new Group();
    group.name = form.value.name;
    group.description = form.value.description;
    group.active = form.value.active;
    group.id = this.selected.id;

    this.groupService.update(group).subscribe(
      data => {
        this.selected = data;
        this.editMode = false;
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  displayGroup(id: number) {
    this.groupService.show(id).subscribe(
      data => {
        this.selected = data;
        this.groupService.showGroupUsers(this.selected.id).subscribe(
          userData => {
            this.selected.users = userData;
          }
        );
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  displayGroupTable() {
    this.groupService.index().subscribe(
      data => {
        this.groups = data;
      },

      err => console.error('Observer got an error: ' + err)
    );
  }


  deleteGroup(id: number) {
    this.groupService.destroy(id).subscribe(
      data => {
        this.selected = null;
        this.editMode = false;
        this.router.navigateByUrl(`/groups`);
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  removeUser(uid: number, gid: number) {
    this.groupService.removeUserFromGroup(uid, gid).subscribe(
      data => {
        this.groupService.showGroupUsers(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
          groupData => {
            this.selected.groups = groupData;
          }
        );
      },
      err => console.error('Observer got an error: ' + err)
    );
  }

  constructor(private router: Router, private groupService: GroupService, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
      this.groupService.show(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
        data => {
          this.selected = data;
          this.groupService.showGroupUsers(this.selected.id).subscribe(
            userData => {
              this.selected.users = userData;
            }
          );
        },

        err => {
          this.router.navigateByUrl('not-found');
          console.error('Observer got an error: ' + err);
        }
      );
    } else {
      this.displayGroupTable();
    }
  }

}
