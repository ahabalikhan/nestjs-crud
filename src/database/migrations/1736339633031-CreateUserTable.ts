import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1736339633031 implements MigrationInterface {
    name = 'CreateUserTable1736339633031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "userId" SERIAL NOT NULL,
                "name" character varying(100) NOT NULL,
                "email" character varying NOT NULL,
                "age" integer NOT NULL,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1f457efff42e9e3d54598c4bd8" ON "user" ("age")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_1f457efff42e9e3d54598c4bd8"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
