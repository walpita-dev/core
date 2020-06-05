import { Injectable } from "@nestjs/common";
import { CompleteResourceModel } from "./complete-resource.model";
import { CompleteResourceEntity } from "./complete-resource.entity";
import { CompleteResourceDto } from "./complete-resource.dto";


@Injectable()
export class ResourceMapper {
  constructor() {}

  completeResourceEntityToModel = (completeResourceEntity: CompleteResourceEntity): CompleteResourceModel => {
    return new CompleteResourceModel(
      completeResourceEntity.r_id,
      completeResourceEntity.rl_EN_id,
      completeResourceEntity.rl_EN_name,
      completeResourceEntity.rl_rank,
      completeResourceEntity.r_uuid,
      completeResourceEntity.r_created_at,
      completeResourceEntity.r_last_modified_at,
      completeResourceEntity.rt_type,
      completeResourceEntity.rs_status,
      completeResourceEntity.rl_FR_name,
      completeResourceEntity.rl_FR_id,
    );
  }

  completeResourceModelToDto = (completeResourceModel: CompleteResourceModel): CompleteResourceDto => {
    return new CompleteResourceDto(
      completeResourceModel.EN_name,
      completeResourceModel.rank,
      completeResourceModel.uuid,
      completeResourceModel.created_at,
      completeResourceModel.last_modified_at,
      completeResourceModel.type,
      completeResourceModel.status,
      completeResourceModel.FR_name,
    );
  }
}