import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTaskLogTable1763986214403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task_log',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'task_id', type: 'uuid', isNullable: false },
          { name: 'user_id', type: 'uuid', isNullable: false },
          { name: 'date', type: 'timestamp', default: 'now()' },
          { name: 'completed', type: 'boolean', default: false },
          { name: 'completed_at', type: 'timestamp', isNullable: true },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task_log');
  }
}
