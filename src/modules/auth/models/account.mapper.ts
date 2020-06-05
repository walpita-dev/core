import { Injectable } from "@nestjs/common";
import { AccountEntity } from "./account.entity";
import { AccountModel } from "./account.model";

@Injectable()
export class AccountMapper {
  constructor() {}

  entityToModel = (accountEntity: AccountEntity): AccountModel => {
    return new AccountModel(
      accountEntity.a_id,
      accountEntity.a_uuid,
      accountEntity.a_password,
      accountEntity.a_login,
      accountEntity.a_fk_person_id,
      accountEntity.a_refresh_token,
    );
  }
}