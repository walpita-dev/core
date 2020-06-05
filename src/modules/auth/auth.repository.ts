import { Injectable } from "@nestjs/common";
import { MssqlService } from "../mssql/mssql.service";
import { AccountEntity } from "./models/account.entity";


@Injectable()
export class AccountRepository {
  constructor(
    private readonly mssqlService: MssqlService,
  ) {}

  createAccount = async (
    login: string,
    password: string,
    person_id: number,
  ): Promise<AccountEntity> => {
    const query = `
    INSERT INTO Account (a_uuid, a_login, a_password, a_refresh_token, a_created_at, a_last_modified_at, a_fk_person_id, a_refresh_token_limit)
    OUTPUT INSERTED.a_id, INSERTED.a_uuid, INSERTED.a_password, INSERTED.a_login, INSERTED.a_refresh_token, INSERTED.a_created_at, INSERTED.a_last_modified_at, INSERTED.a_fk_person_id, INSERTED.a_refresh_token_limit
    VALUES (NEWID(), @login, @password, NEWID(), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @person_id, @refresh_token_limit)
    `;
    const personEntity = await this.mssqlService.execSingleRowQuery<AccountEntity>(
      {
        isStoredProc: false,
        query,
        queryParams: [
          {
            label: 'login', type: 'VarChar', value: login, maxType: 50,
            input: true,
          },
          {
            label: 'password', type: 'VarChar', value: password, maxType: 255,
            input: true,
          },
          {
            label: 'person_id', type: 'Int', value: person_id,
            input: true,
          },
          {
            label: 'refresh_token_limit', type: 'Int', value: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
            input: true,
          },
        ],
      });
      return personEntity;
  }

  findAccountByLogin = async (login: string): Promise<AccountEntity> => {
    const query = `
    SELECT * FROM Account WHERE a_login = @login
    `;
    return await this.mssqlService.execSingleRowQuery<AccountEntity>(
      {
        isStoredProc: false,
        query,
        queryParams: [
          {
            label: 'login', type: 'VarChar', value: login, maxType: 50,
            input: true,
          },
        ],
      });
  }

  getAccountByRefreshToken = async (refreshToken: string): Promise<AccountEntity> => {
    const query = `
    SELECT * FROM Account WHERE a_refresh_token = @refreshToken
    `;
    return await this.mssqlService.execSingleRowQuery<AccountEntity>(
      {
        isStoredProc: false,
        query,
        queryParams: [
          {
            label: 'refreshToken', type: 'VarChar', value: refreshToken, maxType: 255,
            input: true,
          },
        ],
      });
  }

  getAccountByUuid = async (accountUuid: string): Promise<AccountEntity> => {
    const query = `
    SELECT * FROM Account WHERE a_uuid = @accountUuid
    `;
    return await this.mssqlService.execSingleRowQuery<AccountEntity>(
      {
        isStoredProc: false,
        query,
        queryParams: [
          {
            label: 'accountUuid', type: 'UniqueIdentifier', value: accountUuid,
            input: true,
          },
        ],
      });
  }

  deleteAccount = async (accountId: number): Promise<void> => {
    const query = `DELETE FROM Account WHERE a_id = @accountId`;
    return await this.mssqlService.execQuery<AccountEntity>(
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