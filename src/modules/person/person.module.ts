import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonRepository } from './person.repository';
import { PersonMapper } from './models/person.mapper';
import { MssqlService } from '../mssql/mssql.service';

@Module({
  controllers: [PersonController],
  providers: [
    PersonService,
    PersonRepository,
    PersonMapper,
    MssqlService,
  ],
  exports: [
    PersonService,
  ],
})
export class PersonModule {}
