export class Comment {
  id: number;
  comment: string;
  active: boolean;

  Comment(
    id?: number,
    comment: string = '',
    active: boolean = true
  ) {
    this.comment = comment;
  }
}
