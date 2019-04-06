export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  age: number;
  heightInInches: number;
  weightInPounds: number;
  active: boolean;
  admin: boolean;

  public User(
    id?: number,
    firstName: string = '',
    lastName: string = '',
    username: string = '',
    password: string = '',
    email: string = '',
    age: number = 0,
    heightInInches: number = 0,
    weightInPounds: number = 0,
    active: boolean = true,
    admin: boolean = false
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
}
