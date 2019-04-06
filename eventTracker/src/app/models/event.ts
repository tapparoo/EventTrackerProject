export class Event {
  id: number;
  name: string;
  description: string;
  active: boolean;
  date: string;

  public Event(
    id?: number,
    name: string = '',
    desc: string = '',
    active: boolean = true,
    date: string = ''
  ) {
    this.name = name;
    this.description = desc;
    this.date = date;
  }
}
