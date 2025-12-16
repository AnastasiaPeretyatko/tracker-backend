import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskLog } from './task_log.entity';
import { TaskLogService } from './task_log.service';
import { TaskLogController } from './task_log.controller';
import { AuthModule } from '../auth';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskLog]), AuthModule, TasksModule],
  controllers: [TaskLogController],
  providers: [TaskLogService],
  exports: [TaskLogService],
})
export class TaskLogModule {}
