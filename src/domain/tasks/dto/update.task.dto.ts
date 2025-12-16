import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  // @IsOptional()
  // @IsEnum(TASK_SCHEDULE_TYPE)
  // type?: string;

  // @IsOptional()
  // intervalDays?: number;

  // @IsOptional()
  // startDate?: Date;

  // @IsOptional()
  // monthDay?: number;

  // @IsOptional()
  // weekdays?: number[];

  // @IsOptional()
  // specificDates?: number[];

  @IsOptional()
  isActive?: boolean;
}
