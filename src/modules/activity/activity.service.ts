import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { CompleteActivityModel } from './model/complete-activity.model';

@Injectable()
export class ActivityService {
  private logger = new Logger('ActivityService');

  constructor(
    private readonly activityRepository: ActivityRepository,
  ) {}

  searchCompleteActivities = async (lang: string, text: string): Promise<CompleteActivityModel[]> => {
    const words = text.split(' ');
    try {
      if (words.length === 1 && words[0] !== '') {
        return await this.activityRepository.oneWorldCompleteActivitySearch(lang, text);
      }
      if (words.length > 1) {
        return await this.activityRepository.multipleWorldCompleteActivitySearch(lang, text);
      }
    } catch (err) {
      this.logger.error(`Error while searching activity : ${err}`);
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
