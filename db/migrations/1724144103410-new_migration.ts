import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1724144103410 implements MigrationInterface {
  name = 'NewMigration1724144103410';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`dateOfBirth\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`dateOfBirth\` date NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`dateOfBirth\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`dateOfBirth\` varchar(255) NOT NULL`,
    );
  }
}
