import { Injectable, OnModuleInit, OnModuleDestroy, Logger, HttpException, HttpStatus } from '@nestjs/common';
import * as sql from 'mssql';
import { QueryParameter, IQueryParameters } from './models/query-parameters.model';
import { ResultType } from './models/result-type.enum';

@Injectable()
export class MssqlService implements OnModuleInit, OnModuleDestroy {

  private logger = new Logger('MSSQLService', true);

  private poolPromise: any;
  private poolConnection: any;

  config = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    pool: {
      max: +process.env.DB_POOL_MAX,
      min: +process.env.DB_POOL_MIN
    },
    options: {
      encrypt: false
    }
  };

  onModuleInit() {
    try {
      this.poolPromise = new sql.ConnectionPool(this.config);
      this.poolConnection = this.poolPromise.connect();
    } catch (err) {
      this.logger.error(`Error whil connecting to databse : ${err}`)
      throw err;
    }
  }

  onModuleDestroy() {
    this.poolConnection.then(() => sql.close());
  }

  private buildQuery (sqlRequest: sql.Request, queryParams: QueryParameter[]) {

    if (!queryParams) {
      return sqlRequest;
    }
    queryParams.forEach((queryParam) => {
      const sqlQueryParamType = queryParam.maxType ?  sql[queryParam.type](queryParam.maxType) : sql[queryParam.type];
      if (queryParam.input) {
        sqlRequest.input(queryParam.label, sqlQueryParamType, queryParam.value);
      } else {
        sqlRequest.output(queryParam.label, sql[queryParam.type]);
      }
    });

    return sqlRequest;
  }

  private formatResults<T>(
    results:sql.IResult<T>,
    resultType:ResultType = ResultType.SINGLE_RECORDSET,
  ): sql.IRecordSet<T> | sql.IRecordSet<T>[] | T | {} {
    switch (resultType) {
      case ResultType.SINGLE_ROW:
        return results.recordset[0];
      case ResultType.NONE:
        return;
      case ResultType.SINGLE_RECORDSET:
        return results.recordset;
      case ResultType.MULTI_RECORDSET:
        return results.recordsets;
      case ResultType.OUTPUT:
        return results.output;
      case ResultType.REFRESH_TOKEN:
        return;
    }
  }

  private async execStatement<T>(
    parameters: IQueryParameters,
  ): Promise<sql.IRecordSet<T> | sql.IRecordSet<T>[] | T | {}>  {
    try {
      await this.poolConnection;
      let results: sql.IResult<T>;
      const sqlRequest: sql.Request = this.buildQuery(this.poolPromise.request(), parameters.queryParams);
      if (parameters.isStoredProc) {
        results = await sqlRequest.execute(parameters.query);
      } else {
        results = await sqlRequest.query(parameters.query);
      }
      return this.formatResults<T>(results, parameters.resultType);
    } catch (err) {
      this.logger.error(`Unexpected error inside the pool,
                        Query: ${parameters.query},
                        Error: ${err}`);
      throw err;
    }
  }

  execSingleRowQuery<T>(
      parameters: IQueryParameters,
    ): Promise<T> {
    parameters.resultType = parameters.resultType || ResultType.SINGLE_ROW;
    return <Promise<T>> this.execStatement<T>(parameters).catch((error) => {
        this.logger.error('execSingleRowQuery failed', JSON.stringify(error));
        throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  execQuery<T>(
    parameters: IQueryParameters,
  ): Promise<sql.IRecordSet<T>> {
    parameters.resultType = parameters.resultType || ResultType.SINGLE_RECORDSET;
    return <Promise<sql.IRecordSet<T>>> this.execStatement<T>(
      parameters,
    ).catch((error) => {
      this.logger.error('execQuery failed', JSON.stringify(error));
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  execSeveralQueries<T>(
    parameters: IQueryParameters,
  ): Promise<sql.IRecordSet<T>[]> {
    parameters.resultType = ResultType.MULTI_RECORDSET;
    return <Promise<sql.IRecordSet<T>[]>> this.execStatement<T>(
      parameters,
    ).catch((error) => {
      this.logger.error('execSeveralQueries failed', JSON.stringify(error));
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
