import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthorizationException extends HttpException {
  constructor(message: string = 'Unauthorized access: Invalid Credentials') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
