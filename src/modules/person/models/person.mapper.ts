import { Injectable } from "@nestjs/common";
import { PersonEntity } from "./person.entity";
import { PersonModel } from "./person.model";
import { PersonDto } from "./person.dto";

@Injectable()
export class PersonMapper {
  constructor() {}

  entityToModel = (personEntity: PersonEntity): PersonModel => {
    return new PersonModel(
      personEntity.p_id,
      personEntity.p_uuid,
      personEntity.p_firstname,
      personEntity.p_lastname,
      personEntity.p_birthdate,
      personEntity.p_professional_email,
      personEntity.p_personal_email,
    );
  }

  modelToDto = (personModel: PersonModel): PersonDto => {
    return new PersonDto(
      personModel.uuid,
      personModel.firstname,
      personModel.lastname,
      personModel.birthdate,
      personModel.professional_email,
      personModel.personal_email,
    );
  }
}