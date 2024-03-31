import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Inject, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { MailService } from '../mail/mail.service';
import { UserRepository } from '../user-repository/user-repository';
import { MemberService } from '../member/member.service';
import { User } from '@prisma/client';

@Controller('/api/users')
export class UserController {
    constructor(
        private service: UserService,
        private connection: Connection,
        private mailService: MailService,
        private userRepository: UserRepository,
        @Inject('EmailService') private emailService: MailService,
        private memberService: MemberService
    ) { }

    @Get('/')
    async getUser(): Promise<User[]>{
        return this.userRepository.getUsers()
    }

    @Get('/create')
    async create(@Query('firstName') firstName: string, @Query('lastName') lastName: string): Promise<User> {
        return this.userRepository.save(firstName, lastName)
    }

    @Get('/connection')
    async getConnection(): Promise<string> {
        this.mailService.send()
        this.emailService.send()

        console.info(this.memberService.getConnectionName())
        this.memberService.sendEmail()

        return this.connection.getName()
    }

    @Get('/hello')
    async sayHello(@Query('name') name: string): Promise<string> {
        return this.service.sayHello(name)
    }

    @Get('/view/hello')
    viewHello(@Query('name') name: string, @Res() response: Response) {
        response.render('index.html', {
            title: 'Template Engine',
            name: name
        })
    }

    @Get('/set-cookie')
    setCookie(@Query('name') name: string, @Res() response: Response) {
        response.cookie('name', name)
        response.status(200).send('Success Set Cookie')
    }

    @Get('/get-cookie')
    getCookie(@Req() request: Request): string {
        return request.cookies['name']
    }

    @Get('/sample-response')
    @Header('Content-Type', 'application/json')
    @HttpCode(200)
    sampleResponse(): Record<string, string> {
        return {
            data: "Hello World"
        }
    }

    @Get('/redirect')
    @Redirect()
    redirect(): HttpRedirectResponse {
        return {
            url: '/api/users/sample-response',
            statusCode: 301
        }
    }

    // @Get('/hello')
    // async sayHello(
    //     @Query('firstName') firstName: string,
    //     @Query('lastName') lastName: string,

    // ): Promise<String> {
    //     return `Hello ${firstName + ' ' + lastName || 'Guest'}`
    // }

    @Get('/:id')
    getById(@Param('id') id: BigInteger): string {
        return `GET ${id}`
    }

    @Post()
    post(): string {
        return 'POST'
    }

    @Get('/test')
    get(): string {
        return 'GET'
    }
}
