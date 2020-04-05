import {MigrationInterface, QueryRunner} from "typeorm";

export class addPlayer1586052270065 implements MigrationInterface {
    name = 'addPlayer1586052270065'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "stock" integer NOT NULL, "location" character varying NOT NULL, "levelId" integer, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_91cf19db91b32504af3ac37ebb8" FOREIGN KEY ("levelId") REFERENCES "level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_91cf19db91b32504af3ac37ebb8"`, undefined);
        await queryRunner.query(`DROP TABLE "player"`, undefined);
    }

}
