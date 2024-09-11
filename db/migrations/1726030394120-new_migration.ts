import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1726030394120 implements MigrationInterface {
    name = 'NewMigration1726030394120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vaccine_result\` (\`id\` int NOT NULL AUTO_INCREMENT, \`vaccineRegistrationId\` int NOT NULL, \`vaccineId\` int NOT NULL, \`vaccinationSiteId\` int NOT NULL, \`userId\` int NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD CONSTRAINT \`FK_a419fde59cd4d7135cf04869314\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD CONSTRAINT \`FK_b2b5ac5e9fbe333e1722e979504\` FOREIGN KEY (\`vaccineRegistrationId\`) REFERENCES \`vaccine_registration\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD CONSTRAINT \`FK_ddca493b06d148175493d4c62ba\` FOREIGN KEY (\`vaccineId\`) REFERENCES \`vaccine\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD CONSTRAINT \`FK_c3da6d04a050c20a4be4e79a997\` FOREIGN KEY (\`vaccinationSiteId\`) REFERENCES \`vaccination_site\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP FOREIGN KEY \`FK_c3da6d04a050c20a4be4e79a997\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP FOREIGN KEY \`FK_ddca493b06d148175493d4c62ba\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP FOREIGN KEY \`FK_b2b5ac5e9fbe333e1722e979504\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP FOREIGN KEY \`FK_a419fde59cd4d7135cf04869314\``);
        await queryRunner.query(`DROP TABLE \`vaccine_result\``);
    }

}
