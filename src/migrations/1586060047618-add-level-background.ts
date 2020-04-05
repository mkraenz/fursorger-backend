import {MigrationInterface, QueryRunner} from "typeorm";

export class addLevelBackground1586060047618 implements MigrationInterface {
    name = 'addLevelBackground1586060047618'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "level" ADD "background" character varying NOT NULL DEFAULT 'default-background'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "level" DROP COLUMN "background"`, undefined);
    }

}
