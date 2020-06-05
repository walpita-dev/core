import { ApplicationModel } from "./application.model";
import { ApplicationEntity } from "./application.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ApplicationMapper {
  constructor() {}

  entityToModel = (applicationEntity: ApplicationEntity): ApplicationModel => {
    return new ApplicationModel(
      applicationEntity.app_id,
      applicationEntity.app_name,
      applicationEntity.app_uuid,
    );
  }
}