import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1724317318145 implements MigrationInterface {
    name = 'NewMigration1724317318145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vaccination_site\` (\`id\` int NOT NULL AUTO_INCREMENT, \`vaccinationSiteName\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`provinceId\` int NOT NULL, \`districtId\` int NOT NULL, \`wardId\` int NOT NULL, \`vaccinationSiteLeader\` varchar(255) NOT NULL, \`quantityTable\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vaccination_site\` ADD CONSTRAINT \`FK_1651568d3f7b33bc62cdc7f11dc\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccination_site\` ADD CONSTRAINT \`FK_1e3e01557d8833f6b0cf18d895b\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccination_site\` ADD CONSTRAINT \`FK_a6018e2239c6ef80fcac2d1e0fd\` FOREIGN KEY (\`wardId\`) REFERENCES \`ward\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccination_site\` DROP FOREIGN KEY \`FK_a6018e2239c6ef80fcac2d1e0fd\``);
        await queryRunner.query(`ALTER TABLE \`vaccination_site\` DROP FOREIGN KEY \`FK_1e3e01557d8833f6b0cf18d895b\``);
        await queryRunner.query(`ALTER TABLE \`vaccination_site\` DROP FOREIGN KEY \`FK_1651568d3f7b33bc62cdc7f11dc\``);
        await queryRunner.query(`DROP TABLE \`vaccination_site\``);
    }

}
