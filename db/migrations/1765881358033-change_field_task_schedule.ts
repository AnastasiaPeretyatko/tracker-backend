import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeFieldTaskSchedule1765881358033
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'task_schedule',
      'specific_dates',
      new TableColumn({
        name: 'specific_dates',
        type: 'date',
        isArray: true,
        isNullable: true,
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'task_schedule',
      'specific_dates',
      new TableColumn({
        name: 'specific_dates',
        isNullable: true,
        type: 'int',
      }),
    );
  }
}
