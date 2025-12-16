import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskLog } from './task_log.entity';
import { Repository } from 'typeorm';
import { CreateTaskLogDto } from './dto';
import { TasksService } from '../tasks/tasks.service';
import { TASK_SCHEDULE_TYPE } from 'src/common/enum';

@Injectable()
export class TaskLogService {
  constructor(
    @InjectRepository(TaskLog)
    private readonly taskLogRepository: Repository<TaskLog>,
    private readonly taskService: TasksService,
  ) {}

  async create(userId: string, body: CreateTaskLogDto) {
    const taskLog = this.taskLogRepository.create({
      ...body,
      userId,
    });

    const task = await this.taskService.findOneById(body.taskId);

    if (
      task?.taskSchedule.type === TASK_SCHEDULE_TYPE.SPECIFIC_DATES &&
      task?.taskSchedule.specificDates?.length === 1 &&
      taskLog.completed
    ) {
      await this.taskService.update(userId, task.id, { isActive: false });
    }

    return await this.taskLogRepository.save(taskLog);
  }
}
