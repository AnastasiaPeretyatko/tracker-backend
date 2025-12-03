import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTaskLogTable1763981530585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task_schedule',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'task_id', type: 'uuid', isNullable: false },
          {
            name: 'type',
            type: 'enum',
            enum: [
              'daily',
              'every_n_days',
              'weekly',
              'monthly',
              'specific_dates',
            ],
          },
          { name: 'interval_days', isNullable: true, type: 'int' },
          { name: 'start_date', isNullable: true, type: 'timestamp' },
          { name: 'weekdays', isNullable: true, type: 'int' },
          { name: 'month_day', isNullable: true, type: 'int' },
          {
            name: 'specific_dates',
            isNullable: true,
            type: 'int',
          },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task_schedule');
  }
}
