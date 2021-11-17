import {
  ExecutionContext,
  HttpException,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable({ scope: Scope.REQUEST })
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const { username, password } = context.switchToHttp().getRequest().body;

    if (!username || typeof username !== 'string') {
      throw new HttpException('username must be a string', 401);
    }
    if (!password || typeof username !== 'string') {
      throw new HttpException('password must be a string', 401);
    }

    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (!user) {
      throw new HttpException('invalid credentials', 401);
    }
    if (err) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
