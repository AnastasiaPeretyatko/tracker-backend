import { Module } from '@nestjs/common';
import { TaskScheduleService } from './task_schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskSchedule } from './task_schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskSchedule])],
  controllers: [],
  providers: [TaskScheduleService],
  exports: [TaskScheduleService],
})
export class TaskScheduleModule {}
