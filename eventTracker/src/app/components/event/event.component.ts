import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

@Component( {
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events = [];
  selected = null;
  editMode = false;

  editEvent(form: NgForm) {
    const event = new Event();
    event.name = form.value.name;
    event.description = form.value.description;
    event.active = form.value.active;
    event.id = this.selected.id;

    this.eventService.update(event).subscribe(
      data => {
        this.selected = data;
        this.editMode = false;
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  displayEvent(id: number) {
    this.eventService.show(id).subscribe(
      data => {
        this.selected = data;

      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  displayEventGroups() {
    this.eventService.showEventGroups(this.selected.id).subscribe(
      data => {
        this.selected.groups = data;

      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  displayEventTable() {
    this.eventService.index().subscribe(
      data => {
        this.events = data;
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  deleteEvent(id: number) {
    this.eventService.destroy(id).subscribe(
      data => {
        this.selected = null;
        this.editMode = false;
        this.router.navigateByUrl(`/events`);
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  constructor(private router: Router, private eventService: EventService, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
      this.eventService.show(this.currentRoute.snapshot.paramMap.get('id')).subscribe(
        data => {
          this.selected = data;
          this.eventService.showEventGroups(this.selected.id).subscribe(
            groupData => this.selected.groups = groupData,

            err => {
              this.router.navigateByUrl('not-found');
              console.error('Observer got an error: ' + err);
            });
        },

        err => {
          this.router.navigateByUrl('not-found');
          console.error('Observer got an error: ' + err);
        }
      );
    } else {
      this.displayEventTable();
    }
  }

}
