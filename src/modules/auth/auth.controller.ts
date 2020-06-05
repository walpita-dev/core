import { Controller, Post, Request, UseGuards, Body, Get, Delete, Param } from '@nestjs/common';
import { AccountService } from './auth.service';
import { CreateAccountDto } from './models/create-account.dto';
import { Observable, from } from 'rxjs';
import { JWTDto } from './models/jwt.dto';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  
  @Post('login')
  login(@Body() body): Observable<JWTDto> {
    return from(this.accountService.login(body));
  }

  @Post('create-account')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN_SKILVIOO')
  createAccount(@Body() createAccountDto: CreateAccountDto): Observable<void> {
    return from(this.accountService.createAccount(createAccountDto));
  }

  @Delete('delete-account/:uuid')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('ADMIN_SKILVIOO')
  deleteAccount(@Param() params): Observable<void> {
    return from(this.accountService.deleteAccount(params.uuid));
  }

  @Get('refresh-token')
  getRefreshToken(@Request() req): Observable<JWTDto> {
    return from(this.accountService.getRefreshToken(req)); 
  }

}
