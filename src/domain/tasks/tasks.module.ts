import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { JwtService } from '@nestjs/jwt';
import { TaskSchedule, TaskScheduleModule } from '../task_schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskSchedule]), TaskScheduleModule],
  controllers: [TasksController],
  providers: [TasksService, JwtService],
  exports: [],
})
export class TasksModule {}
