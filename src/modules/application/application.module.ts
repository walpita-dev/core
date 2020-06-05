import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationRepository } from './application.repository';
import { ApplicationMapper } from './model/application.mapper';
import { MssqlService } from '../mssql/mssql.service';

@Module({
  providers: [
    ApplicationService,
    ApplicationRepository,
    ApplicationMapper,
    MssqlService,
  ],
  exports: [
    ApplicationService,
  ],
})
export class ApplicationModule {}
