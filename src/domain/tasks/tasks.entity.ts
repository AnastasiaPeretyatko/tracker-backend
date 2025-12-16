import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user';
import { TaskSchedule } from '../task_schedule';
import { TaskLog } from '../task_log/task_log.entity';
// import { TaskLog } from '../task_log/task_log.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'owner_id', nullable: false })
  ownerId: string;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'created_at', default: 'now()' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: 'now()' })
  updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @Column({ name: 'task_schedule_id', nullable: true })
  taskScheduleId: string;

  // связь с TaskSchedule
  @OneToOne(() => TaskSchedule)
  @JoinColumn({ name: 'task_schedule_id' }) // указываем, какой столбец является FK
  taskSchedule: TaskSchedule;

  // связь с TaskLog
  @OneToMany(() => TaskLog, (taskLog) => taskLog.task)
  taskLogs: TaskLog[];
}
