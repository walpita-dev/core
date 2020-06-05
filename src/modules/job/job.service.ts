import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { CompleteJobModel } from './model/complete-job.model';

@Injectable()
export class JobService {

  private logger = new Logger('JobService');

  constructor(
    private readonly jobRepository: JobRepository,
  ) {}

  searchCompleteJobs = async (lang: string, text: string): Promise<CompleteJobModel[]> => {
    const words = text.split(' ');
    try {
      if (words.length === 1 && words[0] !== '') {
        return await this.jobRepository.oneWorldCompleteJobSearch(lang, text);
      }
      if (words.length > 1) {
        return await this.jobRepository.multipleWorldCompleteJobSearch(lang, text);
      }
    } catch (err) {
      this.logger.error(`Error while searching job : ${err}`);
      throw new HttpException('Internal Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
