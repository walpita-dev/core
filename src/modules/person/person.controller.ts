import { Controller, Post, Body } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { PersonService } from './person.service';
import { CreatePersonDto } from './models/create-person.dto';
import { PersonDto } from './models/person.dto';
import { PersonMapper } from './models/person.mapper';

@Controller('person')
export class PersonController {

  constructor(
    private readonly personService: PersonService,
    private readonly personMapper: PersonMapper,
  ) {}

  @Post('')
  createPerson(@Body() createPersonDto: CreatePersonDto): Observable<PersonDto> {
    const personModel = this.personService.createPerson(createPersonDto);
    return from(personModel.then((personModel) => this.personMapper.modelToDto(personModel)));
  }
}
