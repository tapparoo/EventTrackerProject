export class Group {
  id: number;
  name: string;
  description: string;
  active: boolean;
  events: any[];

  Group(
    id?: number,
    name: string = '',
    desc: string = '',
    active: boolean = true
  ) {
    this.name = name;
    this.description = desc;
  }
}
