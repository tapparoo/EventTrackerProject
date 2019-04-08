import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: User[], str: string): User[] {
    const results = [];
    users.forEach((user) => {
      if (user.username.toLowerCase().includes(str.toLowerCase())
        || user.firstName.toLowerCase().includes(str.toLowerCase())
        || user.lastName.toLowerCase().includes(str.toLowerCase())
        || user.email.toLowerCase().includes(str.toLowerCase())
      ) {
        results.push(user);
      }
    });

    return results;
  }
}
