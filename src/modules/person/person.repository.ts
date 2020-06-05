import { Injectable } from '@nestjs/common';
import { PersonEntity } from './models/person.entity';
import { PersonMapper } from './models/person.mapper';
import { PersonModel } from './models/person.model';
import { CreatePersonDto } from './models/create-person.dto';
import { MssqlService } from '../mssql/mssql.service';

@Injectable()
export class PersonRepository {
  constructor(
    private personMapper: PersonMapper,
    private mssqlService: MssqlService,
  ) {}

  findPersonById = async (personUuid: string): Promise<PersonModel | undefined> => {
    const entityModel: PersonEntity = {
      p_id: null,
      p_uuid: '',
      p_firstname: '',
      p_lastname: '',
      p_birthdate: '',
      p_created_at: '',
      p_last_updated_at: '',
      p_professional_email: '',
      p_personal_email: '',
    };
    return this.personMapper.entityToModel(entityModel);
  };

  createPerson = async (createPersonDto: CreatePersonDto): Promise<PersonEntity> => {
    const query = `
    INSERT INTO Person (p_uuid, p_firstname, p_lastname, p_birthdate, p_created_at, p_last_modified_at, p_professional_email, p_personal_email)
    OUTPUT INSERTED.p_id, INSERTED.p_uuid, INSERTED.p_firstname, INSERTED.p_lastname, INSERTED.p_birthdate, INSERTED.p_created_at, INSERTED.p_last_modified_at, INSERTED.p_professional_email, INSERTED.p_personal_email
    VALUES (NEWID(), @firstname, @lastname, @birthdate, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, @professional_email, @personal_email)
    `;
    const personEntity = await this.mssqlService.execSingleRowQuery<PersonEntity>(
      {
        isStoredProc: false,
        query,
        queryParams: [
          {
            label: 'firstname', type: 'VarChar', value: createPersonDto.firstname, maxType: 50,
            input: true,
          },
          {
            label: 'lastname', type: 'VarChar', value: createPersonDto.lastname, maxType: 50,
            input: true,
          },
          {
            label: 'birthdate', type: 'DateTimeOffset', value: createPersonDto.birthdate, maxType: 7,
            input: true,
          },
          {
            label: 'professional_email', type: 'VarChar', value: createPersonDto.professional_email, maxType: 50,
            input: true,
          },
          {
            label: 'personal_email', type: 'VarChar', value: createPersonDto.personal_email, maxType: 50,
            input: true,
          },
        ],
      });
      return personEntity;
  }
}