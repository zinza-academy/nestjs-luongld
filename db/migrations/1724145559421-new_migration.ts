import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1724145559421 implements MigrationInterface {
    name = 'NewMigration1724145559421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`cccd\` \`citizenId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`citizenId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`citizenId\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`citizenId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`citizenId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`citizenId\` \`cccd\` varchar(255) NOT NULL`);
    }

}
