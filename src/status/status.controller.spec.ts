import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';

describe('StatusController', () => {
  let controller: StatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
    }).compile();

    controller = module.get<StatusController>(StatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the service status payload', () => {
    const status = controller.getStatus();

    expect(status).toMatchObject({
      service: 'NestJS API',
      status: 'running',
    });
    expect(typeof status.timestamp).toBe('string');
    expect(new Date(status.timestamp).toString()).not.toBe('Invalid Date');
  });
});
