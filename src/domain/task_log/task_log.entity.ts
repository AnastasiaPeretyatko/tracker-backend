import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from '../tasks';
import { User } from '../user';

@Entity('task_log')
export class TaskLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  completed: boolean;

  @Column({ name: 'completed_at', nullable: true })
  completedAt: Date;

  @Column()
  taskId: string;

  @Column()
  userId: string;

  @ManyToOne(() => Task, (task) => task.taskLogs)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => User, (user) => user.taskLog)
  @JoinColumn({ name: 'user_id' })
  user: Task[];
}
