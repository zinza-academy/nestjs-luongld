import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1726030352094 implements MigrationInterface {
    name = 'NewMigration1726030352094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD CONSTRAINT \`FK_a419fde59cd4d7135cf04869314\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP FOREIGN KEY \`FK_a419fde59cd4d7135cf04869314\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP COLUMN \`createdAt\``);
    }

}
