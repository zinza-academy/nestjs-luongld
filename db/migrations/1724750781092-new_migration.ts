import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigration1724750781092 implements MigrationInterface {
  name = 'NewMigration1724750781092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`vaccine_registration\` (\`id\` int NOT NULL AUTO_INCREMENT, \`priorityGroup\` varchar(255) NOT NULL, \`healthInsuranceCardNumber\` varchar(255) NOT NULL, \`job\` varchar(255) NOT NULL, \`workPlace\` varchar(255) NOT NULL, \`addressCurrent\` varchar(255) NOT NULL, \`desiredVaccinationDate\` date NOT NULL, \`vaccinationSession\` int NOT NULL, \`injectionTime\` date NOT NULL, \`injectionSite\` varchar(255) NOT NULL, \`isVaccinated\` tinyint NOT NULL DEFAULT 0, \`userId\` int NULL, \`vaccineId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vaccine_registration\` ADD CONSTRAINT \`FK_638ec06d6705017ed410e2ffeea\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vaccine_registration\` ADD CONSTRAINT \`FK_8dd54e2c71d22de01b3d4af7c0e\` FOREIGN KEY (\`vaccineId\`) REFERENCES \`vaccine\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`vaccine_registration\` DROP FOREIGN KEY \`FK_8dd54e2c71d22de01b3d4af7c0e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vaccine_registration\` DROP FOREIGN KEY \`FK_638ec06d6705017ed410e2ffeea\``,
    );
    await queryRunner.query(`DROP TABLE \`vaccine_registration\``);
  }
}
