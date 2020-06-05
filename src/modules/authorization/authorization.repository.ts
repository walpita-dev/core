import { Injectable } from '@nestjs/common';
import { RoleEntity } from './models/role.entity';
import { MssqlService } from '../mssql/mssql.service';

@Injectable()
export class AuthorizationRepository {
  constructor(
    private readonly mssqlService: MssqlService,
  ) {}

  addRole = async (entityUuid: string, entityType: number, roleType: number, accountId: number): Promise<void> => {
    console.log(entityUuid);
    console.log(entityType);
    console.log(roleType);
    console.log(accountId);
    const query = `
      INSERT INTO Role (
        r_account_id,
        r_role_type_id,
        r_entity_uuid,
        r_entity_type_id,
        r_created_at,
        r_last_modified_at
       ) VALUES (@accountId, @roleType, @entityUuid, @entityType, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `;
    await this.mssqlService.execQuery<void>(
      {
        isStoredProc: false,
        query,
        queryParams: [
          {
            label: 'entityUuid', type: 'UniqueIdentifier', value: entityUuid,
            input: true,
          },
          {
            label: 'entityType', type: 'Int', value: entityType,
            input: true,
          },
          {
            label: 'roleType', type: 'Int', value: roleType,
            input: true,
          },
          {
            label: 'accountId', type: 'Int', value: accountId,
            input: true,
          },
        ],
      });
  }

  deleteAllRole = async (accountId: number): Promise<void> => {
  const query = `DELETE FROM Role WHERE r_account_id = @accountId`;
  await this.mssqlService.execQuery<void>(
    {
      isStoredProc: false,
      query,
      queryParams: [
        {
          label: 'accountId', type: 'Int', value: accountId,
          input: true,
        },
      ],
    });
  }

  getRolesByAccountId = async (accountId: number): Promise<RoleEntity[]> => {
    const query = `
      SELECT * FROM Role WHERE r_account_id = @accountId
      `;
    return await this.mssqlService.execQuery<RoleEntity[]>(
      {
        isStoredProc: false,
        query,
        queryParams: [
          {
            label: 'accountId', type: 'Int', value: accountId,
            input: true,
          },
        ],
      });
  }
}