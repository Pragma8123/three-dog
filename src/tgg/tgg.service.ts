import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TggService {
  constructor(private readonly httpService: HttpService) {}

  async postStats(
    botId: string,
    serverCount: number,
  ): Promise<AxiosResponse<any>> {
    return firstValueFrom(
      this.httpService.post(`/bots/${botId}/stats`, {
        server_count: serverCount,
      }),
    );
  }
}
