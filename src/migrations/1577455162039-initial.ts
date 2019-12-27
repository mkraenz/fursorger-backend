import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1577455162039 implements MigrationInterface {
    name = 'initial1577455162039'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "level_with_metadata" ("name" character varying NOT NULL, "id" SERIAL NOT NULL, "likes" integer NOT NULL DEFAULT 0, "downloads" integer NOT NULL DEFAULT 0, "created" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "uploadedUser" character varying, "levelId" integer, CONSTRAINT "UQ_617540a8580d7361309daa464bf" UNIQUE ("name"), CONSTRAINT "REL_ed3431c9ccc3ac2ef2e21eedb7" UNIQUE ("levelId"), CONSTRAINT "PK_b29a64dc099547dd3a7bf9ffa14" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "travel_path" ("id" SERIAL NOT NULL, "first" character varying NOT NULL, "second" character varying NOT NULL, "levelId" integer, CONSTRAINT "PK_4761d5c028147e8f709dc50e522" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "level" ("id" SERIAL NOT NULL, "playerStock" integer NOT NULL, CONSTRAINT "PK_d3f1a7a6f09f1c3144bacdc6bcc" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "stock" integer NOT NULL, "production" integer NOT NULL, "x" integer NOT NULL, "y" integer NOT NULL, "levelId" integer, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "level_with_metadata" ADD CONSTRAINT "FK_ed3431c9ccc3ac2ef2e21eedb70" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "travel_path" ADD CONSTRAINT "FK_e2a57d59e756ec8871d3ae28fb6" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_4c536fe7369859b665bf752ddf8" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_4c536fe7369859b665bf752ddf8"`, undefined);
        await queryRunner.query(`ALTER TABLE "travel_path" DROP CONSTRAINT "FK_e2a57d59e756ec8871d3ae28fb6"`, undefined);
        await queryRunner.query(`ALTER TABLE "level_with_metadata" DROP CONSTRAINT "FK_ed3431c9ccc3ac2ef2e21eedb70"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "city"`, undefined);
        await queryRunner.query(`DROP TABLE "level"`, undefined);
        await queryRunner.query(`DROP TABLE "travel_path"`, undefined);
        await queryRunner.query(`DROP TABLE "level_with_metadata"`, undefined);
    }

}
