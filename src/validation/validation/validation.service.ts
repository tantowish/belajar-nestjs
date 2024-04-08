import { Injectable } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationService {
  validate<T>(scheme: ZodType<T>, data: T): T {
    return scheme.parse(data);
  }
}
