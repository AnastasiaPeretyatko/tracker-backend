import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TaskLogService } from './task_log.service';
import { JwtAuthGuard } from '../auth';
import { CreateTaskLogDto } from './dto';

@Controller('task_log')
export class TaskLogController {
  constructor(private readonly taskLogService: TaskLogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() { user }, @Body() body: CreateTaskLogDto) {
    return await this.taskLogService.create(user.id, body);
  }
}
