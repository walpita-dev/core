import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationRepository } from './authorization.repository';
import { RoleMapper } from './models/role.mapper';
import { MssqlService } from '../mssql/mssql.service';

@Module({
  providers: [
    AuthorizationService,
    AuthorizationRepository,
    RoleMapper,
    MssqlService,
  ],
  exports: [
    AuthorizationService,
  ],
})
export class AuthorizationModule {}
