import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1725422829344 implements MigrationInterface {
    name = 'NewMigration1725422829344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`district\` DROP FOREIGN KEY \`FK_23a21b38208367a242b1dd3a424\``);
        await queryRunner.query(`ALTER TABLE \`district\` CHANGE \`provinceId\` \`provinceId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`district\` ADD CONSTRAINT \`FK_23a21b38208367a242b1dd3a424\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`district\` DROP FOREIGN KEY \`FK_23a21b38208367a242b1dd3a424\``);
        await queryRunner.query(`ALTER TABLE \`district\` CHANGE \`provinceId\` \`provinceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`district\` ADD CONSTRAINT \`FK_23a21b38208367a242b1dd3a424\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD \`userId\` int NOT NULL`);
    }

}
