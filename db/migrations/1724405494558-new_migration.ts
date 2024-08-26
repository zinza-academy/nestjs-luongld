import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1724405494558 implements MigrationInterface {
    name = 'NewMigration1724405494558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` DROP FOREIGN KEY \`FK_638ec06d6705017ed410e2ffeea\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` ADD CONSTRAINT \`FK_638ec06d6705017ed410e2ffeea\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` DROP FOREIGN KEY \`FK_638ec06d6705017ed410e2ffeea\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` ADD CONSTRAINT \`FK_638ec06d6705017ed410e2ffeea\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
