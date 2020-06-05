export class ApplicationModel {
  id: number;
  name: string;
  uuid: string;

  constructor(
    id: number,
    name: string,
    uuid: string,
  ) {
    this.id = id;
    this.name = name;
    this.uuid = uuid;
  }
}