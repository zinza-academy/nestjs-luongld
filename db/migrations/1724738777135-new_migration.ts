import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1724738777135 implements MigrationInterface {
    name = 'NewMigration1724738777135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_e919016c871c3266b564dd696c1\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9c0c22394fd0de777921112069c\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_5ca267c961911128555d353737a\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`provinceId\` \`provinceId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`districtId\` \`districtId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`wardId\` \`wardId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_e919016c871c3266b564dd696c1\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9c0c22394fd0de777921112069c\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_5ca267c961911128555d353737a\` FOREIGN KEY (\`wardId\`) REFERENCES \`ward\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_5ca267c961911128555d353737a\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_9c0c22394fd0de777921112069c\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_e919016c871c3266b564dd696c1\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`wardId\` \`wardId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`districtId\` \`districtId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`provinceId\` \`provinceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_5ca267c961911128555d353737a\` FOREIGN KEY (\`wardId\`) REFERENCES \`ward\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_9c0c22394fd0de777921112069c\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_e919016c871c3266b564dd696c1\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
