import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { AuthorizationRepository } from './authorization.repository';
import { RoleMapper } from './models/role.mapper';
import { RoleModel } from './models/role.model';

@Injectable()
export class AuthorizationService {
  constructor(
    private readonly authorizationRepository: AuthorizationRepository,
    private readonly roleMapper: RoleMapper,
  ) {}

  private logger = new Logger('AuthorizationService');

  addRole = async (entityUuid: string, entityType: number, roleType: number, accountId: number) => {
    try {
      await this.authorizationRepository.addRole(entityUuid, entityType, roleType, accountId);
    } catch (err) {
      this.logger.error(`Error while adding role ${roleType} for account ${accountId} to entity ${entityUuid} : ${err}`);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteAllRole = async (accountId: number): Promise<void> => {
    try {
      await this.authorizationRepository.deleteAllRole(accountId);
    } catch (err) {
      this.logger.error(`Error while deleting all roles for account ${accountId} : ${err}`);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getRolesByAccountId = async (accountId: number): Promise<RoleModel[]> => {
    try {
      const roleEntity = await this.authorizationRepository.getRolesByAccountId(accountId);
      return roleEntity.map((role) => this.roleMapper.entityToModel(role));
    } catch (err) {
      this.logger.error(`Error while getting role for account ${accountId} : ${err}`);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
