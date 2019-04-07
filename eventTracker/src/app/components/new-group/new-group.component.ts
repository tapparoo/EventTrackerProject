import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  newGroup = null;

  addGroup(form: NgForm) {
    this.newGroup.name = form.value.name;
    this.newGroup.description = form.value.description;
    this.newGroup.active = form.value.active !== false;

    this.groupService.create(this.newGroup).subscribe(
      data => {
        this.newGroup = null;
        this.router.navigateByUrl(`/groups/${data.id}`);
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  constructor(private router: Router, private groupService: GroupService, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.newGroup = new Group();
  }
}
