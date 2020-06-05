import { IsEmail, IsString, MaxLength, IsDateString } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @MaxLength(50)
  firstname: string;

  @IsString()
  @MaxLength(50)
  lastname: string;

  @IsDateString()
  birthdate: string;

  @IsEmail()
  @MaxLength(50)
  professional_email: string;

  @IsEmail()
  @MaxLength(50)
  personal_email: string;

  constructor(
    firstname: string,
    lastname: string,
    birthdate: string,
    professional_email: string,
    personal_email: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.professional_email = professional_email;
    this.personal_email = personal_email;
  }
}
