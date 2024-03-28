import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Connection } from '../connection/connection';
import { MailService, mailService } from '../mail/mail.service';

@Injectable()
export class MemberService {
    constructor(private modulRef: ModuleRef){

    }

    getConnectionName(): string {
        const connection = this.modulRef.get(Connection)
        return connection.getName()
    }

    sendEmail(){
        const emailService = this.modulRef.get(MailService)
        mailService.send()
    }

}
