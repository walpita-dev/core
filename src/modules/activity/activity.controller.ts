import { Controller, Get, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityMapper } from './model/activity.mapper';
import { Observable, from } from 'rxjs';
import { CompleteActivityDto } from './model/complete-activity.dto';

@Controller('activity')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly activityMapper: ActivityMapper,
  ) {}

  @Get('complete-search')
  searchCompleteActivity(
    @Query('lang') lang: 'FR' | 'EN',
    @Query('text') text: string,
  ): Observable<CompleteActivityDto[]> {
    const completeActivities = this.activityService.searchCompleteActivities(lang, text);
    return from(completeActivities.then((completeActivities) => completeActivities.map((completeActivitie) => this.activityMapper.completeActivityModelToDto(completeActivitie))));
  }
}

