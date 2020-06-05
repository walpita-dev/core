import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MssqlModule } from './modules/mssql/mssql.module';
import { PersonModule } from './modules/person/person.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ResourceModule } from './modules/resource/resource.module';
import { JobModule } from './modules/job/job.module';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
  imports: [
    MssqlModule,
    PersonModule,
    AuthModule,
    ResourceModule,
    JobModule,
    ActivityModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
