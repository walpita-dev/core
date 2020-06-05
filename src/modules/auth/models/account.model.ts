export class AccountModel {

  id: number;
  uuid: string;
  password: string;
  login: string;
  fk_person_id: number;
  refresh_token: string;

  constructor(
    id: number,
    uuid: string,
    password: string,
    login: string,
    fk_person_id: number,
    refresh_token: string,
  ) {
    this.id = id;
    this.uuid = uuid;
    this.password = password;
    this.login = login;
    this.fk_person_id = fk_person_id;
    this.refresh_token = refresh_token;
  }
}