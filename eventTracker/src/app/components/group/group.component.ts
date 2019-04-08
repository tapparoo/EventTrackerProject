import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { GroupService } from 'src/app/services/group.service';

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
    this.selected.name = form.value.name;
    this.selected.description = form.value.description;
    this.selected.active = form.value.active;
    this.selected.id = this.selected.id;

    this.groupService.update(this.selected).subscribe(
      data => {
        this.selected = data;
        this.editMode = false;

        this.displayGroup(this.selected.id);
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
        this.groupService.showGroupEvents(this.selected.id).subscribe(
          eventData => {
            this.selected.events = eventData;
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

  joinEvent(gid: number, eid: number) {
    this.groupService.joinGroupToEvent(eid, gid).subscribe(
      data => this.displayGroup(gid),

      err => console.error('Observer got an error: ' + err)
    );
  }

  removeFromEvent(eid: number, gid: number) {
    this.groupService.removeGroupFromEvent(eid, gid).subscribe(
      data => {
        this.groupService.showGroupEvents(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
          eventData => {
            this.selected.events = eventData;
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
              this.groupService.showGroupEvents(this.selected.id).subscribe(
                eventData => {
                  this.selected.events = eventData;

                }
              );
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
