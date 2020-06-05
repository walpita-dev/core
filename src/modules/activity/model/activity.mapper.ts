import { Injectable } from "@nestjs/common";
import { CompleteActivityEntity } from "./complete-activity.entity";
import { CompleteActivityModel } from "./complete-activity.model";
import { CompleteActivityDto } from "./complete-activity.dto";


@Injectable()
export class ActivityMapper {
  constructor() {}

  completeActivityEntityToModel = (completeActivityEntity: CompleteActivityEntity): CompleteActivityModel => {
    return new CompleteActivityModel(
      completeActivityEntity.a_id,
      completeActivityEntity.a_uuid,
      completeActivityEntity.a_created_at,
      completeActivityEntity.a_last_modified_at,
      completeActivityEntity.al_FR_name,
      completeActivityEntity.al_FR_id,
      completeActivityEntity.al_EN_name,
      completeActivityEntity.al_EN_id,
      completeActivityEntity.a_rank,
    );
  }

  completeActivityModelToDto = (completeActivityModel: CompleteActivityModel): CompleteActivityDto => {
    return new CompleteActivityDto(
      completeActivityModel.uuid,
      completeActivityModel.created_at,
      completeActivityModel.last_modified_at,
      completeActivityModel.FR_name,
      completeActivityModel.EN_name,
    );
  }

}