import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { Task } from './tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { AuthModule } from '../auth';
import { TaskSchedule, TaskScheduleModule } from '../task_schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskSchedule]),
    AuthModule,
    TaskScheduleModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
