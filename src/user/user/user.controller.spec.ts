import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be say hello', async () => {
    const response = await controller.sayHello('Tantowi');
    expect(response).toBe('Hello Tantowi');
  });

  it('should can view hello', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Tantowi', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      name: 'Tantowi',
      title: 'Template Engine',
    });
  });
});
