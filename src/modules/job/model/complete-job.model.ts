export class CompleteJobModel {
  id: number;
  uuid: string;
  rome_code: string;
  created_at: string;
  last_modified_at: string;
  FR_name: string;
  FR_id: string;
  EN_name: string;
  EN_id: string;
  rank: number;

  constructor(
    id: number,
    uuid: string,
    rome_code: string,
    created_at: string,
    last_modified_at: string,
    FR_name: string,
    FR_id: string,
    EN_name: string,
    EN_id: string,
    rank: number,
  ) {
    this.id = id;
    this.uuid = uuid;
    this.rome_code = rome_code;
    this.created_at = created_at;
    this.last_modified_at = last_modified_at;
    this.FR_name = FR_name;
    this.FR_id = FR_id;
    this.EN_name = EN_name;
    this.EN_id = EN_id;
    this.rank = rank;
  }
}