export class CompleteActivityDto {
  uuid: string;
  created_at: string;
  last_modified_at: string;
  FR_name: string;
  EN_name: string;

  constructor(
    uuid: string,
    created_at: string,
    last_modified_at: string,
    FR_name: string,
    EN_name: string,
  ) {
    this.uuid = uuid;
    this.created_at = created_at;
    this.last_modified_at = last_modified_at;
    this.FR_name = FR_name;
    this.EN_name = EN_name;
  }
}