import { Injectable } from "@nestjs/common";

import { MssqlService } from "../mssql/mssql.service";
import { ApplicationEntity } from "./model/application.entity";

@Injectable()
export class ApplicationRepository {
  constructor(
    private readonly mssqlService: MssqlService,
  ) {}

  getApplicationByName = async (name: string): Promise<ApplicationEntity> => {
    const query = `
    SELECT * FROM Application WHERE app_name = @name
    `;
    return await this.mssqlService.execSingleRowQuery<ApplicationEntity>(
      {
        isStoredProc: false,
        query,
        queryParams: [
          {
            label: 'name', type: 'VarChar', value: name, maxType: 50,
            input: true,
          },
        ],
      });
  }
}