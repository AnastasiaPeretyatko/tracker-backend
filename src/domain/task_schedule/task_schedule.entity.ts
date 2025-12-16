import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TASK_SCHEDULE_TYPE } from 'src/common/enum';

@Entity('task_schedule')
export class TaskSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ enum: TASK_SCHEDULE_TYPE })
  type: string;

  @Column({ name: 'interval_days', nullable: true })
  intervalDays: number;

  @Column({ name: 'start_date', nullable: true })
  startDate: Date;

  @Column({ name: 'month_day', nullable: true })
  monthDay: number;

  @Column({ array: true, nullable: true, type: 'int' })
  weekdays?: number[];

  @Column({ name: 'specific_dates', array: true, nullable: true, type: 'date' })
  specificDates?: Date[];

  @Column({ name: 'created_at', type: 'timestamp', default: 'now()' })
  createdAt: Date;
}
