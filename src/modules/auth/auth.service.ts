import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { PersonService } from '../person/person.service';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository } from './auth.repository';
import { CreateAccountDto } from './models/create-account.dto';
import { CreatePersonDto } from '../person/models/create-person.dto';
import { AccountModel } from './models/account.model';
import { AccountMapper } from './models/account.mapper';
import { JwtPayload, JwtRole } from './models/jwt-payload.model';
import { AuthorizationService } from '../authorization/authorization.service';
import { JWTDto } from './models/jwt.dto';
import { RoleModel } from '../authorization/models/role.model';
import { ApplicationService } from '../application/application.service';
const bcrypt = require('bcrypt');

@Injectable()
export class AccountService {

  private logger = new Logger('AuthService');

  private saltRounds = 10;

  constructor(
    private readonly personService: PersonService,
    private readonly jwtService: JwtService,
    private readonly accountRepository: AccountRepository,
    private readonly accountMapper: AccountMapper,
    private readonly authorizationService: AuthorizationService,
    private readonly applicationService: ApplicationService,
  ) {}

  private readonly rolesByAppName: Map<string, string[]> = new Map([
    ['SKILVIOO_BACKOFFICE', ['DOCUMENTALIST', 'COMMERCIAL', 'ADMIN_SKILVIOO']],
  ]);

  validateAccount = async (login: string, password: string, appName: string): Promise<JwtPayload> => {
    try {
      const accountModel = await this.getAccountByLogin(login);
      if (accountModel?.id) {
        const match = await bcrypt.compare(password, accountModel.password);
        if (match) {
          const roles = await this.authorizationService.getRolesByAccountId(accountModel.id);
          if (this.canUseApp(roles, appName)) {
            const jwtRoles = roles.map((accountRole) => new JwtRole(accountRole.role_type, accountRole.entity_uuid));
            return new JwtPayload(
              accountModel.refresh_token,
              accountModel.uuid,
              jwtRoles,
            );
          }
          throw new HttpException('Can not use app', HttpStatus.FORBIDDEN);
        }
        throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Inexistant login', HttpStatus.UNAUTHORIZED);
    } catch (err) {
      this.logger.error(`Error while validating ( login ) account with login ${login} : ${err}`);
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  canUseApp = (roles: RoleModel[], appName: string): boolean => {
    const listOfRoleType = roles.map(role => role.role_type);
    for(let i = 0; i<listOfRoleType.length; i += 1) {
      if (this.rolesByAppName.get(appName)?.includes(listOfRoleType[i])) {
        return true;
      }
    }
    return false;
  }

  async login(body) {
    const jwtPayload = await this.validateAccount(body.login, body.password, body.appName);
    const plainJWTObject = {
      refreshToken: jwtPayload.refreshToken,
      accountUuid: jwtPayload.accountUuid,
      roles: jwtPayload.roles,
    }
    return {
      access_token: this.jwtService.sign(plainJWTObject),
    };
  }

  getRefreshToken = async (req: any): Promise<JWTDto> => {
    const jwtPayload: any = this.jwtService.decode(req, { json: true });
    try {
      const accountEntity = await this.accountRepository.getAccountByRefreshToken(jwtPayload.refreshToken);
      if (accountEntity?.a_refresh_token_limit >= (Date.now() / 1000)) {
        const accountRoles = await this.authorizationService.getRolesByAccountId(accountEntity.a_id);
        const jwtRoles = accountRoles.map((accountRole) => new JwtRole(accountRole.role_type, accountRole.entity_uuid));
        const newJwtPayload: JwtPayload = new JwtPayload(accountEntity.a_refresh_token, accountEntity.a_uuid, jwtRoles);
        return new JWTDto(this.jwtService.sign(newJwtPayload));
      } else {
        throw new HttpException('Refresh token has expired', HttpStatus.FORBIDDEN);
      }
    } catch (err) {
      this.logger.error(`Error while refreshing token : ${err}`);
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  createAccount = async (createAccountDto: CreateAccountDto): Promise<void> => {
    const createPersonDto = new CreatePersonDto(
      createAccountDto.firstname,
      createAccountDto.lastname,
      createAccountDto.birthdate,
      createAccountDto.professional_email,
      createAccountDto.personal_email,
    );
    try {
      // TO DO : verify that emails do nopt already exist
      const possiblePerson = await this.getAccountByLogin(createAccountDto.login);
      if (possiblePerson?.id) {
        this.logger.debug('User tried to create an account with already used login');
        throw new HttpException('Login already used', HttpStatus.CONFLICT);
      }
      const personModel = await this.personService.createPerson(createPersonDto);
      // TO DO : delete person if account failed to be created
      const hashedSaltedPassword = bcrypt.hashSync(createAccountDto.password, this.saltRounds);
      const accountEntity = await this.accountRepository.createAccount(createAccountDto.login, hashedSaltedPassword, personModel.id);
      const applicationModel = await this.applicationService.getApplicationByName('SKILVIOO_BACKOFFICE');
      await this.authorizationService.addRole(
        applicationModel.uuid,
        5,
        1,
        accountEntity.a_id,
      );
    } catch (err) {
      this.logger.error(`Error while creating account : ${err}`);
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteAccount = async (accountUuid: string): Promise<void> => {
    try {
      const accountEntity = await this.accountRepository.getAccountByUuid(accountUuid);
      if (accountEntity?.a_id) {
        await this.authorizationService.deleteAllRole(accountEntity.a_id);
        await this.accountRepository.deleteAccount(accountEntity.a_id);
      } else {
        throw new HttpException('Account does not exist', HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      this.logger.error(`Error while deleteting account ${accountUuid} : ${err}`);
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getAccountByLogin = async (login: string): Promise<AccountModel> => {
    try {
      const accountEntity = await this.accountRepository.findAccountByLogin(login);
      return accountEntity?.a_id ? this.accountMapper.entityToModel(accountEntity) : null;
    } catch (err) {
      this.logger.error(`Error while searching account by login ${login} : ${err}`);
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
