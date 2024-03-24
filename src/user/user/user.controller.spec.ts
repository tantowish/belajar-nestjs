import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http'

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be say hello', async () => {
    const response = await controller.sayHello('Tantowi', 'Shah')
    expect(response).toBe('Hello Tantowi Shah')
  });

  it('should can view hello', async () => {
    const response = httpMock.createResponse()
    controller.viewHello('Tantowi',response)

    expect(response._getRenderView()).toBe('index.html')
    expect(response._getRenderData()).toEqual({
      name: "Tantowi",
      title: "Template Engine"
    })
  });
});
