import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { Observable } from 'rxjs';
import { TggService } from './tgg.service';

describe('TggService', () => {
  let service: TggService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [TggService],
    })
      .overrideProvider(HttpService)
      .useValue({
        post: jest.fn(),
      })
      .compile();

    service = module.get<TggService>(TggService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('postStats', () => {
    it('should return', async () => {
      jest
        .spyOn(httpService, 'post')
        .mockReturnValue(new Observable((observer) => observer.next()));

      expect(await service.postStats('test-id', 1));
    });
  });
});
