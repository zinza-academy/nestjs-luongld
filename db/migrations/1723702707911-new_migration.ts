import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1723702707911 implements MigrationInterface {
    name = 'NewMigration1723702707911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`age\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`age\` int NOT NULL`);
    }

}
