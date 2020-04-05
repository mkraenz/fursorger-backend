import {MigrationInterface, QueryRunner} from "typeorm";

export class removeLevelPlayerStock1586052652395 implements MigrationInterface {
    name = 'removeLevelPlayerStock1586052652395'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "level" DROP COLUMN "playerStock"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "level" ADD "playerStock" integer NOT NULL`, undefined);
    }

}
