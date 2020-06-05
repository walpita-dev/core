import { Controller, Get, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { JobMapper } from './model/job.mapper';
import { Observable, from } from 'rxjs';
import { CompleteJobDto } from './model/complete-job.dto';

@Controller('job')
export class JobController {

  constructor(
    private readonly jobService: JobService,
    private readonly jobMapper: JobMapper,
  ) {}

  @Get('complete-search')
  searchCompleteJob(
    @Query('lang') lang: 'FR' | 'EN',
    @Query('text') text: string,
  ): Observable<CompleteJobDto[]> {
    const completeJobsModels = this.jobService.searchCompleteJobs(lang, text);
    return from(completeJobsModels.then((completeJobsModels) => completeJobsModels.map((completeJobsModel) => this.jobMapper.completeJobModelToDto(completeJobsModel))));
  }
}
