export class CompleteResourceModel {
  id: number;
  EN_id: number
  EN_name: string;
  rank: number;
  uuid: string;
  created_at: string;
  last_modified_at: string;
  type: string;
  status: string;
  FR_name: string;
  FR_id: number;

  constructor(
    id: number,
    EN_id: number,
    EN_name: string,
    rank: number,
    uuid: string,
    created_at: string,
    last_modified_at: string,
    type: string,
    status: string,
    FR_name: string,
    FR_id: number,
  ) {
    this.id = id;
    this.EN_id = EN_id;
    this.EN_name = EN_name;
    this.rank = rank;
    this.uuid = uuid;
    this.created_at = created_at;
    this.last_modified_at = last_modified_at;
    this.type = type;
    this.status = status;
    this.FR_name = FR_name;
    this.FR_id = FR_id;
  }
}