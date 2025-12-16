import { IsBoolean, IsDate, IsString } from 'class-validator';

export class CreateTaskLogDto {
  @IsString()
  taskId: string;

  @IsDate()
  date: Date;

  @IsBoolean()
  completed: boolean;

  @IsDate()
  completedAt: Date;
}
