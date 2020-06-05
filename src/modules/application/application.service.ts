import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ApplicationModel } from './model/application.model';
import { ApplicationRepository } from './application.repository';
import { ApplicationMapper } from './model/application.mapper';

@Injectable()
export class ApplicationService {

  private logger = new Logger('ApplicationService');

  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly applicationMapper: ApplicationMapper,
  ) {}

  getApplicationByName = async (name: string): Promise<ApplicationModel> => {
    try {
      const ApplicationEntity = await this.applicationRepository.getApplicationByName(name);
      return this.applicationMapper.entityToModel(ApplicationEntity);
    } catch (err) {
      this.logger.error(`Error while getting application for name ${name}: ${err}`);
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
