import { Injectable } from "@nestjs/common";
import { JobMapper } from "./model/job.mapper";
import { MssqlService } from "../mssql/mssql.service";
import { CompleteJobModel } from "./model/complete-job.model";
import { CompleteJobEntity } from "./model/complete-job.entity";


@Injectable()
export class JobRepository {
  constructor(
    private jobMapper: JobMapper,
    private mssqlService: MssqlService,
  ) {}

  multipleWorldCompleteJobSearch = async (language: string, searchText: string): Promise<CompleteJobModel[]> => {

    const query_EN = `
    DECLARE @SearchString varchar(255)
    SET @SearchString = 'FormsOf(INFLECTIONAL, "' + @searchText + '")'

    SELECT FT_TBL.jl_EN_id, FT_TBL.jl_EN_name, KEY_TBL.RANK as jl_rank, j.j_id, j.j_uuid, j.j_created_at, j.j_last_modified_at, j.j_rome_code, jl_FR.jl_FR_id, jl_FR.jl_FR_name
    FROM dbo.Job_label_EN AS FT_TBL
      INNER JOIN FREETEXTTABLE(Job_label_EN, jl_EN_name, @SearchString ) AS KEY_TBL  ON FT_TBL.jl_EN_id = KEY_TBL.[KEY]
      INNER JOIN Job j ON j.j_id = FT_TBL.jl_EN_id
      INNER JOIN Job_label_FR jl_FR ON jl_FR.jl_FR_id = j.j_name_FR
    ORDER BY KEY_TBL.RANK DESC;
    `;

    const query_FR = `
    DECLARE @SearchString varchar(255)
    SET @SearchString = 'FormsOf(INFLECTIONAL, "' + @searchText + '")'

    SELECT FT_TBL.jl_FR_id, FT_TBL.jl_FR_name, KEY_TBL.RANK as jl_rank, j.j_id, j.j_uuid, j.j_created_at, j.j_last_modified_at, j.j_rome_code, jl_EN.jl_EN_id, jl_EN.jl_EN_name
    FROM dbo.Job_label_FR AS FT_TBL
      INNER JOIN FREETEXTTABLE(Job_label_FR, jl_FR_name, @SearchString ) AS KEY_TBL  ON FT_TBL.jl_FR_id = KEY_TBL.[KEY]
      INNER JOIN Job j ON j.j_id = FT_TBL.jl_FR_id
      INNER JOIN Job_label_EN jl_EN ON jl_EN.jl_EN_id = j.j_name_EN
    ORDER BY KEY_TBL.RANK DESC;
    `;

    const query = language === 'EN' ? query_EN : query_FR;

    const completeJobEntities: CompleteJobEntity[] = await this.mssqlService.execQuery<CompleteJobEntity[]>(
      {
        isStoredProc: false,
        query,
        queryParams: [
          {
            label: 'searchText', type: 'VarChar', value: searchText, maxType: 255,
            input: true,
          },
        ],
      });

    return completeJobEntities.map((jobEntity) => this.jobMapper.completeJobEntityToModel(jobEntity));
  }

  oneWorldCompleteJobSearch = async (language: string, searchText: string): Promise<CompleteJobModel[]> => {
    const query_EN = `
    DECLARE @SearchString varchar(255)
    SET @SearchString = 'FormsOf(INFLECTIONAL, "' + @searchText + '")'

    SELECT FT_TBL.jl_EN_id, FT_TBL.jl_EN_name, KEY_TBL.RANK as jl_rank, j.j_id, j.j_uuid, j.j_created_at, j.j_last_modified_at, j.j_rome_code, jl_FR.jl_FR_id, jl_FR.jl_FR_name
    FROM dbo.Job_label_EN AS FT_TBL
      INNER JOIN CONTAINSTABLE(Job_label_EN, jl_EN_name, @SearchString ) AS KEY_TBL  ON FT_TBL.jl_EN_id = KEY_TBL.[KEY]
      INNER JOIN Job j ON j.j_id = FT_TBL.jl_EN_id
      INNER JOIN Job_label_FR jl_FR ON jl_FR.jl_FR_id = j.j_name_FR
    ORDER BY KEY_TBL.RANK DESC;
    `;

    const query_FR = `
    DECLARE @SearchString varchar(255)
    SET @SearchString = 'FormsOf(INFLECTIONAL, "' + @searchText + '")'

    SELECT FT_TBL.jl_FR_id, FT_TBL.jl_FR_name, KEY_TBL.RANK as jl_rank, j.j_id, j.j_uuid, j.j_created_at, j.j_last_modified_at, j.j_rome_code, jl_EN.jl_EN_id, jl_EN.jl_EN_name
    FROM dbo.Job_label_FR AS FT_TBL
      INNER JOIN CONTAINSTABLE(Job_label_FR, jl_FR_name, @SearchString ) AS KEY_TBL  ON FT_TBL.jl_FR_id = KEY_TBL.[KEY]
      INNER JOIN Job j ON j.j_id = FT_TBL.jl_FR_id
      INNER JOIN Job_label_EN jl_EN ON jl_EN.jl_EN_id = j.j_name_EN
    ORDER BY KEY_TBL.RANK DESC;
    `;

    const query = language === 'EN' ? query_EN : query_FR;

    const completeJobEntities: CompleteJobEntity[] = await this.mssqlService.execQuery<CompleteJobEntity[]>(
      {
        isStoredProc: false,
        query,
        queryParams: [
          {
            label: 'searchText', type: 'VarChar', value: searchText, maxType: 255,
            input: true,
          },
        ],
      });
    return completeJobEntities.map((jobEntity) => this.jobMapper.completeJobEntityToModel(jobEntity));
  }

}