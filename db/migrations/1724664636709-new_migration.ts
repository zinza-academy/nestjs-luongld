import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1724664636709 implements MigrationInterface {
    name = 'NewMigration1724664636709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vaccine\` (\`id\` int NOT NULL AUTO_INCREMENT, \`injectionNo\` varchar(255) NOT NULL, \`vaccinationDate\` varchar(255) NOT NULL, \`vaccineName\` int NOT NULL, \`vaccinationLocation\` int NOT NULL, \`vaccineRegistrationId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vaccine_registration_vaccines_vaccine\` (\`vaccineRegistrationId\` int NOT NULL, \`vaccineId\` int NOT NULL, INDEX \`IDX_425eae466ffcb2964d060907a6\` (\`vaccineRegistrationId\`), INDEX \`IDX_7956a29f46c5610e30e0ec7cab\` (\`vaccineId\`), PRIMARY KEY (\`vaccineRegistrationId\`, \`vaccineId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` ADD \`isVaccinated\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_vaccines_vaccine\` ADD CONSTRAINT \`FK_425eae466ffcb2964d060907a64\` FOREIGN KEY (\`vaccineRegistrationId\`) REFERENCES \`vaccine_registration\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_vaccines_vaccine\` ADD CONSTRAINT \`FK_7956a29f46c5610e30e0ec7cab9\` FOREIGN KEY (\`vaccineId\`) REFERENCES \`vaccine\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_vaccines_vaccine\` DROP FOREIGN KEY \`FK_7956a29f46c5610e30e0ec7cab9\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration_vaccines_vaccine\` DROP FOREIGN KEY \`FK_425eae466ffcb2964d060907a64\``);
        await queryRunner.query(`ALTER TABLE \`vaccine_registration\` DROP COLUMN \`isVaccinated\``);
        await queryRunner.query(`DROP INDEX \`IDX_7956a29f46c5610e30e0ec7cab\` ON \`vaccine_registration_vaccines_vaccine\``);
        await queryRunner.query(`DROP INDEX \`IDX_425eae466ffcb2964d060907a6\` ON \`vaccine_registration_vaccines_vaccine\``);
        await queryRunner.query(`DROP TABLE \`vaccine_registration_vaccines_vaccine\``);
        await queryRunner.query(`DROP TABLE \`vaccine\``);
    }

}
