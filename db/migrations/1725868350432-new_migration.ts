import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1725868350432 implements MigrationInterface {
    name = 'NewMigration1725868350432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD CONSTRAINT \`FK_a419fde59cd4d7135cf04869314\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP FOREIGN KEY \`FK_a419fde59cd4d7135cf04869314\``);
    }

}
