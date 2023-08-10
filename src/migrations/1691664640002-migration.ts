import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691664640002 implements MigrationInterface {
    name = 'Migration1691664640002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."rabbits_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "rabbits" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT '"2023-08-10T10:50:41.090Z"', "dob" date, "note" character varying, "is_active" character varying NOT NULL DEFAULT false, "gender" "public"."rabbits_gender_enum" NOT NULL, CONSTRAINT "PK_6e705533b67a9ad3ce7dd67c392" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "matings" ("id" SERIAL NOT NULL, "mating_date" date NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT '"2023-08-10T10:50:41.090Z"', "childbirth_date" date, "litter_number" integer NOT NULL, "children_amount" integer, "dead_children_amont" integer NOT NULL DEFAULT '0', "mother_id" integer NOT NULL, "father_id" integer NOT NULL, CONSTRAINT "PK_f191d40c437300bf14c6b43136f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'manager', 'user')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "name" character varying, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "matings" ADD CONSTRAINT "FK_6f6b1d5779f8e92812742a4839d" FOREIGN KEY ("mother_id") REFERENCES "rabbits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "matings" ADD CONSTRAINT "FK_135efa2b4b50ac4bd7caa028c7f" FOREIGN KEY ("father_id") REFERENCES "rabbits"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matings" DROP CONSTRAINT "FK_135efa2b4b50ac4bd7caa028c7f"`);
        await queryRunner.query(`ALTER TABLE "matings" DROP CONSTRAINT "FK_6f6b1d5779f8e92812742a4839d"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "matings"`);
        await queryRunner.query(`DROP TABLE "rabbits"`);
        await queryRunner.query(`DROP TYPE "public"."rabbits_gender_enum"`);
    }

}
