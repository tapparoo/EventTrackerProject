import { Event } from 'src/app/models/event';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEvents'
})
export class FilterEventsPipe implements PipeTransform {

  transform(events: Event[], str: string): Event[] {
    const results = [];
    events.forEach((event) => {
      if (event.name.toLowerCase().includes(str.toLowerCase())
        || event.description.toLowerCase().includes(str.toLowerCase())
      ) {
        results.push(event);
      }
    });

    return results;
  }

}
