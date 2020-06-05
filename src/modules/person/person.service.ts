import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { PersonRepository } from './person.repository';
import { PersonDto } from './models/person.dto';
import { PersonMapper } from './models/person.mapper';
import { PersonModel } from './models/person.model';
import { CreatePersonDto } from './models/create-person.dto';

@Injectable()
export class PersonService {

  private logger = new Logger('PersonService');

  constructor(
    private readonly personRepository: PersonRepository,
    private readonly personMapper: PersonMapper,
  ) {}

  findPersonById = async (personUuid: string): Promise<PersonDto | undefined> => {
    try {
      return await this.personRepository.findPersonById(personUuid);
    } catch (err) {
      this.logger.error(`Error while finding a person by id : ${err}`);
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  createPerson = async (createPersonDto: CreatePersonDto): Promise<PersonModel> => {
    try {
      const personEntity = await this.personRepository.createPerson(createPersonDto);
      return this.personMapper.entityToModel(personEntity);
    } catch (err) {
      this.logger.error(`Error while creating a person : ${err}`);
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
