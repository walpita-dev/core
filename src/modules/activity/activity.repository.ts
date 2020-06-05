import { Injectable } from "@nestjs/common";
import { ActivityMapper } from "./model/activity.mapper";
import { MssqlService } from "../mssql/mssql.service";
import { CompleteActivityModel } from "./model/complete-activity.model";
import { CompleteActivityEntity } from "./model/complete-activity.entity";
import { CompleteJobModel } from "../job/model/complete-job.model";


@Injectable()
export class ActivityRepository {
  constructor(
    private activityMapper: ActivityMapper,
    private mssqlService: MssqlService,
  ) {}

  multipleWorldCompleteActivitySearch = async (language: string, searchText: string): Promise<CompleteActivityModel[]> => {

    const query_EN = `
    DECLARE @SearchString varchar(255)
    SET @SearchString = 'FormsOf(INFLECTIONAL, "' + @searchText + '")'

    SELECT FT_TBL.al_EN_id, FT_TBL.al_EN_name, KEY_TBL.RANK as al_rank, a.a_id, a.a_uuid, a.a_created_at, a.a_last_modified_at, al_FR.al_FR_id, al_FR.al_FR_name
    FROM dbo.Activity_label_EN AS FT_TBL
      INNER JOIN FREETEXTTABLE(Activity_label_EN, al_EN_name, @SearchString ) AS KEY_TBL  ON FT_TBL.al_EN_id = KEY_TBL.[KEY]
      INNER JOIN Activity a ON a.a_id = FT_TBL.al_EN_id
      INNER JOIN Activity_label_FR al_FR ON al_FR.al_FR_id = a.a_name_FR
    ORDER BY KEY_TBL.RANK DESC;
    `;

    const query_FR = `
    DECLARE @SearchString varchar(255)
    SET @SearchString = 'FormsOf(INFLECTIONAL, "' + @searchText + '")'

    SELECT FT_TBL.al_FR_id, FT_TBL.al_FR_name, KEY_TBL.RANK as al_rank, a.a_id, a.a_uuid, a.a_created_at, a.a_last_modified_at, al_EN.al_EN_id, al_EN.al_EN_name
    FROM dbo.Activity_label_FR AS FT_TBL
      INNER JOIN FREETEXTTABLE(Activity_label_FR, al_FR_name, @SearchString ) AS KEY_TBL  ON FT_TBL.al_FR_id = KEY_TBL.[KEY]
      INNER JOIN Activity a ON a.a_id = FT_TBL.al_FR_id
      INNER JOIN Activity_label_EN al_EN ON al_EN.al_EN_id = a.a_name_EN
    ORDER BY KEY_TBL.RANK DESC;
    `;

    const query = language === 'EN' ? query_EN : query_FR;

    const completeJobActivityEntities: CompleteActivityEntity[] = await this.mssqlService.execQuery<CompleteActivityEntity[]>(
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

    return completeJobActivityEntities.map((activityEntity) => this.activityMapper.completeActivityEntityToModel(activityEntity));
  }

  oneWorldCompleteActivitySearch = async (language: string, searchText: string): Promise<CompleteActivityModel[]> => {
    const query_EN = `
    DECLARE @SearchString varchar(255)
    SET @SearchString = 'FormsOf(INFLECTIONAL, "' + @searchText + '")'

    SELECT FT_TBL.al_EN_id, FT_TBL.al_EN_name, KEY_TBL.RANK as al_rank, a.a_id, a.a_uuid, a.a_created_at, a.a_last_modified_at, al_FR.al_FR_id, al_FR.al_FR_name
    FROM dbo.Activity_label_EN AS FT_TBL
      INNER JOIN CONTAINSTABLE(Activity_label_EN, al_EN_name, @SearchString ) AS KEY_TBL  ON FT_TBL.al_EN_id = KEY_TBL.[KEY]
      INNER JOIN Activity a ON a.a_id = FT_TBL.al_EN_id
      INNER JOIN Activity_label_FR al_FR ON al_FR.al_FR_id = a.a_name_FR
    ORDER BY KEY_TBL.RANK DESC;
    `;

    const query_FR = `
    DECLARE @SearchString varchar(255)
    SET @SearchString = 'FormsOf(INFLECTIONAL, "' + @searchText + '")'

    SELECT FT_TBL.al_FR_id, FT_TBL.al_FR_name, KEY_TBL.RANK as al_rank, a.a_id, a.a_uuid, a.a_created_at, a.a_last_modified_at, al_EN.al_EN_id, al_EN.al_EN_name
    FROM dbo.Activity_label_FR AS FT_TBL
      INNER JOIN CONTAINSTABLE(Activity_label_FR, al_FR_name, @SearchString ) AS KEY_TBL  ON FT_TBL.al_FR_id = KEY_TBL.[KEY]
      INNER JOIN Activity a ON a.a_id = FT_TBL.al_FR_id
      INNER JOIN Activity_label_EN al_EN ON al_EN.al_EN_id = a.a_name_EN
    ORDER BY KEY_TBL.RANK DESC;
    `;

    const query = language === 'EN' ? query_EN : query_FR;

    const completeActivityEntities: CompleteActivityEntity[] = await this.mssqlService.execQuery<CompleteActivityEntity[]>(
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
    return completeActivityEntities.map((activityEntity) => this.activityMapper.completeActivityEntityToModel(activityEntity));
  }

}