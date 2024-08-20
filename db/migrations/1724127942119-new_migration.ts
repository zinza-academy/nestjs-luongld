import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1724127942119 implements MigrationInterface {
    name = 'NewMigration1724127942119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`age\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` enum ('user', 'admin') NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`age\` int NOT NULL`);
    }

}
