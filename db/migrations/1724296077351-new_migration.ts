import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1724296077351 implements MigrationInterface {
    name = 'NewMigration1724296077351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`resetPasswordToken\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`resetPasswordToken\``);
    }

}
