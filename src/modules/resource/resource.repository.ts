import { Injectable } from '@nestjs/common';
import { ResourceMapper } from './model/resource.mapper';
import { MssqlService } from '../mssql/mssql.service';
import { PersonEntity } from '../person/models/person.entity';
import { CompleteResourceEntity } from './model/complete-resource.entity';
import { CompleteResourceModel } from './model/complete-resource.model';

@Injectable()
export class ResourceRepository {

  constructor(
    private resourceMapper: ResourceMapper,
    private mssqlService: MssqlService,
  ) {}

  multipleWorldCompleteResourceSearch = async (language: string, searchText: string): Promise<CompleteResourceModel[]> => {

    const query_EN = `
    DECLARE @SearchString varchar(255)
    SET @SearchString = 'FormsOf(INFLECTIONAL, "' + @searchText + '")'

    SELECT FT_TBL.rl_EN_id, FT_TBL.rl_EN_name, KEY_TBL.RANK as rl_rank, r.r_id, r.r_uuid, r.r_created_at, r.r_last_modified_at, rt.rt_type, rs.rs_status, rl_FR.rl_FR_id, rl_FR.rl_FR_name
    FROM dbo.Resource_label_EN AS FT_TBL  
      INNER JOIN FREETEXTTABLE(Resource_label_EN, rl_EN_name, @SearchString ) AS KEY_TBL  ON FT_TBL.rl_EN_id = KEY_TBL.[KEY]
      INNER JOIN Resource r ON r.r_id = FT_TBL.rl_EN_id
      INNER JOIN Resource_label_FR rl_FR ON rl_FR.rl_FR_id = r.r_name_FR
      INNER JOIN Resource_status rs ON rs.rs_id = r.r_fk_resource_status_id
      INNER JOIN Resource_type rt ON rt_id = r.r_fk_resource_type_id
    ORDER BY KEY_TBL.RANK DESC;
    `;

    const query_FR = `
    DECLARE @SearchString varchar(255)
    SET @SearchString = 'FormsOf(INFLECTIONAL, "' + @searchText + '")'

    SELECT FT_TBL.rl_FR_id, FT_TBL.rl_FR_name, KEY_TBL.RANK as rl_rank, r.r_id, r.r_uuid, r.r_created_at, r.r_last_modified_at, rt.rt_type, rs.rs_status, rl_EN.rl_EN_id, rl_EN.rl_EN_name
    FROM dbo.Resource_label_FR AS FT_TBL  
      INNER JOIN FREETEXTTABLE(Resource_label_FR, rl_FR_name, @SearchString ) AS KEY_TBL  ON FT_TBL.rl_FR_id = KEY_TBL.[KEY]
      INNER JOIN Resource r ON r.r_id = FT_TBL.rl_FR_id
      INNER JOIN Resource_label_EN rl_EN ON rl_EN.rl_EN_id = r.r_name_EN
      INNER JOIN Resource_status rs ON rs.rs_id = r.r_fk_resource_status_id
      INNER JOIN Resource_type rt ON rt_id = r.r_fk_resource_type_id
    ORDER BY KEY_TBL.RANK DESC;
    `;

    const query = language === 'EN' ? query_EN : query_FR;

    const completeResourceEntities: CompleteResourceEntity[] = await this.mssqlService.execQuery<CompleteResourceEntity[]>(
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

    return completeResourceEntities.map((resourceEntity) => this.resourceMapper.completeResourceEntityToModel(resourceEntity));
  }

  oneWorldCompleteResourceSearch = async (language: string, searchText: string): Promise<CompleteResourceModel[]> => {
    const query_EN = `
    DECLARE @SearchString varchar(255)
    SET @SearchString = 'FormsOf(INFLECTIONAL, "' + @searchText + '")'

    SELECT FT_TBL.rl_EN_id, FT_TBL.rl_EN_name, KEY_TBL.RANK as rl_rank, r.r_id, r.r_uuid, r.r_created_at, r.r_last_modified_at, rt.rt_type, rs.rs_status, rl_FR.rl_FR_id, rl_FR.rl_FR_name
    FROM dbo.Resource_label_EN AS FT_TBL  
      INNER JOIN CONTAINSTABLE(Resource_label_EN, rl_EN_name, @SearchString ) AS KEY_TBL  ON FT_TBL.rl_EN_id = KEY_TBL.[KEY]
      INNER JOIN Resource r ON r.r_id = FT_TBL.rl_EN_id
      INNER JOIN Resource_label_FR rl_FR ON rl_FR.rl_FR_id = r.r_name_FR
      INNER JOIN Resource_status rs ON rs.rs_id = r.r_fk_resource_status_id
      INNER JOIN Resource_type rt ON rt_id = r.r_fk_resource_type_id
    ORDER BY KEY_TBL.RANK DESC;
    `;

    const query_FR = `
    DECLARE @SearchString varchar(255)
    SET @SearchString = 'FormsOf(INFLECTIONAL, "' + @searchText + '")'

    SELECT FT_TBL.rl_FR_id, FT_TBL.rl_FR_name, KEY_TBL.RANK as rl_rank, r.r_id, r.r_uuid, r.r_created_at, r.r_last_modified_at, rt.rt_type, rs.rs_status, rl_EN.rl_EN_id, rl_EN.rl_EN_name
    FROM dbo.Resource_label_FR AS FT_TBL  
      INNER JOIN CONTAINSTABLE(Resource_label_FR, rl_FR_name, @SearchString ) AS KEY_TBL  ON FT_TBL.rl_FR_id = KEY_TBL.[KEY]
      INNER JOIN Resource r ON r.r_id = FT_TBL.rl_FR_id
      INNER JOIN Resource_label_EN rl_EN ON rl_EN.rl_EN_id = r.r_name_EN
      INNER JOIN Resource_status rs ON rs.rs_id = r.r_fk_resource_status_id
      INNER JOIN Resource_type rt ON rt_id = r.r_fk_resource_type_id
    ORDER BY KEY_TBL.RANK DESC;
    `;

    const query = language === 'EN' ? query_EN : query_FR;

    const completeResourceEntities: CompleteResourceEntity[] = await this.mssqlService.execQuery<CompleteResourceEntity[]>(
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
    return completeResourceEntities.map((resourceEntity) => this.resourceMapper.completeResourceEntityToModel(resourceEntity));
  }
}
