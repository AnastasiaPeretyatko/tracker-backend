import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }
}
