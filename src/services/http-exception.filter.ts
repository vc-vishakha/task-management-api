import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthorizationException } from './authorization.exception';

@Catch(AuthorizationException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: AuthorizationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
        path: request.url,
      });
  }
}