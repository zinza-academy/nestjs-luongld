import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1724296612209 implements MigrationInterface {
    name = 'NewMigration1724296612209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`resetPasswordToken\` \`resetPasswordToken\` varchar(255) NOT NULL`);
    }

}
