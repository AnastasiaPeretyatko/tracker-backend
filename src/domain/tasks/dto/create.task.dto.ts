import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TASK_SCHEDULE_TYPE } from 'src/common/enum';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  // @IsOptional()
  @IsEnum(TASK_SCHEDULE_TYPE)
  type: string;

  @IsOptional()
  intervalDays?: number;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  monthDay?: number;

  @IsOptional()
  weekdays?: number[];

  @IsOptional()
  specificDates?: number[];

  @IsOptional()
  isActive?: boolean;
}
