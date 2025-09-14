import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1757880215353 implements MigrationInterface {
    name = 'Init1757880215353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task_entity" ("taskID" SERIAL NOT NULL, "taskTitle" character varying NOT NULL, "taskIsCompleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_ea8c5d630e9fa1f10bc53d15aed" UNIQUE ("taskTitle"), CONSTRAINT "PK_7fc605c65a92c557719bb3e4089" PRIMARY KEY ("taskID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task_entity"`);
    }

}
