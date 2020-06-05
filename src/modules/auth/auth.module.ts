import { Module } from '@nestjs/common';
import { AccountController } from './auth.controller';
import { AccountService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { AccountRepository } from './auth.repository';
import { MssqlService } from '../mssql/mssql.service';
import { AccountMapper } from './models/account.mapper';
import { AuthorizationModule } from '../authorization/authorization.module';
import { PersonModule } from '../person/person.module';
import { ApplicationModule } from '../application/application.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
    AuthorizationModule,
    PersonModule,
    ApplicationModule,
  ],
  controllers: [AccountController],
  providers: [
    AccountService,
    JwtStrategy,
    LocalStrategy,
    AccountRepository,
    MssqlService,
    AccountMapper,
  ],
})
export class AuthModule {}
