import {MigrationInterface, QueryRunner} from "typeorm";

export class requireLevelmetadataUploader1577465244222 implements MigrationInterface {
    name = 'requireLevelmetadataUploader1577465244222'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "level_with_metadata" RENAME COLUMN "uploadedUser" TO "uploader"`, undefined);
        await queryRunner.query(`ALTER TABLE "level_with_metadata" ALTER COLUMN "uploader" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "level_with_metadata" ALTER COLUMN "uploader" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "level_with_metadata" RENAME COLUMN "uploader" TO "uploadedUser"`, undefined);
    }

}
