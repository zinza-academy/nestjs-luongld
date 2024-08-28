import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1724812404855 implements MigrationInterface {
    name = 'NewMigration1724812404855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vaccine_result\` (\`id\` int NOT NULL AUTO_INCREMENT, \`vaccineRegistrationId\` int NOT NULL, \`vaccineId\` int NOT NULL, \`vaccineSiteId\` int NOT NULL, \`vaccinationSiteId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` DROP COLUMN \`injectionTime\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` DROP COLUMN \`injectionSite\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD CONSTRAINT \`FK_b2b5ac5e9fbe333e1722e979504\` FOREIGN KEY (\`vaccineRegistrationId\`) REFERENCES \`vaccine_registration\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD CONSTRAINT \`FK_ddca493b06d148175493d4c62ba\` FOREIGN KEY (\`vaccineId\`) REFERENCES \`vaccine\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD CONSTRAINT \`FK_c3da6d04a050c20a4be4e79a997\` FOREIGN KEY (\`vaccinationSiteId\`) REFERENCES \`vaccination_site\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP FOREIGN KEY \`FK_c3da6d04a050c20a4be4e79a997\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP FOREIGN KEY \`FK_ddca493b06d148175493d4c62ba\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP FOREIGN KEY \`FK_b2b5ac5e9fbe333e1722e979504\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` ADD \`injectionSite\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` ADD \`injectionTime\` date NOT NULL`);
        await queryRunner.query(`DROP TABLE \`vaccine_result\``);
    }

}
