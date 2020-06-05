export class JwtRole {
  role_type: string;
  entityUuid: string;

  constructor(
    role_type: string,
    entityUuid: string,
  ) {
    this.role_type = role_type;
    this.entityUuid = entityUuid;
  }
}

export class JwtPayload {
  refreshToken: string;
  accountUuid: string;
  roles: JwtRole[];

  constructor(
    refreshToken: string,
    accountUuid: string,
    roles: JwtRole[],
  ) {
    this.refreshToken = refreshToken;
    this.accountUuid = accountUuid;
    this.roles = roles;
  }
}