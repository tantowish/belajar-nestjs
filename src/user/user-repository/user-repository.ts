import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) {
        console.info('Create user repository')
    }

    async save(firstName: string, lastName?: string): Promise<User> {
        return this.prismaService.user.create({
            data: {
                firstName: firstName,
                lastName: lastName
            }
        })
    }
}

