export class CompleteJobDto {
  uuid: string;
  rome_code: string;
  created_at: string;
  last_modified_at: string;
  FR_name: string;
  EN_name: string;
  rank: number;

  constructor(
    uuid: string,
    rome_code: string,
    created_at: string,
    last_modified_at: string,
    FR_name: string,
    EN_name: string,
    rank: number,
  ) {
    this.uuid = uuid;
    this.rome_code = rome_code;
    this.created_at = created_at;
    this.last_modified_at = last_modified_at;
    this.FR_name = FR_name;
    this.EN_name = EN_name;
    this.rank = rank;
  }
}