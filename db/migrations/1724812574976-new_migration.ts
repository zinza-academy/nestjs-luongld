import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1724812574976 implements MigrationInterface {
    name = 'NewMigration1724812574976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` DROP FOREIGN KEY \`FK_8dd54e2c71d22de01b3d4af7c0e\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` DROP COLUMN \`vaccineId\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` ADD \`vaccineId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` ADD CONSTRAINT \`FK_8dd54e2c71d22de01b3d4af7c0e\` FOREIGN KEY (\`vaccineId\`) REFERENCES \`vaccine\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
