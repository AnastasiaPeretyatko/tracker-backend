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
    this.taskScheduleRepository.create({
      ...dto,
    });

    return await this.taskScheduleRepository.save(dto);
  }

  async findOneById(id: string) {
    return await this.taskScheduleRepository.findOneBy({ id });
  }
}
