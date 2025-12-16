import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddScheduleId1765830368595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'task',
      new TableColumn({ name: 'schedule_id', type: 'uuid', isNullable: true }),
    );

    await queryRunner.dropColumn('task_schedule', 'task_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('task', 'schedule_id');

    await queryRunner.addColumn(
      'task_schedule',
      new TableColumn({ name: 'task_id', type: 'uuid', isNullable: false }),
    );
  }
}
