import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  newEvent = null;

  addEvent(form: NgForm) {
    this.newEvent.name = form.value.name;
    this.newEvent.description = form.value.description;
    this.newEvent.date = form.value.date;
    this.newEvent.active = form.value.active !== false;

    this.eventService.create(this.newEvent).subscribe(
      data => {
        this.newEvent = null;
        console.log(data);

        this.router.navigateByUrl(`/events/${data.id}`);
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  constructor(private router: Router, private eventService: EventService, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.newEvent = new Event();
  }
}
