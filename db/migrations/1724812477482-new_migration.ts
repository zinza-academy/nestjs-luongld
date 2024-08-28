import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1724812477482 implements MigrationInterface {
    name = 'NewMigration1724812477482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP COLUMN \`vaccineSiteId\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP FOREIGN KEY \`FK_c3da6d04a050c20a4be4e79a997\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` CHANGE \`vaccinationSiteId\` \`vaccinationSiteId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD CONSTRAINT \`FK_c3da6d04a050c20a4be4e79a997\` FOREIGN KEY (\`vaccinationSiteId\`) REFERENCES \`vaccination_site\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP FOREIGN KEY \`FK_c3da6d04a050c20a4be4e79a997\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` CHANGE \`vaccinationSiteId\` \`vaccinationSiteId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD CONSTRAINT \`FK_c3da6d04a050c20a4be4e79a997\` FOREIGN KEY (\`vaccinationSiteId\`) REFERENCES \`vaccination_site\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD \`vaccineSiteId\` int NOT NULL`);
    }

}
