import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691076902549 implements MigrationInterface {
    name = 'Migration1691076902549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rabbits" ALTER COLUMN "created_at" SET DEFAULT '"2023-08-03T15:35:03.682Z"'`);
        await queryRunner.query(`ALTER TABLE "matings" ALTER COLUMN "created_at" SET DEFAULT '"2023-08-03T15:35:03.682Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matings" ALTER COLUMN "created_at" SET DEFAULT '2023-08-03 15:21:51.107'`);
        await queryRunner.query(`ALTER TABLE "rabbits" ALTER COLUMN "created_at" SET DEFAULT '2023-08-03 15:21:51.108'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
