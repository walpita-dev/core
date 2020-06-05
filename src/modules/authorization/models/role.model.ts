export class RoleModel {
  account_id: number;
  role_type: string;
  entity_uuid: string;
  entity_type: string;
  
  constructor(
    account_id: number,
    role_type: string,
    entity_uuid: string,
    entity_type: string,
  ) {
    this.account_id = account_id;
    this.role_type = role_type;
    this.entity_uuid = entity_uuid;
    this.entity_type = entity_type;
  }
}