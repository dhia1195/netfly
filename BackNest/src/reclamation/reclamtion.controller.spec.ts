import { Test, TestingModule } from '@nestjs/testing';
import { reclamationController } from './reclamation.controller';

describe('reclamationController', () => {
  let controller: reclamationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [reclamationController],
    }).compile();

    controller = module.get<reclamationController>(reclamationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
