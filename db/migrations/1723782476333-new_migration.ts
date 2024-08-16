import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1723782476333 implements MigrationInterface {
    name = 'NewMigration1723782476333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`district\` (\`id\` int NOT NULL, \`district\` varchar(255) NOT NULL, \`provinceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`province\` (\`id\` int NOT NULL, \`province\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ward\` (\`id\` int NOT NULL, \`ward\` varchar(255) NOT NULL, \`districtId\` int NULL, \`provinceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`district\` ADD CONSTRAINT \`FK_23a21b38208367a242b1dd3a424\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ward\` ADD CONSTRAINT \`FK_19a3bc9b3be291e8b9bc2bb623b\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ward\` ADD CONSTRAINT \`FK_9f7d3594fa8b7095c487d41f3b6\` FOREIGN KEY (\`provinceId\`) REFERENCES \`province\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ward\` DROP FOREIGN KEY \`FK_9f7d3594fa8b7095c487d41f3b6\``);
        await queryRunner.query(`ALTER TABLE \`ward\` DROP FOREIGN KEY \`FK_19a3bc9b3be291e8b9bc2bb623b\``);
        await queryRunner.query(`ALTER TABLE \`district\` DROP FOREIGN KEY \`FK_23a21b38208367a242b1dd3a424\``);
        await queryRunner.query(`DROP TABLE \`ward\``);
        await queryRunner.query(`DROP TABLE \`province\``);
        await queryRunner.query(`DROP TABLE \`district\``);
    }

}
