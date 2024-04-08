import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { User } from '@prisma/client';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class UserRepository {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {
    console.info('Create user repository');
    this.logger.info('Create user repository');
  }

  async save(firstName: string, lastName?: string): Promise<User> {
    this.logger.info(
      `Create user with firstName ${firstName} and lastName ${lastName}`,
    );
    return this.prismaService.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }
}
