import { IsEmail } from 'class-validator';

export class PersonModel {
  id: number;

  uuid: string;

  firstname: string;

  lastname: string;

  birthdate: string;

  @IsEmail()
  professional_email: string;

  @IsEmail()
  personal_email: string;

  constructor(
    id: number,
    uuid: string,
    firstname: string,
    lastname: string,
    birthdate: string,
    professional_email: string,
    personal_email: string,
  ) {
    this.id = id;
    this.uuid = uuid;
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.professional_email = professional_email;
    this.personal_email = personal_email;
  }
}