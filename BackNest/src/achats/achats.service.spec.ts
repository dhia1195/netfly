/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AchatService } from './achats.service';

describe('AchatsService', () => {
  let service: AchatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AchatService],
    }).compile();

    service = module.get<AchatService>(AchatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
