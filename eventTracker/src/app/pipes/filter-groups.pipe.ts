import { Pipe, PipeTransform } from '@angular/core';
import { Group } from '../models/group';

@Pipe({
  name: 'filterGroups'
})
export class FilterGroupsPipe implements PipeTransform {

  transform(groups: Group[], str: string): Group[] {
    const results = [];
    groups.forEach((group) => {
      if (group.name.toLowerCase().includes(str.toLowerCase())
        || group.description.toLowerCase().includes(str.toLowerCase())
      ) {
        results.push(group);
      }
    });

    return results;
  }

}
