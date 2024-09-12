import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1725606860331 implements MigrationInterface {
    name = 'NewMigration1725606860331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ward\` DROP FOREIGN KEY \`FK_19a3bc9b3be291e8b9bc2bb623b\``);
        await queryRunner.query(`ALTER TABLE \`ward\` CHANGE \`districtId\` \`districtId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ward\` ADD CONSTRAINT \`FK_19a3bc9b3be291e8b9bc2bb623b\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` ADD CONSTRAINT \`FK_a419fde59cd4d7135cf04869314\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP FOREIGN KEY \`FK_a419fde59cd4d7135cf04869314\``);
        await queryRunner.query(`ALTER TABLE \`ward\` DROP FOREIGN KEY \`FK_19a3bc9b3be291e8b9bc2bb623b\``);
        await queryRunner.query(`ALTER TABLE \`ward\` CHANGE \`districtId\` \`districtId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`ward\` ADD CONSTRAINT \`FK_19a3bc9b3be291e8b9bc2bb623b\` FOREIGN KEY (\`districtId\`) REFERENCES \`district\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vaccine_result\` DROP COLUMN \`userId\``);
    }

}
