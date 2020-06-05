import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { ActivityRepository } from './activity.repository';
import { ActivityMapper } from './model/activity.mapper';
import { MssqlService } from '../mssql/mssql.service';

@Module({
  providers: [
    ActivityService,
    ActivityRepository,
    ActivityMapper,
    MssqlService,
  ],
  controllers: [ActivityController]
})
export class ActivityModule {}
