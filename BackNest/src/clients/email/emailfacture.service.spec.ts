import { Test, TestingModule } from '@nestjs/testing';
import { EmailfactureService } from './emailfacture.service';

describe('EmailService', () => {
  let service: EmailfactureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailfactureService],
    }).compile();

    service = module.get<EmailfactureService>(EmailfactureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
