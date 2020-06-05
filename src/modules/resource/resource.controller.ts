import { Controller, Get, Body, Query } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceMapper } from './model/resource.mapper';
import { Observable, from } from 'rxjs';
import { CompleteResourceDto } from './model/complete-resource.dto';

@Controller('resource')
export class ResourceController {
  constructor(
    private readonly resourceService: ResourceService,
    private readonly resourceMapper: ResourceMapper,
  ) {}

  @Get('search')
  searchCompleteResource(
    @Query('lang') lang: 'FR' | 'EN',
    @Query('text') text: string,
  ): Observable<CompleteResourceDto[]> {
    const resourceModels = this.resourceService.searchResources(lang, text);
    return from(resourceModels.then((resourceModels) => resourceModels.map((resourceModel) => this.resourceMapper.completeResourceModelToDto(resourceModel))));
  }
}

