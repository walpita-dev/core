import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobRepository } from './job.repository';
import { JobMapper } from './model/job.mapper';
import { MssqlService } from '../mssql/mssql.service';

@Module({
  providers: [
    JobService,
    JobRepository,
    JobMapper,
    MssqlService,
  ],
  controllers: [JobController]
})
export class JobModule {}
