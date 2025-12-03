import { Module } from '@nestjs/common';
import { TaskScheduleService } from './task_schedule.service';

@Module({
  controllers: [],
  providers: [TaskScheduleService],
  exports: [TaskScheduleService],
})
export class TaskScheduleModule {}
