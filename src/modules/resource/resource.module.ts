import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { ResourceRepository } from './resource.repository';
import { ResourceMapper } from './model/resource.mapper';
import { MssqlService } from '../mssql/mssql.service';

@Module({
  providers: [
    ResourceService,
    ResourceRepository,
    ResourceMapper,
    MssqlService,
  ],
  controllers: [ResourceController]
})
export class ResourceModule {}
