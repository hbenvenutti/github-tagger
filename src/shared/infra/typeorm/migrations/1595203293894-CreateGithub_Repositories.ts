import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateGithubRepositories1595203293894
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'github_repositories',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            isUnique: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
            isUnique: false,
          },
          {
            name: 'url',
            type: 'varchar',
            isNullable: false,
            isUnique: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('github_repositories');
  }
}
