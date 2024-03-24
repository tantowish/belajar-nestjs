import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response, response } from 'express';

@Controller('/api/users')
export class UserController {

    @Get('/view/hello')
    viewHello(@Query('name') name: string, @Res() response: Response){
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

    @Get('/hello')
    async sayHello(
        @Query('firstName') firstName: string,
        @Query('lastName') lastName: string,

    ): Promise<String> {
        return `Hello ${firstName + ' ' + lastName || 'Guest'}`
    }
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
