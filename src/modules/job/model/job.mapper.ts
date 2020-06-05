import { Injectable } from "@nestjs/common";
import { CompleteJobEntity } from "./complete-job.entity";
import { CompleteJobModel } from "./complete-job.model";
import { CompleteJobDto } from "./complete-job.dto";


@Injectable()
export class JobMapper {
  constructor() {}

  completeJobEntityToModel = (completeJobEntity: CompleteJobEntity): CompleteJobModel => {
    return new CompleteJobModel(
      completeJobEntity.j_id,
      completeJobEntity.j_uuid,
      completeJobEntity.j_rome_code,
      completeJobEntity.j_created_at,
      completeJobEntity.j_last_modified_at,
      completeJobEntity.jl_FR_name,
      completeJobEntity.jl_FR_id,
      completeJobEntity.jl_EN_name,
      completeJobEntity.jl_EN_id,
      completeJobEntity.jl_rank,
    );
  }

  completeJobModelToDto = (completeJobModel: CompleteJobModel): CompleteJobDto => {
    return new CompleteJobDto(
      completeJobModel.uuid,
      completeJobModel.rome_code,
      completeJobModel.created_at,
      completeJobModel.last_modified_at,
      completeJobModel.FR_name,
      completeJobModel.EN_name,
      completeJobModel.rank,
    );
  }

}