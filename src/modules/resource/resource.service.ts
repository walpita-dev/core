import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ResourceRepository } from './resource.repository';
import { CompleteResourceModel } from './model/complete-resource.model';
import { ResourceMapper } from './model/resource.mapper';

@Injectable()
export class ResourceService {

  private logger = new Logger('ResourceService');

  constructor(
    private readonly resourceRepository: ResourceRepository,
    private readonly resourceMapper: ResourceMapper,
  ) {}

  searchResources = async (lang: string, text: string): Promise<CompleteResourceModel[]> => {
    const words = text.split(' ');
    try {
      if (words.length === 1 && words[0] !== '') {
        return await this.resourceRepository.oneWorldCompleteResourceSearch(lang, text);
      }
      if (words.length > 1) {
        return await this.resourceRepository.multipleWorldCompleteResourceSearch(lang, text);
      }
    } catch (err) {
      this.logger.error(`Error while searching resource : ${err}`);
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
