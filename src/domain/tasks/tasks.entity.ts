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
import { TaskSchedule } from '../task_schedule/task_schedule.entity';
import { TaskLog } from '../task_log/task_log.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // FK поле
  @Column({ name: 'owner_id', nullable: false })
  ownerId: string;

  // связь с User
  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' }) // указываем, какой столбец является FK
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

  @OneToOne(() => TaskSchedule, (taskSchedule) => taskSchedule.task)
  taskSchedule: TaskSchedule;

  @OneToMany(() => TaskLog, (taskLog) => taskLog.task)
  taskLogs: TaskLog[];
}
