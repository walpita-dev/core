import { Injectable } from "@nestjs/common";
import { RoleEntity } from "./role.entity";
import { RoleModel } from "./role.model";

@Injectable()
export class RoleMapper {
  constructor() {}

  private readonly roleReferences: Map<number, string> = new Map([
    [1, 'ADMIN_SKILVIOO'],
    [2, 'ADMIN_ORGA'],
    [3, 'ADMIN_TRAINING'],
    [4, 'COLLAB_TRAINING'],
    [5, 'ADMIN_COMPANY'],
    [6, 'ADMIN_JOB'],
    [7, 'USER'],
    [8, 'DOCUMENTALIST'],
    [9, 'COMMERCIAL'],
  ]);

  private readonly entityReferences: Map<number, string> = new Map([
    [1, 'TRAINING_ORGANISATION'],
    [2, 'TRAINING'],
    [3, 'COMPANY'],
    [4, 'POST'],
    [5, 'APPLICATION'],
  ]);

  entityToModel = (roleEntity: RoleEntity): RoleModel => {
    return new RoleModel(
      roleEntity.r_account_id,
      this.roleReferences.get(roleEntity.r_role_type_id),
      roleEntity.r_entity_uuid,
      this.entityReferences.get(roleEntity.r_entity_type_id),
    );
  }
}