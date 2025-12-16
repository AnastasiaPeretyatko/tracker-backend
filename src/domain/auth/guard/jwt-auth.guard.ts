import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ApiException } from 'src/common/exceptions/api.exceptions';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token || typeof token !== 'string') {
        throw ApiException.unauthorized('User is not authorized');
      }

      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY || 'Secret',
      });
      request.user = user;
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw ApiException.unauthorized('User is not authorized');
    }
  }
}
