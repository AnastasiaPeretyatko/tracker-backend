import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import { User } from './domain/user';
import { AuthModule } from './domain/auth';
import { UserModule } from './domain/user/user.module';
import { TasksModule } from './domain/tasks/tasks.module';
import { Task } from './domain/tasks';
import { TaskSchedule, TaskScheduleModule } from './domain/task_schedule';
import { TaskLog } from './domain/task_log/task_log.entity';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [User, Task, TaskSchedule, TaskLog],
        migrations: [],
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    TasksModule,
    TaskScheduleModule,
  ],
})
export class AppModule {}
