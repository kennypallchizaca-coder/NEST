import { Controller, Get } from '@nestjs/common';

interface ServiceStatus {
  service: string;
  status: string;
  timestamp: string;
}

@Controller('status')
export class StatusController {
  @Get()
  getStatus(): ServiceStatus {
    return {
      service: 'NestJS API',
      status: 'running',
      timestamp: new Date().toISOString(),
    };
  }
}
