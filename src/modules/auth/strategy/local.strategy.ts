import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../auth.service';
import { JwtPayload } from '../models/jwt-payload.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountService: AccountService) {
    super();
  }

  async validate(login: string, password: string, appName: string): Promise<JwtPayload> {
    return await this.accountService.validateAccount(login, password, appName);
  }
}