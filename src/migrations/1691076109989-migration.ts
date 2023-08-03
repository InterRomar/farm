import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691076109989 implements MigrationInterface {
    name = 'Migration1691076109989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'manager', 'user')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "name" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "matings" ALTER COLUMN "created_at" SET DEFAULT '"2023-08-03T15:21:51.107Z"'`);
        await queryRunner.query(`ALTER TABLE "rabbits" ALTER COLUMN "created_at" SET DEFAULT '"2023-08-03T15:21:51.108Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rabbits" ALTER COLUMN "created_at" SET DEFAULT '2023-08-03 10:11:44.144'`);
        await queryRunner.query(`ALTER TABLE "matings" ALTER COLUMN "created_at" SET DEFAULT '2023-08-03 10:11:44.14'`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
