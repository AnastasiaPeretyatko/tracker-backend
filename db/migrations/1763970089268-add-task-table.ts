import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTaskTable1763970089268 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Создаём таблицу task
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          {
            name: 'owner_id',
            type: 'uuid',
          },
          { name: 'title', type: 'varchar' },
          { name: 'description', type: 'varchar', isNullable: true },
          { name: 'is_active', type: 'boolean', default: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
        ],
      }),
    );

    // Добавляем внешний ключ
    await queryRunner.createForeignKey(
      'task',
      new TableForeignKey({
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user', // !!! название таблицы с пользователями
        onDelete: 'CASCADE', // если пользователь удалён — удаляем его задачи
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('task');

    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('owner_id') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('task', foreignKey);
      }
    }

    await queryRunner.dropTable('task');
  }
}
