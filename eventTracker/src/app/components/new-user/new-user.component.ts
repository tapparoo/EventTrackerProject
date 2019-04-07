import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  newUser = null;

  addUser(form: NgForm) {
    this.newUser.username = form.value.username;
    this.newUser.firstName = form.value.firstName;
    this.newUser.lastName = form.value.lastName;
    this.newUser.email = form.value.email;
    this.newUser.password = form.value.password;
    this.newUser.age = form.value.age;
    this.newUser.heightInInches = form.value.heightInInches;
    this.newUser.weightInPounds = form.value.weightInPounds;
    this.newUser.active = form.value.active !== false;
    this.newUser.admin = form.value.admin !== false;

    this.userService.create(this.newUser).subscribe(
      data => {
        this.newUser = null;
        this.router.navigateByUrl(`/users/${data.id}`);
      },

      err => console.error('Observer got an error: ' + err)
    );
  }

  constructor(private router: Router, private userService: UserService, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.newUser = new User();
  }

}
