import { MigrationInterface, QueryRunner } from 'typeorm';

export class $NAME1763492572847 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }

  public async down(): Promise<void> {}
}
