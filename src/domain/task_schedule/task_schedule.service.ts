import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskSchedule } from './task_schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskScheduleService {
  constructor(
    @InjectRepository(TaskSchedule)
    private taskScheduleRepository: Repository<TaskSchedule>,
  ) {}

  async create(dto: Partial<TaskSchedule>) {
    const taskSchedule = this.taskScheduleRepository.create(dto);
    await this.taskScheduleRepository.save(taskSchedule);

    return taskSchedule;
  }

  async findOneById(id: string) {
    return await this.taskScheduleRepository.findOneBy({ id });
  }
}
