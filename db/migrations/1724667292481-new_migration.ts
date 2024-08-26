import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1724667292481 implements MigrationInterface {
    name = 'NewMigration1724667292481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine\` DROP COLUMN \`vaccinationDate\``);
        await queryRunner.query(`ALTER TABLE \`vaccine\` DROP COLUMN \`vaccinationLocation\``);
        await queryRunner.query(`ALTER TABLE \`vaccine\` DROP COLUMN \`vaccineRegistrationId\``);
        await queryRunner.query(`ALTER TABLE \`vaccine\` ADD \`batchNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine\` DROP COLUMN \`injectionNo\``);
        await queryRunner.query(`ALTER TABLE \`vaccine\` ADD \`injectionNo\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine\` DROP COLUMN \`vaccineName\``);
        await queryRunner.query(`ALTER TABLE \`vaccine\` ADD \`vaccineName\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine\` DROP COLUMN \`vaccineName\``);
        await queryRunner.query(`ALTER TABLE \`vaccine\` ADD \`vaccineName\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine\` DROP COLUMN \`injectionNo\``);
        await queryRunner.query(`ALTER TABLE \`vaccine\` ADD \`injectionNo\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine\` DROP COLUMN \`batchNumber\``);
        await queryRunner.query(`ALTER TABLE \`vaccine\` ADD \`vaccineRegistrationId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine\` ADD \`vaccinationLocation\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine\` ADD \`vaccinationDate\` varchar(255) NOT NULL`);
    }

}
